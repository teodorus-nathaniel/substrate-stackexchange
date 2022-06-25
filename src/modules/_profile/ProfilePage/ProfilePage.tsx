import RichTextArea from '#/components/inputs/RichTextArea'
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
        <>
          <TabLayout
            className={clsx('w-full text-sm')}
            tabs={tabs}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
          <RichTextArea name='test' />
          <div className={clsx('text-4xl')}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
              repudiandae error provident voluptates! Vero illo ducimus
              voluptatum laborum vitae officia non similique!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
              repudiandae error provident voluptates! Vero illo ducimus
              voluptatum laborum vitae officia non similique!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
              repudiandae error provident voluptates! Vero illo ducimus
              voluptatum laborum vitae officia non similique!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
              repudiandae error provident voluptates! Vero illo ducimus
              voluptatum laborum vitae officia non similique!
            </p>
          </div>
        </>
      }
      rightSection={<ProfileSection />}
    />
  )
}
