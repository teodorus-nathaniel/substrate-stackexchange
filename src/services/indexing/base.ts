import { getIndexingService } from '#/lib/helpers/env'
import { DocumentNode } from 'graphql'
import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { generateQueryWrapper, mergeQueryConfig } from '../common/base'
import { QueryConfig } from '../common/types'
import { IndexingParam } from './types'

export const indexingService = getIndexingService() ?? ''
export const indexingQueryWrapper = generateQueryWrapper(async () => null)

export function callIndexer<ReturnValue, Params>(
  document: DocumentNode,
  params: Params
) {
  const res: Promise<ReturnValue> = request(indexingService, document)
  return res
}

export function useIndexingQuery<Params, ReturnValue>(
  data: { key: string; params: IndexingParam<Params> },
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<any, Params>
) {
  const mergedConfig = mergeQueryConfig(
    mergeQueryConfig(config, defaultConfig),
    { enabled: !!indexingService }
  )
  const { document, ...otherParams } = data.params
  return useQuery(
    [data.key, otherParams],
    indexingQueryWrapper(({ params }: { params: Params }) => {
      return callIndexer<ReturnValue, Params>(document, params)
    }, null),
    mergedConfig as any
  )
}
