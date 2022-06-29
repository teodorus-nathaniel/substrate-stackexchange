import RichTextArea from '#/components/inputs/RichTextArea'
import Link from '#/components/Link'
import SkeletonFallback from '#/components/SkeletonFallback'
import { getRelativeDateFromNow } from '#/lib/helpers/date'
import { useGetReplyIdsByPostId } from '#/services/subsocial/queries'
import { PostData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import ReactionButtons from './ReactionButtons'
import TagList from './TagList'
import UserProfileLink from './UserProfileLink'

export interface PostProps extends HTMLProps<HTMLDivElement> {
  post?: PostData
  isLoading?: boolean
}

export default function PostOverview({
  className,
  isLoading,
  post,
  ...props
}: PostProps) {
  const { data: replyIds, isLoading: isLoadingReply } = useGetReplyIdsByPostId({
    postId: post?.id,
  })

  return (
    <div
      className={clsx(
        'flex items-stretch bg-bg-100 px-6 pt-5 pb-4 rounded-md',
        className
      )}
      {...props}
    >
      <div className={clsx('flex flex-col', 'pr-4', 'pt-1.5')}>
        <ReactionButtons
          noButtons
          isLoading={isLoading}
          postId={post?.id}
          downVoteCount={post?.struct.downvotesCount}
          upVoteCount={post?.struct.upvotesCount}
        />
      </div>
      <div className={clsx('flex flex-col flex-1')}>
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
        <SkeletonFallback isLoading={isLoading}>
          {post?.content?.tags && (
            <TagList className={clsx('pt-1 pb-2')} tags={post.content.tags} />
          )}
        </SkeletonFallback>
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
          <SkeletonFallback isLoading={isLoadingReply || isLoading} width={75}>
            <p className={clsx('text-xs font-bold text-brand')}>
              {replyIds?.length} Answers
            </p>
          </SkeletonFallback>
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
    </div>
  )
}
