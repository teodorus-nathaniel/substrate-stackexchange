import { getIndexingService } from '#/lib/helpers/env'
import { DocumentNode } from 'graphql'
import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import queryClient from '../client'
import { generateQueryWrapper, mergeQueryConfig } from '../common/base'
import { QueryConfig } from '../common/types'
import { IndexingParam } from './types'

export const indexingService = getIndexingService() ?? ''
export const indexingQueryWrapper = generateQueryWrapper(async () => null)

export function callIndexer<ReturnValue, Params>(
  document: DocumentNode,
  params: Params
) {
  const res: Promise<ReturnValue> = request(indexingService, document, params)
  return res
}

export function createIndexingQueryInvalidation<Param>(
  key: string,
  document: DocumentNode
) {
  return (data?: Param) => {
    queryClient.invalidateQueries([key, { ...data, document }])
  }
}

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
      return callIndexer<ReturnValue, Params>(params.document, params)
    }, null),
    mergedConfig as any
  )
}
