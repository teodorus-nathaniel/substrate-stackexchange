import { DEFAULT_SPACE_PERMISSIONS } from '#/lib/constants/subsocial'
import { getSpaceId } from '#/lib/helpers/env'
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { SubsocialMutationConfig, useSubsocialMutation } from './base'
import {
  invalidateGetAllQuestions,
  invalidateGetQuestion,
  invalidateGetReactionByPostIdAndAccount,
  invalidateGetReplies,
  invalidateGetReplyIdsByPostId,
} from './queries'
import {
  CreateAnswerPayload,
  CreateQuestionPayload,
  CreateSpacePayload,
  TransferPayload,
  UpsertReactionPayload,
} from './types'

export function useCreateSpace(
  config?: SubsocialMutationConfig<CreateSpacePayload>
) {
  return useSubsocialMutation(async (data, { ipfsApi, substrateApi }) => {
    const { avatar, name, desc } = data
    let avatarCid: string | undefined
    if (avatar) {
      avatarCid = await ipfsApi.saveFile(avatar)
    }
    const spaceCid = await ipfsApi.saveContent({
      name,
      about: desc,
      image: avatarCid,
    } as any)
    const tx = substrateApi.tx.spaces.createSpace(
      null,
      null,
      IpfsContent(spaceCid),
      DEFAULT_SPACE_PERMISSIONS
    )
    return { tx, summary: `Creating Space ${name}` }
  }, config)
}

export function useCreatePost(
  config?: SubsocialMutationConfig<CreateQuestionPayload>
) {
  return useSubsocialMutation(
    async (data, { ipfsApi, substrateApi }) => {
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
    },
    config,
    {
      onTxSuccess: () => {
        invalidateGetAllQuestions()
      },
    }
  )
}

export function useUpsertReaction(
  config?: SubsocialMutationConfig<UpsertReactionPayload>
) {
  return useSubsocialMutation(
    async (data, { substrateApi }) => {
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
    },
    config,
    {
      onTxSuccess: (data, address) => {
        invalidateGetReactionByPostIdAndAccount({
          postId: data.postId,
          address,
        })
        invalidateGetQuestion({
          postId: data.postId,
        })
      },
    }
  )
}

export function useCreateReply(
  config?: SubsocialMutationConfig<CreateAnswerPayload>
) {
  return useSubsocialMutation(
    async (data, { substrateApi, ipfsApi }) => {
      const { body, rootPostId, isAnswer } = data
      const postCid = await ipfsApi.saveContent({
        body,
        isAnswer,
      } as any)
      const tx = substrateApi.tx.posts.createPost(
        getSpaceId(),
        { Comment: { parentId: null, rootPostId } },
        IpfsContent(postCid)
      )
      return { tx, summary: `Answering question` }
    },
    config,
    {
      onTxSuccess: (data) => {
        invalidateGetReplyIdsByPostId({
          postId: data.rootPostId,
        })
        invalidateGetReplies({
          postId: data.rootPostId,
        })
      },
    }
  )
}

export function useTransfer(config?: SubsocialMutationConfig<TransferPayload>) {
  return useSubsocialMutation(async (data, { substrateApi }) => {
    const { dest, value } = data
    const tx = substrateApi.tx.balances.transfer(dest, value)
    return { tx, summary: `Transferring ${value} coins` }
  }, config)
}
