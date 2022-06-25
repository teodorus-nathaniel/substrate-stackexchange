import Link from '#/components/Link'
import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface FollowingFollowerCountProps
  extends HTMLProps<HTMLDivElement> {}

export default function FollowingFollowerCount({
  className,
  ...props
}: FollowingFollowerCountProps) {
  return (
    <div
      className={clsx('flex items-center', 'flex space-x-2', className)}
      {...props}
    >
      <Link
        variant='primary'
        className={clsx('text-sm', 'text-text-primary text-center')}
      >
        813 Followers
      </Link>
      <span className='text-lg font-bold'> &middot; </span>
      <Link
        variant='primary'
        className={clsx('text-sm', 'text-text-primary text-center')}
      >
        813 Following
      </Link>
    </div>
  )
}
