import { useUpsertReaction } from '#/services/subsocial/mutations'
import { useGetUserReactionByPostId } from '#/services/subsocial/queries'
import { ReactionType } from '@subsocial/types/dto'
import { useCallback } from 'react'

export default function useUserReactionInteraction(postId?: string) {
  const userReaction = useGetUserReactionByPostId({ postId })
  const { data: reaction } = userReaction
  const { mutate: upsertReaction } = useUpsertReaction()

  const isDownVoted = reaction?.kind === 'Downvote'
  const isUpVoted = reaction?.kind === 'Upvote'

  const onClickReaction = useCallback(
    (kind: ReactionType) => () => {
      const shouldDeleteReaction =
        (kind === 'Downvote' && isDownVoted) || (kind === 'Upvote' && isUpVoted)
      if (!postId) return
      console.log('UPSERTING REACTION...')
      upsertReaction({
        kind: shouldDeleteReaction ? '' : kind,
        postId,
        reactionId: reaction?.id,
      })
    },
    [isDownVoted, isUpVoted, postId, reaction, upsertReaction]
  )

  return {
    userReaction,
    onClickReaction,
    isDownVoted,
    isUpVoted,
  }
}
