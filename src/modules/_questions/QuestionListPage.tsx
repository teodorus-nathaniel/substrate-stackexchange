import QuestionList, { QuestionListFilters } from '#/containers/QuestionList'
import clsx from 'clsx'

interface Props {
  type: QuestionListFilters
}

export default function QuestionListPage({ type }: Props) {
  return <QuestionList type={type} className={clsx('pb-20')} />
}
