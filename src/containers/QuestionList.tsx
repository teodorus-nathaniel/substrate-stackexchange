import Button from '#/components/Button'
import Link from '#/components/Link'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import PostOverview from '#/containers/PostOverview'
import { useWalletContext } from '#/contexts/WalletContext'
import { renderElementOrCustom } from '#/lib/helpers/renderer'
import { useGetAllQuestions } from '#/services/subsocial/queries'
import clsx from 'clsx'
import { HTMLProps, useMemo } from 'react'

export type QuestionListFilters = 'new' | 'unanswered' | 'user'
export interface QuestionListProps extends HTMLProps<HTMLDivElement> {
  type: QuestionListFilters
  noQuestionNotice?: string | JSX.Element
  noQuestionNoticeSubtitleWithButton?: string
}

export default function QuestionList({
  type,
  className,
  noQuestionNotice,
  noQuestionNoticeSubtitleWithButton,
  ...props
}: QuestionListProps) {
  const { data: posts, isLoading, isFetched } = useGetAllQuestions()
  const { loadingChecker } = useIntegratedSkeleton(isLoading, isFetched)
  const [wallet] = useWalletContext()

  const filteredQuestions = useMemo(() => {
    if (type !== 'user') return posts
    return posts?.filter(
      (post) => post.struct.createdByAccount === wallet?.address
    )
  }, [posts, type, wallet])

  // TODO: change this to better way (preferably after changing data to ssr)
  const checkShouldRender = (answerCount: number) => {
    if (type !== 'unanswered') return true
    return answerCount === 0
  }

  const defaultNoQuestionNotice = (notice?: string) => {
    return (
      <div className={clsx('flex flex-col w-full')}>
        <p className={clsx('text-center text-2xl')}>
          {notice ?? 'No questions asked yet'}
        </p>
        {noQuestionNoticeSubtitleWithButton && (
          <div
            className={clsx(
              'mt-2',
              'w-full',
              'text-center',
              'text-sm text-text-secondary'
            )}
          >
            <p className={clsx('mb-4')}>{noQuestionNoticeSubtitleWithButton}</p>
            <Link href='/ask'>
              <Button variant='filled-brand' className='mx-auto'>
                Ask a question
              </Button>
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={clsx(className)} {...props}>
      <div className='flex flex-col space-y-8'>
        {(() => {
          if (loadingChecker(filteredQuestions)) {
            return Array.from({ length: 3 }).map((_, idx) => (
              <PostOverview isLoading key={idx} />
            ))
          } else if ((filteredQuestions?.length ?? 0) > 0) {
            return filteredQuestions?.map((post) => (
              <PostOverview
                isLoading={false}
                key={post.id}
                post={post}
                checkShouldRender={checkShouldRender}
              />
            ))
          } else {
            return renderElementOrCustom(noQuestionNotice, (notice) =>
              defaultNoQuestionNotice(notice)
            )
          }
        })()}
      </div>
    </div>
  )
}
