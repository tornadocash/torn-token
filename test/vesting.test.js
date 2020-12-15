/* global artifacts, web3, contract */
require('chai').use(require('bn-chai')(web3.utils.BN)).use(require('chai-as-promised')).should()
const { takeSnapshot, revertSnapshot } = require('../scripts/ganacheHelper')
const { toBN } = require('web3-utils')
const RLP = require('rlp')

const Torn = artifacts.require('./TORNMock.sol')
const Vesting = artifacts.require('./VestingMock.sol')
const duration = {
  seconds: function (val) {
    return val
  },
  minutes: function (val) {
    return val * this.seconds(60)
  },
  hours: function (val) {
    return val * this.minutes(60)
  },
  days: function (val) {
    return val * this.hours(24)
  },
  weeks: function (val) {
    return val * this.days(7)
  },
  years: function (val) {
    return val * this.days(365)
  },
}

const MONTH = toBN(duration.days(30))

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

contract('Vesting', (accounts) => {
  let torn
  let vesting
  let snapshotId
  // const owner = accounts[0]
  // const ownerPrivateKey = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
  const recipient = accounts[1]
  const governance = accounts[8]
  const testTimestamp = toBN(1584230400) // 03/15/2020 @ 12:00am (UTC)
  const startTimestamp = toBN(1586908800) // 04/15/2020 @ 12:00am (UTC)
  const cliffInMonths = toBN(12)
  const durationInMonths = toBN(36)
  const cap = toBN(10000000).mul(toBN(10 ** 18))

  before(async () => {
    const vestingExpectedAddr = await getNextAddr(accounts[0], 1)
    const thirtyDays = 30 * 24 * 3600
    torn = await Torn.new(governance, thirtyDays, [{ to: vestingExpectedAddr, amount: cap.toString() }])
    vesting = await Vesting.new(torn.address, recipient, startTimestamp, cliffInMonths, durationInMonths)
    await vesting.setFakeTimestamp(testTimestamp)
    const blockTimestamp = await vesting.blockTimestamp()
    blockTimestamp.should.be.eq.BN(testTimestamp)
    snapshotId = await takeSnapshot()
  })

  describe('#constructor', () => {
    it('should be initialized', async () => {
      const startFromContract = await vesting.startTimestamp()
      startFromContract.should.be.eq.BN(startTimestamp)
      const beneficiaryFromContract = await vesting.beneficiary()
      beneficiaryFromContract.should.be.eq.BN(recipient)
      const cliffInMonthsFromContract = await vesting.cliffInMonths()
      cliffInMonthsFromContract.should.be.eq.BN(cliffInMonths)
      const durationInMonthsFromContract = await vesting.durationInMonths()
      durationInMonthsFromContract.should.be.eq.BN(durationInMonths)
      const balance = await torn.balanceOf(vesting.address)
      balance.should.be.eq.BN(cap)
    })
  })

  describe('#release', () => {
    it('should reject if time has not come', async () => {
      await vesting.release().should.be.rejectedWith('No tokens to release')
      await vesting.release({ from: recipient }).should.be.rejectedWith('No tokens to release')

      await vesting.setFakeTimestamp(startTimestamp)

      await vesting.release().should.be.rejectedWith('No tokens to release')
      await vesting.release({ from: recipient }).should.be.rejectedWith('No tokens to release')

      const rightBeforeCliff = startTimestamp.add(MONTH.mul(toBN(12))).sub(toBN(duration.days(1)))
      await vesting.setFakeTimestamp(rightBeforeCliff)

      await vesting.release().should.be.rejectedWith('No tokens to release')
      await vesting.release({ from: recipient }).should.be.rejectedWith('No tokens to release')
    })

    it('should work if time has come', async () => {
      const cliff = startTimestamp.add(MONTH.mul(toBN(12)))
      await vesting.setFakeTimestamp(cliff)

      let balanceBefore = await torn.balanceOf(recipient)
      await vesting.release()
      let balanceAfter = await torn.balanceOf(recipient)

      const monthAfterCliff = cliff.add(MONTH)
      await vesting.setFakeTimestamp(monthAfterCliff)

      balanceBefore = await torn.balanceOf(recipient)
      await vesting.release()
      balanceAfter = await torn.balanceOf(recipient)
      balanceAfter.should.be.eq.BN(balanceBefore.add(cap.divRound(toBN(36))))

      await vesting.release().should.be.rejectedWith('No tokens to release')
      const monthAfterCliffPlusWeek = monthAfterCliff.add(toBN(duration.weeks(1)))
      await vesting.setFakeTimestamp(monthAfterCliffPlusWeek)
      await vesting.release().should.be.rejectedWith('No tokens to release')

      const yearAfterCliff = cliff.add(MONTH.mul(toBN(12)))
      await vesting.setFakeTimestamp(yearAfterCliff)

      balanceBefore = await torn.balanceOf(recipient)
      await vesting.release()
      balanceAfter = await torn.balanceOf(recipient)
      balanceAfter.should.be.eq.BN(balanceBefore.add(cap.divRound(toBN(36)).mul(toBN(11))).sub(toBN(3))) // -3 wei because of round error

      const atTheEnd = cliff.add(MONTH.mul(toBN(24)))
      await vesting.setFakeTimestamp(atTheEnd)

      balanceBefore = await torn.balanceOf(recipient)
      await vesting.release()
      balanceAfter = await torn.balanceOf(recipient)
      balanceAfter.should.be.eq.BN(cap)
    })
  })

  afterEach(async () => {
    await revertSnapshot(snapshotId.result)
    // eslint-disable-next-line require-atomic-updates
    snapshotId = await takeSnapshot()
  })
})
