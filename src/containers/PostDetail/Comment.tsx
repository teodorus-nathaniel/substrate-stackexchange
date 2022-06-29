import Button from '#/components/Button'
import Link from '#/components/Link'
import { formatDate } from '#/lib/helpers/date'
import { ProfileData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import { BsTriangle } from 'react-icons/bs'

export interface CommentsProps extends HTMLProps<HTMLDivElement> {
  comment: string
  creator: ProfileData
  createdAt: number
}

export default function Comment({
  comment,
  createdAt,
  creator,
  className,
  ...props
}: CommentsProps) {
  return (
    <div className={clsx('flex relative text-sm', className)} {...props}>
      <Button
        variant='unstyled'
        size='icon-small'
        rounded
        className={clsx('absolute', '-left-1 -translate-x-full')}
      >
        <BsTriangle />
      </Button>
      <span className={clsx('mr-2')}>101</span>
      <p>
        {comment} -{' '}
        <Link
          variant='primary'
          className={clsx('font-bold')}
          href={`/profile/${creator.id}`}
        >
          {creator.content?.name}
        </Link>
        <span className={clsx('text-text-disabled')}>
          {' '}
          {formatDate(createdAt)}
        </span>
      </p>
    </div>
  )
}
