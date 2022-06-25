import { useWalletContext } from '#/contexts/WalletContext'
import { useSubsocialQuery } from './api'

export const getProfileKey = 'getProfile'
export type GetProfileParam = { address: string }
export function useGetProfile(data: GetProfileParam) {
  return useSubsocialQuery(
    { key: getProfileKey, data },
    async (params, api) => {
      return api.findProfile(params.address)
    }
  )
}
export function useGetCurrentUser() {
  const [wallet] = useWalletContext()
  return useSubsocialQuery(
    { key: getProfileKey, data: { address: wallet?.address ?? '' } },
    async (params, api) => {
      return api.findProfile(params?.address)
    },
    { enabled: !!wallet?.address }
  )
}
