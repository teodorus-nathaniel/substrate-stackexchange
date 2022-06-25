import TabLayout, { TabData } from '#/components/TabLayout'
import { SCREEN_HEIGHT_WITHOUT_NAVBAR } from '#/lib/constants/style'
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
    <div className={clsx('flex items-stretch flex-1')}>
      <div className={clsx('flex flex-col', 'w-full')}>
        <TabLayout
          className={clsx('w-full text-sm')}
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
        <div className={clsx('text-4xl')}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
            repudiandae error provident voluptates! Vero illo ducimus voluptatum
            laborum vitae officia non similique!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
            repudiandae error provident voluptates! Vero illo ducimus voluptatum
            laborum vitae officia non similique!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
            repudiandae error provident voluptates! Vero illo ducimus voluptatum
            laborum vitae officia non similique!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolorum quis aspernatur ipsum dolore explicabo quod perferendis,
            repudiandae error provident voluptates! Vero illo ducimus voluptatum
            laborum vitae officia non similique!
          </p>
        </div>
      </div>
      <div
        className={clsx(
          'max-w-xs flex-shrink w-full',
          'px-6 ml-auto',
          'border-l-4 border-bg-100'
        )}
      >
        <div
          className={clsx('sticky top-8')}
          style={{ height: SCREEN_HEIGHT_WITHOUT_NAVBAR }}
        >
          <ProfileSection />
        </div>
      </div>
    </div>
  )
}
