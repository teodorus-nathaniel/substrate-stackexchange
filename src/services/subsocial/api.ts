import { getSpaceId } from '#/lib/helpers/env'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyReactionId } from '@subsocial/types'
import { bnsToIds, idToBn } from '@subsocial/utils'
import {
  GetBatchReactionsByPostIdsAndAccountParam,
  GetBatchReplyIdsByPostIdsParam,
  GetFollowersParam,
  GetPostParam,
  GetProfileParam,
  GetReactionByPostIdAndAccountParam,
  GetRepliesParam,
  GetReplyIdsByPostIdParam,
  Reaction,
} from './types'

export async function getProfile({
  additionalData: api,
  params,
}: {
  params: GetProfileParam
  additionalData: FlatSubsocialApi
}) {
  return api.findProfile(params.address)
}

export async function getFollowers({
  additionalData: api,
  params,
}: {
  params: GetFollowersParam
  additionalData: FlatSubsocialApi
}) {
  const substrateApi = await api.subsocial.substrate.api
  const res = (await substrateApi.query.profileFollows.accountFollowers(
    params.address
  )) as any
  const followersOfAccount = bnsToIds(res)
  const followers = await api.findProfiles(followersOfAccount)
  return followers.map((profile, idx) => ({
    ...profile,
    address: followersOfAccount[idx],
  }))
}

export async function getReactionByPostIdAndAccount({
  additionalData: api,
  params,
}: {
  params: GetReactionByPostIdAndAccountParam
  additionalData: FlatSubsocialApi
}) {
  const substrateApi = api.subsocial.substrate
  const [reactionId] = await substrateApi.getPostReactionIdsByAccount(
    params.address,
    [params.postId as any]
  )
  const reaction = await substrateApi.findReaction(reactionId)
  return reaction?.toJSON() as any as Reaction
}

export async function getBatchReactionsByPostIdsAndAccount({
  additionalData: api,
  params,
}: {
  params: GetBatchReactionsByPostIdsAndAccountParam
  additionalData: FlatSubsocialApi
}) {
  const substrate = api.subsocial.substrate
  const substrateApi = await substrate.api
  const tuples = params.postIds.map((id) => [params.address, id])
  const reactionIds =
    await substrateApi.query.reactions.postReactionIdByAccount.multi(tuples)
  return (
    await substrate.findReactions(reactionIds as unknown as AnyReactionId[])
  ).map((reaction) => reaction.toJSON())
}

export async function getReplyIdsByPostId({
  additionalData: api,
  params,
}: {
  params: GetReplyIdsByPostIdParam
  additionalData: FlatSubsocialApi
}) {
  const substrateApi = api.subsocial.substrate
  return substrateApi.getReplyIdsByPostId(idToBn(params.postId))
}

export async function getBatchReplyIdsByPostIds({
  additionalData: api,
  params,
}: {
  params: GetBatchReplyIdsByPostIdsParam
  additionalData: FlatSubsocialApi
}) {
  const substrateApi = api.subsocial.substrate
  const promises = params.postIds.map((id) =>
    substrateApi.getReplyIdsByPostId(idToBn(id))
  )
  return Promise.all(promises)
}

export async function getPost({
  additionalData: api,
  params,
}: {
  params: GetPostParam
  additionalData: FlatSubsocialApi
}) {
  return api.findPostWithSomeDetails({ id: params.postId as any })
}

export async function getAllQuestions({
  additionalData: api,
}: {
  additionalData: FlatSubsocialApi
}) {
  const substrate = api.subsocial.substrate
  const postIds = await substrate.postIdsBySpaceId(getSpaceId() as any)
  return api.findPublicPosts(postIds)
}

export async function getReplies({
  params,
  additionalData: api,
}: {
  params: GetRepliesParam
  additionalData: FlatSubsocialApi
}) {
  const replyIds = await getReplyIdsByPostId({ params, additionalData: api })
  return api.findPublicPostsWithSomeDetails({
    ids: replyIds,
  })
}
