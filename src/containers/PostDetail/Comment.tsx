import Button from '#/components/Button'
import Link from '#/components/Link'
import ReactionArrowIcon from '#/components/ReactionArrowIcon'
import { formatDate } from '#/lib/helpers/date'
import useUserReactionInteraction from '#/lib/hooks/subsocial/useUserReactionInteraction'
import { PostWithSomeDetails } from '@subsocial/types/dto'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface CommentsProps extends HTMLProps<HTMLDivElement> {
  comment: PostWithSomeDetails
}

export default function Comment({
  comment,
  className,
  ...props
}: CommentsProps) {
  const {
    isUpVoted,
    onClickReaction,
    userReaction: { isLoading },
  } = useUserReactionInteraction(comment.id)

  const upVoteCount = comment.post.struct.upvotesCount
  const creator = comment.owner
  const creatorId = comment.post.struct.createdByAccount
  const createdAt = comment.post.struct.createdAtTime
  const commentBody = comment.post.content?.body

  return (
    <div className={clsx('flex relative text-sm', className)} {...props}>
      <span className={clsx('absolute', '-left-1 -translate-x-full')}>
        {upVoteCount || ' '}
      </span>
      <div>
        <Button
          onClick={onClickReaction('Upvote')}
          disabled={isLoading}
          variant='unstyled'
          size='icon-small'
          rounded
          className={clsx('mr-2')}
        >
          <ReactionArrowIcon type='Upvote' isActive={isUpVoted} />
        </Button>
      </div>
      <p>
        {commentBody} -{' '}
        <Link
          variant='primary'
          className={clsx('font-bold')}
          href={`/profile/${creator?.id}`}
        >
          {creator?.content?.name ?? truncateMiddle(creatorId)}
        </Link>
        <span className={clsx('text-text-disabled')}>
          {' '}
          {formatDate(createdAt)}
        </span>
      </p>
    </div>
  )
}
