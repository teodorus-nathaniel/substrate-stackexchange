import Chip from '#/components/Chip'
import RichTextArea from '#/components/inputs/RichTextArea'
import Link from '#/components/Link'
import SkeletonFallback from '#/components/SkeletonFallback'
import { getRelativeDateFromNow } from '#/lib/helpers/date'
import { PostData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import ReactionButtons from './ReactionButtons'
import UserProfileLink from './UserProfileLink'

export interface PostProps extends HTMLProps<HTMLDivElement> {
  post?: PostData
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
      <div className={clsx(isLoading ? 'block' : 'flex', 'text-xl pb-1')}>
        <SkeletonFallback isLoading={isLoading}>
          <Link variant='primary' href={`/questions/${post?.id}`}>
            <RichTextArea
              asReadOnlyContent={{ content: post?.content?.title }}
              name='title'
            />
          </Link>
        </SkeletonFallback>
      </div>
      {post?.content?.tags && (
        <div className={clsx('flex flex-wrap space-x-2 pt-1 pb-2')}>
          {post.content.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Chip>{tag}</Chip>
            </Link>
          ))}
        </div>
      )}
      <p className={clsx('text-sm', 'pt-2', 'text-text-secondary')}>
        <SkeletonFallback isLoading={isLoading}>
          <RichTextArea
            asReadOnlyContent={{
              content: post?.content?.body,
            }}
            name='title'
          />
        </SkeletonFallback>
      </p>
      <div className={clsx('flex justify-between', 'pt-4')}>
        <ReactionButtons
          isLoading={isLoading}
          postId={post?.id}
          downVoteCount={post?.struct.downvotesCount}
          upVoteCount={post?.struct.upvotesCount}
        />
        <div className={clsx('text-sm', 'flex items-center', 'space-x-1')}>
          <UserProfileLink
            profileId={post?.struct.createdByAccount}
            isLoading={isLoading}
            className={clsx('font-sm')}
          />
          <SkeletonFallback isLoading={isLoading} width={50}>
            <p className='text-text-secondary'>
              asked {getRelativeDateFromNow(post?.struct.createdAtTime)}
            </p>
          </SkeletonFallback>
        </div>
      </div>
    </div>
  )
}
