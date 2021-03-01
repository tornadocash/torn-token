const { toWei } = require('web3-utils')

module.exports = {
  torn: {
    address: 'torn.contract.tornadocash.eth',
    cap: toWei('10000000'),
    pausePeriod: 45 * 24 * 3600, // 45 days
    distribution: {
      airdrop: { to: 'voucher', amount: toWei('500000') },
      miningV2: { to: 'rewardSwap', amount: toWei('1000000') },
      governance: { to: 'vesting.governance', amount: toWei('5500000') },
      team1: { to: 'vesting.team1', amount: toWei('822407') },
      team2: { to: 'vesting.team2', amount: toWei('822407') },
      team3: { to: 'vesting.team3', amount: toWei('822407') },
      team4: { to: 'vesting.team4', amount: toWei('500000') },
      team5: { to: 'vesting.team5', amount: toWei('32779') },
    },
  },
  governance: { address: 'governance.contract.tornadocash.eth' },
  governanceImpl: { address: 'governance-impl.contract.tornadocash.eth' },
  voucher: { address: 'voucher.contract.tornadocash.eth', duration: 12 },
  miningV2: {
    address: 'mining-v2.contract.tornadocash.eth',
    initialBalance: toWei('25000'),
    rates: [
      { instance: 'eth-01.tornadocash.eth', value: '10' },
      { instance: 'eth-1.tornadocash.eth', value: '20' },
      { instance: 'eth-10.tornadocash.eth', value: '50' },
      { instance: 'eth-100.tornadocash.eth', value: '400' },
    ],
  },
  rewardSwap: { address: 'reward-swap.contract.tornadocash.eth', poolWeight: 1e11 },
  tornadoTrees: { address: 'tornado-trees.contract.tornadocash.eth', levels: 20 },
  tornadoProxy: { address: 'tornado-proxy.contract.tornadocash.eth' },
  rewardVerifier: { address: 'reward-verifier.contract.tornadocash.eth' },
  treeUpdateVerifier: { address: 'tree-update-verifier.contract.tornadocash.eth' },
  withdrawVerifier: { address: 'withdraw-verifier.contract.tornadocash.eth' },
  poseidonHasher2: { address: 'poseidon2.contract.tornadocash.eth' },
  poseidonHasher3: { address: 'poseidon3.contract.tornadocash.eth' },
  deployer: { address: 'deployer.contract.tornadocash.eth' },
  vesting: {
    team1: {
      address: 'team1.vesting.contract.tornadocash.eth',
      beneficiary: '0x5A7a51bFb49F190e5A6060a5bc6052Ac14a3b59f',
      cliff: 12,
      duration: 36,
    },
    team2: {
      address: 'team2.vesting.contract.tornadocash.eth',
      beneficiary: '0xF50D442e48E11F16e105431a2664141f44F9feD8',
      cliff: 12,
      duration: 36,
    },
    team3: {
      address: 'team3.vesting.contract.tornadocash.eth',
      beneficiary: '0x6D2C515Ff6A40554869C3Da05494b8D6910D075E',
      cliff: 12,
      duration: 36,
    },
    team4: {
      address: 'team4.vesting.contract.tornadocash.eth',
      beneficiary: '0x504a9c37794a2341F4861bF0A44E8d4016DF8cF2',
      cliff: 12,
      duration: 36,
    },
    team5: {
      address: 'team5.vesting.contract.tornadocash.eth',
      beneficiary: '0x2D81713c58452c92C19b2917e1C770eEcF53Fe41',
      cliff: 12,
      duration: 36,
    },
    governance: {
      address: 'governance.vesting.contract.tornadocash.eth',
      cliff: 3,
      duration: 60,
    },
  },
  instances: {
    netId1: {
      eth: {
        instanceAddress: {
          0.1: '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
          1: '0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936',
          10: '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF',
          100: '0xA160cdAB225685dA1d56aa342Ad8841c3b53f291',
        },
        symbol: 'ETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          100: '0xD4B88Df4D29F5CedD6857912842cff3b20C8Cfa3',
          1000: '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144',
          10000: '0xF60dD140cFf0706bAE9Cd734Ac3ae76AD9eBC32A',
          100000: undefined,
        },
        tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        symbol: 'DAI',
        decimals: 18,
      },
      cdai: {
        instanceAddress: {
          5000: '0x22aaA7720ddd5388A3c0A3333430953C68f1849b',
          50000: '0xBA214C1c1928a32Bffe790263E38B4Af9bFCD659',
          500000: '0xb1C8094B234DcE6e03f10a5b673c1d8C69739A00',
          5000000: undefined,
        },
        tokenAddress: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        symbol: 'cDAI',
        decimals: 8,
      },
      usdc: {
        instanceAddress: {
          100: '0xd96f2B1c14Db8458374d9Aca76E26c3D18364307',
          1000: '0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D',
          10000: '0xD691F27f38B395864Ea86CfC7253969B409c362d',
          100000: undefined,
        },
        tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        symbol: 'USDC',
        decimals: 6,
      },
      cusdc: {
        instanceAddress: {
          5000: '0xaEaaC358560e11f52454D997AAFF2c5731B6f8a6',
          50000: '0x1356c899D8C9467C7f71C195612F8A395aBf2f0a',
          500000: '0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D',
          5000000: undefined,
        },
        tokenAddress: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        symbol: 'cUSDC',
        decimals: 8,
      },
      usdt: {
        instanceAddress: {
          100: '0x169AD27A470D064DEDE56a2D3ff727986b15D52B',
          1000: '0x0836222F2B2B24A3F36f98668Ed8F0B38D1a872f',
          10000: '0xF67721A2D8F736E75a49FdD7FAd2e31D8676542a',
          100000: '0x9AD122c22B14202B4490eDAf288FDb3C7cb3ff5E',
        },
        tokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT',
        decimals: 6,
      },
    },
    netId42: {
      eth: {
        instanceAddress: {
          0.1: '0x8b3f5393bA08c24cc7ff5A66a832562aAB7bC95f',
          1: '0xD6a6AC46d02253c938B96D12BE439F570227aE8E',
          10: '0xe1BE96331391E519471100c3c1528B66B8F4e5a7',
          100: '0xd037E0Ac98Dab2fCb7E296c69C6e52767Ae5414D',
        },
        symbol: 'ETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          100: '0xdf2d3cC5F361CF95b3f62c4bB66deFe3FDE47e3D',
          1000: '0xD96291dFa35d180a71964D0894a1Ae54247C4ccD',
          10000: '0xb192794f72EA45e33C3DF6fe212B9c18f6F45AE3',
          100000: undefined,
        },
        tokenAddress: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
        symbol: 'DAI',
        decimals: 18,
      },
      cdai: {
        instanceAddress: {
          5000: '0x6Fc9386ABAf83147b3a89C36D422c625F44121C8',
          50000: '0x7182EA067e0f050997444FCb065985Fd677C16b6',
          500000: '0xC22ceFd90fbd1FdEeE554AE6Cc671179BC3b10Ae',
          5000000: undefined,
        },
        tokenAddress: '0xe7bc397DBd069fC7d0109C0636d06888bb50668c',
        symbol: 'cDAI',
        decimals: 8,
      },
      usdc: {
        instanceAddress: {
          100: '0x137E2B6d185018e7f09f6cf175a970e7fC73826C',
          1000: '0xcC7f1633A5068E86E3830e692e3e3f8f520525Af',
          10000: '0x28C8f149a0ab8A9bdB006B8F984fFFCCE52ef5EF',
          100000: undefined,
        },
        tokenAddress: '0x75B0622Cec14130172EaE9Cf166B92E5C112FaFF',
        symbol: 'USDC',
        decimals: 6,
      },
      cusdc: {
        instanceAddress: {
          5000: '0xc0648F28ABA385c8a1421Bbf1B59e3c474F89cB0',
          50000: '0x0C53853379c6b1A7B74E0A324AcbDD5Eabd4981D',
          500000: '0xf84016A0E03917cBe700D318EB1b7a53e6e3dEe1',
          5000000: undefined,
        },
        tokenAddress: '0xcfC9bB230F00bFFDB560fCe2428b4E05F3442E35',
        symbol: 'cUSDC',
        decimals: 8,
      },
      usdt: {
        instanceAddress: {
          100: '0x327853Da7916a6A0935563FB1919A48843036b42',
          1000: '0x531AA4DF5858EA1d0031Dad16e3274609DE5AcC0',
          10000: '0x0958275F0362cf6f07D21373aEE0cf37dFe415dD',
          100000: '0x14aEd24B67EaF3FF28503eB92aeb217C47514364',
        },
        tokenAddress: '0x03c5F29e9296006876d8DF210BCFfD7EA5Db1Cf1',
        symbol: 'USDT',
        decimals: 6,
      },
    },
    netId5: {
      eth: {
        instanceAddress: {
          0.1: '0x6Bf694a291DF3FeC1f7e69701E3ab6c592435Ae7',
          1: '0x3aac1cC67c2ec5Db4eA850957b967Ba153aD6279',
          10: '0x723B78e67497E85279CB204544566F4dC5d2acA0',
          100: '0x0E3A09dDA6B20aFbB34aC7cD4A6881493f3E7bf7',
        },
        symbol: 'ETH',
        decimals: 18,
      },
      dai: {
        instanceAddress: {
          100: '0x76D85B4C0Fc497EeCc38902397aC608000A06607',
          1000: '0xCC84179FFD19A1627E79F8648d09e095252Bc418',
          10000: '0x435aEa5B50CBE34CaC0b42d195da587b923200C3',
          100000: '',
        },
        tokenAddress: "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60",
        symbol: 'DAI',
        decimals: 18,
      },
    },
  },
}
