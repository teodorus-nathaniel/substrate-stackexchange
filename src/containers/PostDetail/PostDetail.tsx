import Button from '#/components/Button'
import RichTextArea from '#/components/inputs/RichTextArea'
import TextArea from '#/components/inputs/TextArea'
import Link from '#/components/Link'
import SkeletonFallback, {
  useIntegratedSkeleton,
} from '#/components/SkeletonFallback'
import useFormikWrapper from '#/lib/hooks/useFormikWrapper'
import { useCreateReply } from '#/services/subsocial/mutations'
import { PostWithSomeDetails } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps, useEffect, useMemo, useState } from 'react'
import ReactionButtons from '../ReactionButtons'
import TagList from '../TagList'
import Comment from './Comment'
import CreatorOverview from './CreatorOverview'
import { createCommentForm } from './form/schema'

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
  const [openCommentBox, setOpenCommentBox] = useState(false)
  const { getFieldData, handleSubmit, resetForm } = useFormikWrapper({
    ...createCommentForm,
    onSubmit: (values) => {
      if (!post?.id) return
      createReply({
        body: values.body ?? '',
        rootPostId: post.id,
      })
    },
  })

  useEffect(() => {
    if (!openCommentBox) resetForm()
  }, [openCommentBox, resetForm])

  const { mutate: createReply } = useCreateReply({
    onSuccess: () => {
      resetForm()
      setOpenCommentBox(false)
    },
  })

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
        withBorderBottom && 'border-b-2 border-bg-200 pb-4',
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
          <div className={clsx('flex flex-col', 'space-y-4')}>
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
      <div
        style={{ marginLeft: REACTION_WIDTH }}
        className={clsx('text-sm', 'mt-4')}
      >
        <SkeletonFallback isLoading={isLoading}>
          {openCommentBox ? (
            <form className={clsx('flex flex-col')} onSubmit={handleSubmit}>
              <TextArea placeholder='Comment...' {...getFieldData('body')} />
              <div className={clsx('flex', 'mt-3 space-x-2')}>
                <Button size='small' variant='outlined-brand'>
                  Submit
                </Button>
                <Button
                  size='small'
                  variant='unstyled'
                  type='button'
                  onClick={() => setOpenCommentBox(false)}
                  className={clsx('text-text-secondary')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Link variant='primary' onClick={() => setOpenCommentBox(true)}>
              Add a comment
            </Link>
          )}
        </SkeletonFallback>
      </div>
    </div>
  )
}
