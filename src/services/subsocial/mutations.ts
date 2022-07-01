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
    const tx = substrateApi.tx.spaces.createSpace(
      null,
      name,
      IpfsContent(spaceCid),
      {
        permissions: {
          everyone: [
            'CreatePosts',
            'UpdateOwnPosts',
            'DeleteOwnPosts',
            'HideOwnPosts',
          ],
        },
      }
    )
    return { tx, summary: `Creating Space ${name}` }
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
    const tx = substrateApi.tx.posts.createPost(
      getSpaceId(),
      { RegularPost: null },
      IpfsContent(postCid)
    )
    return { tx, summary: `Creating Post` }
  }, config)
}

export function useUpsertReaction(
  config?: SubsocialMutationConfig<UpsertReactionPayload>
) {
  return useSubsocialMutation(async (data, { substrateApi }) => {
    const { kind, postId, reactionId } = data
    let tx
    const reactionActionMapper = {
      Downvote: 'Downvoting post',
      Upvote: 'Upvoting post',
      '': 'Deleting reaction',
    }
    const summary = reactionActionMapper[kind]
    if (reactionId) {
      if (kind === '') {
        tx = substrateApi.tx.reactions.deletePostReaction(postId, reactionId)
      } else {
        tx = substrateApi.tx.reactions.updatePostReaction(
          postId,
          reactionId,
          kind
        )
      }
    } else {
      tx = substrateApi.tx.reactions.createPostReaction(postId, kind)
    }
    return { tx, summary }
  }, config)
}
