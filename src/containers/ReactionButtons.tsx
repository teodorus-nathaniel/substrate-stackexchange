import Button from '#/components/Button'
import SkeletonFallback from '#/components/SkeletonFallback'
import { useUpsertReaction } from '#/services/subsocial/mutations'
import { useGetUserReactionByPostId } from '#/services/subsocial/queries'
import { ReactionType } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs'

interface Props extends HTMLProps<HTMLDivElement> {
  postId?: string
  reactionId?: string
  upVoteCount?: number
  downVoteCount?: number
}

export default function ReactionButtons({
  postId,
  reactionId,
  className,
  downVoteCount,
  upVoteCount,
  ...props
}: Props) {
  const { data: reaction, isLoading } = useGetUserReactionByPostId({ postId })
  const { mutate: upsertReaction } = useUpsertReaction()

  const isDownVoted = reaction?.kind === 'Downvote'
  const isUpVoted = reaction?.kind === 'Upvote'

  const onClickReaction = (kind: ReactionType) => () => {
    const shouldDeleteReaction =
      (kind === 'Downvote' && isDownVoted) || (kind === 'Upvote' && isUpVoted)
    if (!postId) return
    console.log('UPSERTING REACTION...')
    upsertReaction({
      kind: shouldDeleteReaction ? '' : kind,
      postId,
      reactionId: reactionId,
    })
  }

  return (
    <div
      className={clsx('flex items-center', 'space-x-6', className)}
      {...props}
    >
      <Button
        variant='nothing'
        size='content'
        innerContainerClassName={clsx('flex space-x-2 items-center')}
        disabled={isLoading}
        onClick={onClickReaction('Upvote')}
      >
        <SkeletonFallback width={50} isLoading={isLoading}>
          {isUpVoted ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
          <p>{upVoteCount}</p>
        </SkeletonFallback>
      </Button>
      <Button
        variant='nothing'
        size='content'
        innerContainerClassName={clsx('flex space-x-2 items-center')}
        disabled={isLoading}
        onClick={onClickReaction('Downvote')}
      >
        <SkeletonFallback width={50} isLoading={isLoading}>
          {isDownVoted ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
          <p>{downVoteCount}</p>
        </SkeletonFallback>
      </Button>
    </div>
  )
}
