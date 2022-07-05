import RichTextArea from '#/components/inputs/RichTextArea'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import { PostWithSomeDetails } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps, useMemo } from 'react'
import ReactionButtons from '../ReactionButtons'
import TagList from '../TagList'
import Comment from './Comment'
import CreatorOverview from './CreatorOverview'

export interface PostDetailProps extends HTMLProps<HTMLDivElement> {
  post?: PostWithSomeDetails
  isLoading?: boolean
  withBorderBottom?: boolean
  isQuestion?: boolean
  allReplies?: PostWithSomeDetails[]
}

const REACTION_WIDTH = 50

export default function PostDetail({
  post,
  className,
  withBorderBottom,
  isLoading,
  isQuestion,
  allReplies,
  ...props
}: PostDetailProps) {
  const { IntegratedSkeleton } = useIntegratedSkeleton(isLoading ?? false)

  const commentsOnly = useMemo(() => {
    if (!isQuestion || !allReplies) return []
    return allReplies.filter(
      (reply) => !(reply?.post?.content as any)?.isAnswer
    )
  }, [allReplies, isQuestion])

  return (
    <div
      className={clsx(
        'flex flex-col',
        withBorderBottom && 'border-b-2 border-bg-200 pb-6',
        className
      )}
      {...props}
    >
      <div className={clsx('flex', 'w-full')}>
        <div
          className={clsx('flex flex-col items-start', 'flex-shrink-0')}
          style={{ width: REACTION_WIDTH }}
        >
          <ReactionButtons
            upVoteCount={post?.post?.struct?.upvotesCount}
            downVoteCount={post?.post?.struct?.downvotesCount}
            postId={post?.id}
            isLoading={isLoading}
          />
        </div>
        <div className={clsx('flex flex-col', 'flex-1')}>
          <div className={clsx('text-xl')}>
            <IntegratedSkeleton
              isLoading={isLoading}
              content={post?.post?.content?.title}
            >
              {(title) => <p className={clsx('mb-6')}>{title}</p>}
            </IntegratedSkeleton>
          </div>
          <div className={clsx('mb-4')}>
            <IntegratedSkeleton height={50} content={post?.post?.content?.body}>
              {(body) => (
                <RichTextArea
                  containerClassName={clsx('text-sm')}
                  asReadOnlyContent={{ content: body }}
                  name='body'
                />
              )}
            </IntegratedSkeleton>
          </div>
          <div className={clsx('flex justify-between items-end', 'mt-auto')}>
            <TagList
              tags={post?.post?.content?.tags ?? []}
              isLoading={isLoading}
            />
            <CreatorOverview
              isLoading={isLoading}
              createDate={post?.post?.struct?.createdAtTime}
              creator={post?.owner}
              creatorId={post?.post.struct.createdByAccount}
            />
          </div>
        </div>
      </div>
      {commentsOnly.length > 0 && (
        <div
          className={clsx(
            'border-t-2 border-dashed border-bg-200',
            'pt-4 mt-8'
          )}
          style={{ marginLeft: REACTION_WIDTH }}
        >
          <div className={clsx('flex flex-col')}>
            {commentsOnly.map((comment) => (
              <Comment
                className={clsx('text-sm')}
                key={comment.id}
                creatorId={comment.post.struct.createdByAccount}
                upVoteCount={comment.post.struct.upvotesCount}
                comment={comment.post.content?.body ?? ''}
                createdAt={comment.post.struct.createdAtTime}
                creator={comment.owner}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
