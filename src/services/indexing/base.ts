import { getIndexingService } from '#/lib/helpers/env'
import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { generateQueryWrapper, mergeQueryConfig } from '../common/base'
import { QueryConfig } from '../common/types'
import { IndexingParam } from './types'

export const indexingService = getIndexingService() ?? ''
export const indexingQueryWrapper = generateQueryWrapper(async () => null)

export function useIndexingQuery<Params, ReturnValue>(
  data: { key: string; params: IndexingParam<Params> | null },
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<any, Params>
) {
  const mergedConfig = mergeQueryConfig(
    mergeQueryConfig(config, defaultConfig),
    { enabled: !!indexingService }
  )
  return useQuery(
    [data.key, data.params],
    indexingQueryWrapper(({ params }: { params: IndexingParam<Params> }) => {
      return request(
        indexingService,
        params.document,
        params
      ) as Promise<ReturnValue>
    }, null),
    mergedConfig as any
  )
}
