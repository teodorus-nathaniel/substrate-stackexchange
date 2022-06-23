import useSubsocialQuery from './api'

export const getProfileKey = 'getProfile'
type GetProfileParam = { address: string }
export function useGetProfile(data: GetProfileParam) {
  return useSubsocialQuery(
    { key: getProfileKey, data },
    async (params, api) => {
      return api?.findProfile(params.address)
    }
  )
}
