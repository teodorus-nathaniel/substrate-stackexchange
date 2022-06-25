import TwoColumnsPageLayout from '#/containers/layouts/TwoColumnsPageLayout'
import AskForm from './AskForm'

export default function AskPage() {
  return (
    <TwoColumnsPageLayout
      leftSection={<AskForm />}
      rightSection={<div>RIGHT</div>}
    />
  )
}
