import { getSpaceId } from '#/lib/helpers/env'
import { Hash } from '@polkadot/types/interfaces'
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { UseMutationOptions } from 'react-query'
import { useSubsocialMutation } from './base'
import {
  CreateQuestionPayload,
  CreateSpacePayload,
  UpsertReactionPayload,
} from './types'

type SubsocialMutationConfig<T> = UseMutationOptions<Hash, Error, T, unknown>

export function useCreateSpace(
  config?: SubsocialMutationConfig<CreateSpacePayload>
) {
  return useSubsocialMutation(async (data, { ipfsApi, substrateApi }) => {
    const { avatar, name, desc } = data
    let avatarCid: string | undefined
    if (avatar) {
      avatarCid = await ipfsApi.saveFile(avatar)
    }
    const spaceCid = await ipfsApi.saveSpace({
      name,
      about: desc,
      image: avatarCid,
    } as any)
    return substrateApi.tx.spaces.createSpace(
      null,
      name,
      IpfsContent(spaceCid),
      null
    )
  }, config)
}

export function useCreatePost(
  config?: SubsocialMutationConfig<CreateQuestionPayload>
) {
  return useSubsocialMutation(async (data, { ipfsApi, substrateApi }) => {
    const { title, body, tags } = data
    const postCid = await ipfsApi.savePost({
      title,
      body,
      tags,
    } as any)
    return substrateApi.tx.posts.createPost(
      getSpaceId(),
      { RegularPost: null },
      IpfsContent(postCid)
    )
  }, config)
}

export function useUpsertReaction(
  config?: SubsocialMutationConfig<UpsertReactionPayload>
) {
  return useSubsocialMutation(async (data, { substrateApi }) => {
    const { kind, postId, reactionId } = data
    if (reactionId) {
      if (kind === '') {
        return substrateApi.tx.reactions.deletePostReaction(postId, reactionId)
      }
      return substrateApi.tx.reactions.updatePostReaction(
        postId,
        reactionId,
        kind
      )
    } else {
      return substrateApi.tx.reactions.createPostReaction(postId, kind)
    }
  }, config)
}
