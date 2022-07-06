import TwoColumnsPageLayout from '#/containers/layouts/TwoColumnsPageLayout'
import QuestionList from '#/containers/QuestionList'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import ProfileSection from './ProfileSection'

export default function ProfilePage() {
  const { query } = useRouter()
  const userId = query.id as string

  return (
    <TwoColumnsPageLayout
      leftSection={
        <QuestionList
          title='Your Questions'
          type={userId ? 'other-user' : 'user'}
          otherUserAddress={userId}
          className={clsx('pb-20')}
          noQuestionNotice='You have not asked any question.'
          noQuestionNoticeSubtitleWithButton='Do you have a question that you want to ask?'
        />
      }
      rightSection={<ProfileSection />}
    />
  )
}
