import { getSpaceId } from '#/lib/helpers/env'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyReactionId } from '@subsocial/types'
import { idToBn } from '@subsocial/utils'
import {
  GetBatchReactionsByPostIdsAndAccountParam,
  GetBatchReplyIdsByPostIdsParam,
  GetProfileParam,
  GetReactionByPostIdAndAccountParam,
  GetReplyIdsByPostIdParam,
  Reaction,
} from './types'

export async function getProfile(
  api: FlatSubsocialApi,
  params: GetProfileParam
) {
  return api.findProfile(params.address)
}

export async function getReactionByPostIdAndAccount(
  api: FlatSubsocialApi,
  params: GetReactionByPostIdAndAccountParam
) {
  const substrateApi = api.subsocial.substrate
  const [reactionId] = await substrateApi.getPostReactionIdsByAccount(
    params.address,
    [params.postId as any]
  )
  const reaction = await substrateApi.findReaction(reactionId)
  return reaction?.toJSON() as any as Reaction
}

export async function getBatchReactionsByPostIdsAndAccount(
  api: FlatSubsocialApi,
  params: GetBatchReactionsByPostIdsAndAccountParam
) {
  const substrate = api.subsocial.substrate
  const substrateApi = await substrate.api
  const tuples = params.postIds.map((id) => [params.address, id])
  const reactionIds =
    await substrateApi.query.reactions.postReactionIdByAccount.multi(tuples)
  return (
    await substrate.findReactions(reactionIds as unknown as AnyReactionId[])
  ).map((reaction) => reaction.toJSON())
}

export async function getReplyIdsByPostId(
  api: FlatSubsocialApi,
  params: GetReplyIdsByPostIdParam
) {
  const substrateApi = api.subsocial.substrate
  return substrateApi.getReplyIdsByPostId(idToBn(params.postId))
}

export async function getBatchReplyIdsByPostIds(
  api: FlatSubsocialApi,
  params: GetBatchReplyIdsByPostIdsParam
) {
  const substrateApi = api.subsocial.substrate
  const promises = params.postIds.map((id) =>
    substrateApi.getReplyIdsByPostId(idToBn(id))
  )
  return Promise.all(promises)
}

export async function getAllQuestions(api: FlatSubsocialApi) {
  const substrate = api.subsocial.substrate
  const postIds = await substrate.postIdsBySpaceId(getSpaceId() as any)
  return api.findPublicPosts(postIds)
}
