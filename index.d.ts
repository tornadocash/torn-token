export const torn: Torn
export const governance: Address
export const governanceImpl: Address
export const voucher: Voucher
export const miningV2: Mining
export const rewardSwap: RewardSwap
export const tornadoTrees: TornadoTrees
export const tornadoProxy: Address
export const tornadoProxyLight: Address
export const rewardVerifier: Address
export const treeUpdateVerifier: Address
export const withdrawVerifier: Address
export const poseidonHasher2: Address
export const poseidonHasher3: Address
export const feeManager: Address
export const tornadoStakingRewards: Address
export const relayerRegistry: Address
export const tornadoRouter: Address
export const instanceRegistry: Address
export const deployer: Address
export const vesting: Vesting
export const instances: Instances


export type availableIds = 1 | 5 | 10 | 56 | 100 | 137 | 42161 | 43114
export type availableTokens = 'eth' | 'dai' | 'cdai' | 'usdc' | 'usdt' | 'wbtc' | 'xdai' | 'matic' | 'avax' | 'bnb'
export type netIds = `netId${availableIds}`

export type Address = {
  address: string
}

export type Instances = {
  [p in netIds]: NetInstances;
};

export type NetInstances = {
  [p in availableTokens]?: TInstance;
}

export type TInstance = {
  instanceAddress: InstanceAddress
  tokenAddress?: string
  symbol: string
  decimals: number
}

export type InstanceAddress = {
  '0.1'?: string
  '1'?: string
  '10'?: string
  '100'?: string
  '500'?: string
  '1000'?: string
  '5000'?: string
  '10000'?: string
  '50000'?: string
  '100000'?: string
  '500000'?: string
  '5000000'?: string
}

export type Mining = Address & {
  initialBalance: string
  rates: Rate[]
}

export type Rate = {
  instance: string
  value: string
}

export type RewardSwap = Address & {
  poolWeight: number
}

export type Torn = Address & {
  cap: string
  pausePeriod: number
  distribution: { [key: string]: Distribution }
}

export type Distribution = {
  to: string
  amount: string
}

export type TornadoTrees = Address & {
  levels: number
}

export interface Vesting {
  team1: Governance;
  team2: Governance;
  team3: Governance;
  team4: Governance;
  team5: Governance;
  governance: Governance;
}

export type Governance = Address & {
  cliff: number
  duration: number
  beneficiary?: string
}

export type Voucher = Address & {
  duration: number
}
