import { getSpaceId } from '#/lib/helpers/env'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import {
  GetProfileParam,
  GetReactionByPostIdAndAccountParam,
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

export async function getAllQuestions(api: FlatSubsocialApi) {
  const substrate = api.subsocial.substrate
  const postIds = await substrate.postIdsBySpaceId(getSpaceId() as any)
  return api.findPublicPosts(postIds)
}
