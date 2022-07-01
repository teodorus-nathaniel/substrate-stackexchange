import RichTextArea from '#/components/inputs/RichTextArea'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import { PostData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import ReactionButtons from '../ReactionButtons'
import TagList from '../TagList'
import Comment from './Comment'
import CreatorOverview from './CreatorOverview'

export interface PostDetailProps extends HTMLProps<HTMLDivElement> {
  post?: PostData
  isLoading?: boolean
  withBorderBottom?: boolean
}

const REACTION_WIDTH = 50

export default function PostDetail({
  post,
  className,
  withBorderBottom,
  isLoading,
  ...props
}: PostDetailProps) {
  const { IntegratedSkeleton } = useIntegratedSkeleton(isLoading ?? false)

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
            upVoteCount={post?.struct?.upvotesCount}
            downVoteCount={post?.struct?.downvotesCount}
            postId={post?.id}
            isLoading={isLoading}
          />
        </div>
        <div className={clsx('flex flex-col', 'flex-1')}>
          <div className={clsx('text-xl')}>
            <IntegratedSkeleton
              isLoading={isLoading}
              content={post?.content?.title}
            >
              {(title) => (
                <RichTextArea
                  containerClassName={clsx('mb-6')}
                  asReadOnlyContent={{ content: title }}
                  name='title'
                />
              )}
            </IntegratedSkeleton>
          </div>
          <IntegratedSkeleton height={50} content={post?.content?.body}>
            {(body) => (
              <RichTextArea asReadOnlyContent={{ content: body }} name='body' />
            )}
          </IntegratedSkeleton>
          <div className={clsx('flex justify-between items-end', 'mt-4')}>
            <TagList tags={post?.content?.tags ?? []} isLoading={isLoading} />
            <CreatorOverview
              isLoading={isLoading}
              createDate={post?.struct?.createdAtTime}
              creatorId={post?.struct?.ownerId}
            />
          </div>
        </div>
      </div>
      <div
        className={clsx('border-t-2 border-dashed border-bg-200', 'pt-4 mt-8')}
        style={{ marginLeft: REACTION_WIDTH }}
      >
        <div className={clsx('flex flex-col')}>
          <Comment
            comment={`I realise this isn't related to your question but I am really curious. What was the decision to use something that just supports Chrome and what's so much better about Cypress? I've been working on the Open-source project Courgette github.com/canvaspixels/courgette and was wondering what features are drawing everybody towards Cypress.`}
            createdAt={234234233}
            creator={{ id: 'tes', content: { name: 'Dynatle' } } as any}
          />
        </div>
      </div>
    </div>
  )
}
