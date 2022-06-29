import TwoColumnsPageLayout from '#/containers/layouts/TwoColumnsPageLayout'
import QuestionDetailSection from './QuestionDetailSection'

export default function QuestionDetailPage() {
  return (
    <TwoColumnsPageLayout
      leftSection={<QuestionDetailSection />}
      rightSection={<div>RIGHT SECTION</div>}
      rightSectionSize='xs'
    />
  )
}
