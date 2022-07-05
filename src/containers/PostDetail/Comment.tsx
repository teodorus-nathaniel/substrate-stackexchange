import Button from '#/components/Button'
import Link from '#/components/Link'
import { formatDate } from '#/lib/helpers/date'
import { ProfileData } from '@subsocial/types/dto'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import { BsTriangle } from 'react-icons/bs'

export interface CommentsProps extends HTMLProps<HTMLDivElement> {
  comment: string
  creator?: ProfileData
  creatorId: string
  createdAt: number
  upVoteCount?: number
}

export default function Comment({
  comment,
  createdAt,
  creator,
  creatorId,
  className,
  upVoteCount,
  ...props
}: CommentsProps) {
  return (
    <div className={clsx('flex relative text-sm', className)} {...props}>
      <span className={clsx('absolute', '-left-1 -translate-x-full')}>
        {upVoteCount || ' '}
      </span>
      <div>
        <Button
          variant='unstyled'
          size='icon-small'
          rounded
          className={clsx('mr-2')}
        >
          <BsTriangle />
        </Button>
      </div>
      <p>
        {comment} -{' '}
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
