import Chip from '#/components/Chip'
import Link from '#/components/Link'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import ReactionButtons from './ReactionButtons'
import UserProfileLink from './UserProfileLink'

interface Props extends HTMLProps<HTMLDivElement> {}

export default function Post({ className, ...props }: Props) {
  return (
    <div
      className={clsx(
        'bg-bg-100 px-6 pt-6 pb-4 rounded-md',
        'flex flex-col',
        className
      )}
      {...props}
    >
      <div className='flex'>
        <Link
          variant='primary'
          href='https://google.com'
          className={clsx('text-xl')}
        >
          Function to see whether transaction is finalized
        </Link>
      </div>
      <div className={clsx('flex flex-wrap space-x-2 pt-2')}>
        <Link href='https://google.com'>
          <Chip>storage</Chip>
        </Link>
        <Link href='https://google.com'>
          <Chip>macro</Chip>
        </Link>
      </div>
      <p className={clsx('text-sm', 'pt-2', 'text-text-secondary')}>
        {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        distinctio iste sunt laudantium corrupti aut nobis tempora numquam
        voluptatum expedita consequatur consectetur hic dolore officiis
        reprehenderit. Nisi quae laudantium quasi! lorem`.substring(0, 200)}
        ...
      </p>
      <div className={clsx('flex justify-between', 'pt-4')}>
        <ReactionButtons
          downVoteCount={20}
          isDownVoted
          isUpVoted={false}
          upVoteCount={123}
        />
        <div className={clsx('text-sm', 'flex items-center', 'space-x-1')}>
          <UserProfileLink className={clsx('font-sm')} />
          <p className='text-text-secondary'>asked 5 hours ago</p>
        </div>
      </div>
    </div>
  )
}
