import TwoColumnsPageLayout from '#/containers/layouts/TwoColumnsPageLayout'
import QuestionList from '#/containers/QuestionList'
import clsx from 'clsx'
import ProfileSection from './ProfileSection'

export default function ProfilePage() {
  return (
    <TwoColumnsPageLayout
      leftSection={
        <QuestionList
          title='Your Questions'
          type='user'
          className={clsx('pb-20')}
          noQuestionNotice='You have not asked any question.'
          noQuestionNoticeSubtitleWithButton='Do you have a question that you want to ask?'
        />
      }
      rightSection={<ProfileSection />}
    />
  )
}
