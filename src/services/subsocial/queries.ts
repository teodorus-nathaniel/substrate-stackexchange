import { useWalletContext } from '#/contexts/WalletContext'
import { getSpaceId } from '#/lib/helpers/env'
import { AnyReactionId } from '@subsocial/types'
import queryClient from '../client'
import { useSubsocialQuery } from './api'
import {
  GetProfileParam,
  GetReactionByPostIdAndAccountParam,
  Reaction,
} from './types'

export const getProfileKey = 'getProfile'
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
export function useGetReactionByPostIdAndAccount(
  data: GetReactionByPostIdAndAccountParam
) {
  return useSubsocialQuery(
    { key: getReactionByPostIdAndAccountKey, data },
    async (api, params) => {
      const substrateApi = api.subsocial.substrate
      const [reactionId] = await substrateApi.getPostReactionIdsByAccount(
        params.address,
        [params.postId as any]
      )
      const reaction = await substrateApi.findReaction(reactionId)
      return reaction?.toJSON() as any as Reaction
    }
  )
}
export function useGetUserReactionByPostId(
  data: Partial<Omit<GetReactionByPostIdAndAccountParam, 'address'>>
) {
  const [wallet] = useWalletContext()
  const address = wallet?.address ?? ''
  const postId = data.postId ?? ''
  const usedData: GetReactionByPostIdAndAccountParam = {
    address,
    postId,
  }
  return useSubsocialQuery(
    { key: getReactionByPostIdAndAccountKey, data: usedData },
    async (api, params) => {
      const substrateApi = api.subsocial.substrate
      const [reactionId] = await substrateApi.getPostReactionIdsByAccount(
        wallet!.address,
        [params.postId as any]
      )
      const reaction = await substrateApi.findReaction(reactionId)
      return reaction?.toJSON() as any as Reaction
    },
    { enabled: !!address && !!postId }
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
        if (!wallet) return
        const substrateApi = await substrate.api
        const tuples = postIds.map((postId) => [wallet?.address, postId])
        const reactionIds =
          await substrateApi.query.reactions.postReactionIdByAccount.multi(
            tuples
          )
        const reactions = await substrate.findReactions(
          reactionIds as unknown as AnyReactionId[]
        )
        const promises = reactions.map((reaction, idx) => {
          const param: GetReactionByPostIdAndAccountParam = {
            address: wallet.address,
            postId: postIds[idx].toString() as any,
          }
          return queryClient.setQueryData(
            [getReactionByPostIdAndAccountKey, param],
            reaction.toJSON()
          )
        })
        return Promise.all(promises)
      }
      await getReactionsFromUser()

      return api.findPublicPosts(postIds)
    }
  )
}
