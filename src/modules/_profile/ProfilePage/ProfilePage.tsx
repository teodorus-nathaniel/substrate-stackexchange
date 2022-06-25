import clsx from 'clsx'
import ProfileSection from './ProfileSection'

export default function ProfilePage() {
  return (
    <div className={clsx('flex items-stretch flex-1')}>
      <div>Questions Section</div>
      <div
        className={clsx(
          'max-w-xs flex-shrink w-full',
          'px-6',
          'border-l-4 border-bg-100',
          'ml-auto'
        )}
      >
        <ProfileSection />
      </div>
    </div>
  )
}
