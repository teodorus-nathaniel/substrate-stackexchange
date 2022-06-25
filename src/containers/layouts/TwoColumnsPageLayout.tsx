import { SCREEN_HEIGHT_WITHOUT_NAVBAR } from '#/lib/constants/style'
import clsx from 'clsx'

export interface TwoColumnsPageLayoutProps {
  leftSection: JSX.Element
  rightSection: JSX.Element
}

export default function TwoColumnsPageLayout({
  leftSection,
  rightSection,
}: TwoColumnsPageLayoutProps) {
  return (
    <div className={clsx('flex items-stretch flex-1')}>
      <div className={clsx('flex flex-col', 'w-full')}>{leftSection}</div>
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
          {rightSection}
        </div>
      </div>
    </div>
  )
}
