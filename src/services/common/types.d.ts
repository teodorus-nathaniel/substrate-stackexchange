export type QueryConfig<T = any, V = any> = Omit<
  UseQueryOptions<T, unknown, T, (string | V | null)[]>,
  'queryFn' | 'queryKey'
>
