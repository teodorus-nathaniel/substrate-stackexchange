import PostDetail from '#/containers/PostDetail'
import clsx from 'clsx'

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
  return (
    <div className={clsx('pb-32')}>
      <PostDetail post={dummyPost} withBorderBottom />
      <div className={clsx('flex flex-col', 'space-y-8')}>
        <p className={clsx('text-xl font-bold', 'mt-4')}>4 Answers</p>
        <PostDetail post={dummyAns} withBorderBottom />
        <PostDetail post={dummyAns1} />
      </div>
    </div>
  )
}
