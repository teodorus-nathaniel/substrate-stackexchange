import Button from '#/components/Button'
import RichTextArea from '#/components/inputs/RichTextArea'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import PostDetail from '#/containers/PostDetail'
import { useGetQuestion } from '#/services/subsocial/queries'
import clsx from 'clsx'
import { useRouter } from 'next/router'

const dummyPost: any = {
  content: {
    body: `I know the basics of Reinforcement Learning, but what terms it's necessary to understand to be able read arxiv PPO paper ? What is the roadmap to learn and use PPO ?`,
    title:
      'What is the way to understand Proximal Policy Optimization Algorithm in RL?',
    tags: ['storage', 'macro', 'config'],
  },
  id: '',
}
const dummyAns: any = {
  content: {
    body: `Well this seems to work, so it tells me I have some more to learn about .should()`,
  },
  id: '',
}
const dummyAns1: any = {
  content: {
    body: `I know the basics of Reinforcement Learning, but what terms it's necessary to understand to be able read arxiv PPO paper ?

What is the roadmap to learn and use PPO ?`,
  },
  id: '',
}

export default function QuestionDetailSection() {
  const { query } = useRouter()
  const id = (query['id'] ?? '') as string
  const {
    data: question,
    isLoading,
    isFetched,
  } = useGetQuestion({ postId: id })
  const { loadingChecker } = useIntegratedSkeleton(isLoading, isFetched)

  return (
    <div className={clsx('pb-32')}>
      <PostDetail
        post={question}
        withBorderBottom
        isLoading={loadingChecker(question)}
      />
      <div className={clsx('flex flex-col', 'space-y-8')}>
        <p className={clsx('text-xl font-bold', 'mt-4')}>4 Answers</p>
        <PostDetail post={dummyAns} withBorderBottom />
        <PostDetail post={dummyAns1} withBorderBottom />
      </div>
      <form className={clsx('flex flex-col', 'mt-8')}>
        <p className={clsx('text-xl font-bold', 'mb-1')}>Your Answer</p>
        <p className={clsx('text-sm text-text-secondary', 'mb-4')}>
          Please be sure to answer the question. Provide details and share your
          research!
        </p>
        <RichTextArea name={`answer-${id}`} />
        <div className={clsx('flex', 'mt-6')}>
          <Button>Post your answer</Button>
        </div>
      </form>
    </div>
  )
}
