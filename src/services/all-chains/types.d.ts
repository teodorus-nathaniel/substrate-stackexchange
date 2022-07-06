import { TokenTickers } from '#/lib/constants/chains'

export type AllChainsCommonParams = {
  network: TokenTickers
}

export interface GetTokenParams extends AllChainsCommonParams {
  address: string
}
