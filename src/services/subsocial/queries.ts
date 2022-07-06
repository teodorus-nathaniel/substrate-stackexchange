import { useWalletContext } from '#/contexts/WalletContext'
import queryClient from '../client'
import { createQueryInvalidation } from '../common/base'
import { QueryConfig } from '../common/types'
import {
  getAllQuestions,
  getBatchReactionsByPostIdsAndAccount,
  getProfile,
  getQuestion,
  getReactionByPostIdAndAccount,
  getReplies,
  getReplyIdsByPostId,
} from './api'
import { useSubsocialQuery } from './base'
import {
  GetProfileParam,
  GetQuestionParam,
  GetReactionByPostIdAndAccountParam,
  GetRepliesParam,
  GetReplyIdsByPostIdParam,
} from './types'

export const getProfileKey = 'getProfile'
export const invalidateGetProfile =
  createQueryInvalidation<GetProfileParam>(getProfileKey)
export function useGetProfile(
  data: Partial<GetProfileParam>,
  config?: QueryConfig
) {
  return useSubsocialQuery(
    { key: getProfileKey, data: { address: data.address ?? '' } },
    getProfile,
    config,
    { enabled: !!data?.address }
  )
}
export function useGetCurrentUser() {
  const [wallet] = useWalletContext()
  return useSubsocialQuery(
    {
      key: getProfileKey,
      data: { address: wallet?.address ?? '' },
    },
    getProfile,
    { enabled: !!wallet?.address }
  )
}

export const getReactionByPostIdAndAccountKey = 'getReactionByPostIdAndAccount'
export const invalidateGetReactionByPostIdAndAccount =
  createQueryInvalidation<GetReactionByPostIdAndAccountParam>(
    getReactionByPostIdAndAccountKey
  )
export function useGetReactionByPostIdAndAccount(
  data: GetReactionByPostIdAndAccountParam
) {
  return useSubsocialQuery(
    { key: getReactionByPostIdAndAccountKey, data },
    getReactionByPostIdAndAccount
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
    getReactionByPostIdAndAccount,
    { enabled: !!address && !!postId }
  )
}

export const getReplyIdsByPostIdKey = 'getReplyIdsByPostId'
export const invalidateGetReplyIdsByPostId =
  createQueryInvalidation<GetReplyIdsByPostIdParam>(getReplyIdsByPostIdKey)
export function useGetReplyIdsByPostId(
  data: Partial<GetReplyIdsByPostIdParam>
) {
  return useSubsocialQuery(
    { key: getReplyIdsByPostIdKey, data: { postId: data.postId! } },
    getReplyIdsByPostId,
    { enabled: !!data.postId }
  )
}

export const getQuestionKey = 'getQuestion'
export const invalidateGetQuestion =
  createQueryInvalidation<GetQuestionParam>(getQuestionKey)
export function useGetQuestion(data: GetQuestionParam) {
  return useSubsocialQuery({ data, key: getQuestionKey }, getQuestion)
}

export const getRepliesKey = 'getReplies'
export const invalidateGetReplies =
  createQueryInvalidation<GetRepliesParam>(getRepliesKey)
export function useGetReplies(
  data: Partial<GetRepliesParam>,
  config?: QueryConfig
) {
  return useSubsocialQuery(
    { data: { postId: data.postId ?? '' }, key: getRepliesKey },
    getReplies,
    config,
    { enabled: !!data.postId }
  )
}

export const getAllQuestionsKey = 'getAllQuestions'
export const invalidateGetAllQuestions =
  createQueryInvalidation(getAllQuestionsKey)
export function useGetAllQuestions() {
  const [wallet] = useWalletContext()

  return useSubsocialQuery(
    { key: getAllQuestionsKey, data: null },
    async ({ additionalData: api }) => {
      const questions = await getAllQuestions({ additionalData: api })

      async function getReactionsFromUser() {
        if (!wallet) return
        const reactions = await getBatchReactionsByPostIdsAndAccount({
          params: {
            address: wallet.address,
            postIds: questions.map(({ id }) => id),
          },
          additionalData: api,
        })
        const promises = reactions.map((reaction, idx) => {
          const param: GetReactionByPostIdAndAccountParam = {
            address: wallet.address,
            postId: questions[idx].id.toString() as any,
          }
          return queryClient.setQueryData(
            [getReactionByPostIdAndAccountKey, param],
            reaction
          )
        })

        return Promise.all(promises)
      }
      await getReactionsFromUser()

      // TODO: This is disabled until there is better way to batch get reply. Currently its better to just fetch it when needed
      // async function getReplyIds() {
      //   const questionReplyIds = await getBatchReplyIdsByPostIds(api, {
      //     postIds: questions.map(({ id }) => id),
      //   })
      //   const promises = questionReplyIds.map((replyIds, idx) => {
      //     const param: GetReplyIdsByPostIdParam = {
      //       postId: questions[idx].id.toString() as any,
      //     }
      //     return queryClient.setQueryData(
      //       [getReplyIdsByPostIdKey, param],
      //       replyIds
      //     )
      //   })
      //   return Promise.all(promises)
      // }
      // await getReplyIds()

      return questions
    }
  )
}
