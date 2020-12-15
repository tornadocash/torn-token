/* global artifacts, web3, contract */
require('chai').use(require('bn-chai')(web3.utils.BN)).use(require('chai-as-promised')).should()

const { takeSnapshot, revertSnapshot } = require('../scripts/ganacheHelper')
const Airdrop = artifacts.require('./AirdropMock.sol')
const Torn = artifacts.require('./TORNMock.sol')
const { cap } = require('../config').torn
const { toBN, toWei } = require('web3-utils')
const RLP = require('rlp')

async function getNextAddr(sender, offset = 0) {
  const nonce = await web3.eth.getTransactionCount(sender)
  return (
    '0x' +
    web3.utils
      .sha3(RLP.encode([sender, Number(nonce) + Number(offset)]))
      .slice(12)
      .substring(14)
  )
}

async function deploySefldestruct(contract, args, deployerPK) {
  const c = new web3.eth.Contract(contract.abi)
  const data = c
    .deploy({
      data: contract.bytecode,
      arguments: args,
    })
    .encodeABI()
  const signed = await web3.eth.accounts.signTransaction(
    {
      gas: 5e6,
      gasPrice: toWei('1', 'gwei'),
      data,
    },
    deployerPK,
  )
  await web3.eth.sendSignedTransaction(signed.rawTransaction)
}

contract('Airdrop', (accounts) => {
  let torn
  let snapshotId
  const airdropDeployer = accounts[8]
  const deployerPK = '0x0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4'
  const recipient1 = accounts[2]
  const recipient2 = accounts[3]
  let half = toBN(cap).div(toBN(2)).toString()

  before(async () => {
    const newAddr = await getNextAddr(airdropDeployer)
    torn = await Torn.new(accounts[0], 0, [{ to: newAddr, amount: cap }])
    snapshotId = await takeSnapshot()
  })
  describe('#airdrop', () => {
    it('should work', async () => {
      // web3 throws when it tried to deploy a contract with selfdestruct() in constructor
      await deploySefldestruct(
        Airdrop,
        [
          torn.address,
          [
            { to: recipient1, amount: half },
            { to: recipient2, amount: half },
          ],
        ],
        deployerPK,
      )

      const bal1 = await torn.balanceOf(recipient1)
      const bal2 = await torn.balanceOf(recipient2)

      bal1.should.eq.BN(toBN(half))
      bal2.should.eq.BN(toBN(half))
    })

    // todo: how do we get the same deployed address without create2?
    // it('should throw on second attempt', async () => {
    //   await Airdrop.new(torn.address, [accounts[1], accounts[2]], [half, half], { from: airdropDeployer })
    // })
  })

  afterEach(async () => {
    await revertSnapshot(snapshotId.result)
    // eslint-disable-next-line require-atomic-updates
    snapshotId = await takeSnapshot()
  })
})
