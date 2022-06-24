import {
  SubsocialApiState,
  useSubsocialApiContext,
} from '#/contexts/SubsocialApiContext'
import { useQuery, UseQueryOptions } from 'react-query'

function queryWrapper<T, V>(
  func: (data: V, api: SubsocialApiState) => T,
  subsocialApi: SubsocialApiState
) {
  return ({ queryKey }: any) => {
    return func(queryKey[1], subsocialApi)
  }
}

export default function useSubsocialQuery<T, V>(
  params: { key: string; data: V | null },
  func: (data: V, api: SubsocialApiState) => Promise<T>,
  config?: Omit<
    UseQueryOptions<T, unknown, T, (string | V | null)[]>,
    'queryFn' | 'queryKey'
  >
) {
  const subsocialApi = useSubsocialApiContext()
  return useQuery([params.key, params.data], queryWrapper(func, subsocialApi), {
    ...config,
    enabled: !!(subsocialApi && (subsocialApi as any)._subsocial),
  })
}
