import queryClient from '../client'
import { QueryConfig } from './types'

export function generateQueryWrapper<ReturnOfPreQuery, CommonParams>(
  preQueryRun: (data: CommonParams) => Promise<ReturnOfPreQuery>
) {
  return <ReturnType, Params extends CommonParams, AdditionalParam>(
    func: (data: {
      params: Params
      additionalData: AdditionalParam
      preQueryData: ReturnOfPreQuery
    }) => Promise<ReturnType>,
    additionalData: AdditionalParam
  ) => {
    return async ({ queryKey }: any) => {
      const preQueryData = await preQueryRun(queryKey[1])
      return func({ params: queryKey[1], additionalData, preQueryData })
    }
  }
}

export function mergeQueryConfig<T, V>(
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<T, V>
): QueryConfig<T, V> {
  return {
    ...defaultConfig,
    ...config,
    enabled: (defaultConfig?.enabled ?? true) && (config?.enabled ?? true),
  }
}

export function createQueryInvalidation<Param>(key: string) {
  return (data?: Param) => {
    queryClient.invalidateQueries([key, data])
  }
}

export function makeCombinedCallback(
  defaultConfig: any,
  config: any,
  attr: string
) {
  return (...data: any[]) => {
    defaultConfig && defaultConfig[attr] && defaultConfig[attr](...data)
    config && config[attr] && config[attr](...data)
  }
}
