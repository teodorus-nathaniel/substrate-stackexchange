import TabLayout, { TabData } from '#/components/TabLayout'
import TwoColumnsPageLayout from '#/containers/layouts/TwoColumnsPageLayout'
import clsx from 'clsx'
import { useState } from 'react'
import ProfileSection from './ProfileSection'

const tabs: TabData[] = [
  { text: 'Questions (100)', hash: 'questions' },
  { text: 'Answers (50)', hash: 'answers' },
]

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <TwoColumnsPageLayout
      leftSection={
        <TabLayout
          className={clsx('w-full text-sm')}
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      }
      rightSection={<ProfileSection />}
    />
  )
}
