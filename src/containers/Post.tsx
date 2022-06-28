import Chip from '#/components/Chip'
import RichTextArea from '#/components/inputs/RichTextArea'
import Link from '#/components/Link'
import { PostData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import ReactionButtons from './ReactionButtons'
import UserProfileLink from './UserProfileLink'

export interface PostProps extends HTMLProps<HTMLDivElement> {
  post: PostData
  isLoading?: boolean
}

const BODY_MAX_LEN = 200

export default function PostOverview({
  className,
  isLoading,
  post,
  ...props
}: PostProps) {
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
          <RichTextArea
            asReadOnlyContent={{ content: post.content?.title }}
            name='title'
          />
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
        <RichTextArea
          asReadOnlyContent={{
            content: `${post.content?.body?.substring(0, BODY_MAX_LEN)}${
              (post.content?.body?.length ?? 0) > BODY_MAX_LEN ? '...' : ''
            }`,
          }}
          name='title'
        />
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
