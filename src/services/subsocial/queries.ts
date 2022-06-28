import { useWalletContext } from '#/contexts/WalletContext'
import { getSpaceId } from '#/lib/helpers/env'
import { AnyReactionId } from '@subsocial/types'
import queryClient from '../client'
import { useSubsocialQuery } from './api'

export const getProfileKey = 'getProfile'
export type GetProfileParam = { address: string }
export function useGetProfile(data: Partial<GetProfileParam>) {
  return useSubsocialQuery(
    { key: getProfileKey, data },
    async (api, params) => {
      return api.findProfile(params.address ?? '')
    },
    { enabled: !!data?.address }
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

export const getReactionByPostIdAndAccountKey = 'getReactionByPostIdAndAccount'
export type GetReactionByPostIdAndAccountParam = {
  address: string
  postId: string
}
export function useGetReactionByPostIdAndAccount(
  data: GetReactionByPostIdAndAccountParam
) {
  return useSubsocialQuery(
    { key: getReactionByPostIdAndAccountKey, data },
    async (api, params) => {
      const substrateApi = api.subsocial.substrate
      const reactionIds = await substrateApi.getPostReactionIdsByAccount(
        params.address,
        [params.postId as any]
      )
      return substrateApi.findReactions(reactionIds)
    }
  )
}
export function useGetUserReactionByPostId(
  data: Partial<Omit<GetReactionByPostIdAndAccountParam, 'address'>>
) {
  const [wallet] = useWalletContext()
  return useSubsocialQuery(
    { key: getReactionByPostIdAndAccountKey, data },
    async (api, params) => {
      const substrateApi = api.subsocial.substrate
      console.log('KEPANGGIL')
      const reactionIds = await substrateApi.getPostReactionIdsByAccount(
        wallet!.address,
        [params.postId as any]
      )
      return substrateApi.findReactions(reactionIds)
    },
    { enabled: !!wallet?.address && !!data.postId }
  )
}

export const getAllQuestionsKey = 'getAllQuestions'
export function useGetAllQuestions() {
  const [wallet] = useWalletContext()

  return useSubsocialQuery(
    { key: getAllQuestionsKey, data: null },
    async (api) => {
      const substrate = api.subsocial.substrate
      const postIds = await substrate.postIdsBySpaceId(getSpaceId() as any)

      async function getReactionsFromUser() {
        console.log({ wallet }, !wallet)
        if (!wallet) return
        console.log('HALO')
        const substrateApi = await substrate.api
        const tuples = postIds.map((postId) => [wallet?.address, postId])
        const reactionIds =
          await substrateApi.query.reactions.postReactionIdByAccount.multi(
            tuples
          )
        // console.log({ reactionIds })
        const reactions = await substrate.findReactions(
          reactionIds as unknown as AnyReactionId[]
        )
        // console.log({ reactions })
        const promises = reactions.map((reaction, idx) => {
          const param: GetReactionByPostIdAndAccountParam = {
            address: wallet.address,
            postId: postIds[idx] as any,
          }
          // console.log(reaction, param)
          return queryClient.setQueryData(
            [getReactionByPostIdAndAccountKey, param],
            reaction
          )
        })
        return Promise.all(promises)
      }
      await getReactionsFromUser()

      return api.findPublicPosts(postIds)
    }
  )
}
