import { useAllChainsQuery } from './base'
import { GetTokenParams } from './types'

export const getTokenBalanceKey = 'getTokenBalance'
export function useGetTokenBalance(params: GetTokenParams) {
  return useAllChainsQuery(
    { params, key: getTokenBalanceKey },
    async ({ params: { address }, preQueryData: connection }) => {
      const result: any = await connection.query.system.account(address)
      return result?.data?.free?.toString()
    }
  )
}
