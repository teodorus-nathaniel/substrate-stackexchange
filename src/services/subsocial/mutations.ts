import { DEFAULT_SPACE_PERMISSIONS } from '#/lib/constants/subsocial'
import { getSpaceId } from '#/lib/helpers/env'
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { MutationConfig } from '../common/base'
import { Transaction, useSubsocialMutation } from './base'
import {
  invalidateGetAllQuestions,
  invalidateGetPost,
  invalidateGetProfile,
  invalidateGetReactionByPostIdAndAccount,
  invalidateGetReplies,
  invalidateGetReplyIdsByPostId,
} from './queries'
import {
  CreateAnswerPayload,
  CreateQuestionPayload,
  CreateSpacePayload,
  UpdateProfilePayload,
  UpsertReactionPayload,
} from './types'

export function useCreateSpace(config?: MutationConfig<CreateSpacePayload>) {
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
    ) as unknown as Transaction
    return { tx, summary: `Creating Space ${name}` }
  }, config)
}

export function useCreatePost(config?: MutationConfig<CreateQuestionPayload>) {
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
      ) as unknown as Transaction
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

export function useUpdateProfile(
  config?: MutationConfig<UpdateProfilePayload>
) {
  return useSubsocialMutation(
    async (data, { ipfsApi, substrateApi }) => {
      const { about, avatar, name, profileId } = data
      let avatarCid = undefined
      if (typeof avatar === 'object') {
        avatarCid = await ipfsApi.saveFile(avatar)
      } else if (typeof avatar === 'string') {
        avatarCid = avatar
      }
      const profileCid = await ipfsApi.savePost({
        avatar: avatarCid,
        name,
        about,
      } as any)
      let tx
      if (profileId) {
        tx = substrateApi.tx.profiles.updateProfile({
          content: IpfsContent(profileCid),
        })
      } else {
        tx = substrateApi.tx.profiles.createProfile(IpfsContent(profileCid))
      }
      return { tx: tx as unknown as Transaction, summary: `Creating Post` }
    },
    config,
    {
      onTxSuccess: (_, address) => {
        invalidateGetProfile({ address })
      },
    }
  )
}

export function useUpsertReaction(
  config?: MutationConfig<UpsertReactionPayload>
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
      return { tx: tx as unknown as Transaction, summary }
    },
    config,
    {
      onTxSuccess: (data, address) => {
        invalidateGetReactionByPostIdAndAccount({
          postId: data.postId,
          address,
        })
        invalidateGetPost({
          postId: data.postId,
        })
      },
    }
  )
}

export function useCreateReply(config?: MutationConfig<CreateAnswerPayload>) {
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
      ) as unknown as Transaction
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
