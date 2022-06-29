import Button from '#/components/Button'
import SkeletonFallback from '#/components/SkeletonFallback'
import { useUpsertReaction } from '#/services/subsocial/mutations'
import { useGetUserReactionByPostId } from '#/services/subsocial/queries'
import { ReactionType } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import { BsTriangle, BsTriangleFill } from 'react-icons/bs'

interface Props extends HTMLProps<HTMLDivElement> {
  isLoading?: boolean
  postId?: string
  upVoteCount?: number
  downVoteCount?: number
  noButtons?: boolean
  noDownVote?: boolean
}

export default function ReactionButtons({
  isLoading,
  postId,
  className,
  noButtons,
  noDownVote,
  downVoteCount = 0,
  upVoteCount = 0,
  ...props
}: Props) {
  const { data: reaction, isLoading: localIsLoading } =
    useGetUserReactionByPostId({ postId })
  const { mutate: upsertReaction } = useUpsertReaction()

  const isDownVoted = reaction?.kind === 'Downvote'
  const isUpVoted = reaction?.kind === 'Upvote'
  const combinedIsLoading = isLoading || localIsLoading

  const onClickReaction = (kind: ReactionType) => () => {
    const shouldDeleteReaction =
      (kind === 'Downvote' && isDownVoted) || (kind === 'Upvote' && isUpVoted)
    if (!postId) return
    console.log('UPSERTING REACTION...')
    upsertReaction({
      kind: shouldDeleteReaction ? '' : kind,
      postId,
      reactionId: reaction?.id,
    })
  }

  const buttonClassNames = clsx('flex space-x-2 items-center', 'text-xl')

  return (
    <div
      className={clsx('flex flex-col items-center', 'space-y-2', className)}
      {...props}
    >
      {!noButtons && (
        <div>
          <Button
            variant='unstyled'
            rounded
            size='icon-medium'
            innerContainerClassName={buttonClassNames}
            disabled={combinedIsLoading}
            disabledCursor='loading'
            onClick={onClickReaction('Upvote')}
          >
            <SkeletonFallback width={50} isLoading={isLoading}>
              {isUpVoted ? <BsTriangleFill /> : <BsTriangle />}
            </SkeletonFallback>
          </Button>
        </div>
      )}
      <div
        className={clsx(
          'rounded-md',
          noButtons && 'bg-brand',
          'flex items-center justify-center',
          'w-[2.5rem] py-1 relative'
        )}
      >
        <SkeletonFallback
          color='brand'
          className={clsx('absolute', 'inset-0', 'w-full h-full')}
          isLoading={isLoading}
        >
          <p>{upVoteCount - downVoteCount}</p>
        </SkeletonFallback>
      </div>
      {!noButtons && !noDownVote && (
        <div>
          <Button
            variant='unstyled'
            rounded
            size='icon-medium'
            className={clsx('rotate-180')}
            innerContainerClassName={buttonClassNames}
            disabled={combinedIsLoading}
            disabledCursor='loading'
            onClick={onClickReaction('Downvote')}
          >
            <SkeletonFallback width={50} isLoading={isLoading}>
              {isDownVoted ? <BsTriangleFill /> : <BsTriangle />}
            </SkeletonFallback>
          </Button>
        </div>
      )}
    </div>
  )
}
