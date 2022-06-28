import { useWalletContext } from '#/contexts/WalletContext'
import { getSpaceId } from '#/lib/helpers/env'
import { PostId } from '@subsocial/types/dto'
import { useSubsocialQuery } from './api'

export const getProfileKey = 'getProfile'
export type GetProfileParam = { address: string }
export function useGetProfile(data: GetProfileParam) {
  return useSubsocialQuery(
    { key: getProfileKey, data },
    async (api, params) => {
      return api.findProfile(params.address)
    }
  )
}
export function useGetCurrentUser() {
  const [wallet] = useWalletContext()
  return useSubsocialQuery(
    { key: getProfileKey, data: { address: wallet?.address ?? '' } },
    async (api, params) => {
      return api.findProfile(params?.address)
    },
    { enabled: !!wallet?.address }
  )
}

export const getAllQuestionsKey = 'getAllQuestions'
export function useGetAllQuestions() {
  return useSubsocialQuery(
    { key: getAllQuestionsKey, data: null },
    async (api) => {
      const substrateApi = await api.subsocial.substrate.api
      const postIds: PostId[] = await (substrateApi as any)?.postIdsBySpaceId(
        getSpaceId()
      )
      return api.findPublicPosts(postIds)
    }
  )
}
