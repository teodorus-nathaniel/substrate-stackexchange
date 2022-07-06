import { ApiPromise } from '@polkadot/api'
import { useQuery } from 'react-query'
import { generateQueryWrapper, mergeQueryConfig } from '../common/base'
import { QueryConfig } from '../common/types'
import connections from './connections'
import { AllChainsCommonParams } from './types'

export const allChainsQueryWrapper = generateQueryWrapper(
  (data: AllChainsCommonParams) => connections.getConnection(data.network)
)

export function useAllChainsQuery<T, Params extends AllChainsCommonParams>(
  data: { key: string; params: Params | null },
  func: (data: { params: Params; preQueryData: ApiPromise }) => Promise<T>,
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<T, Params>
) {
  const mergedConfig = mergeQueryConfig(config, defaultConfig)
  return useQuery(
    [data.key, data.params],
    allChainsQueryWrapper(func, null),
    mergedConfig as any
  )
}
