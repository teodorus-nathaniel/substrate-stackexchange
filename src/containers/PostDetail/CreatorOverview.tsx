import Link, { LinkProps } from '#/components/Link'
import ProfileImage from '#/components/ProfileImage'
import { formatDate } from '#/lib/helpers/date'
import { ProfileData } from '@subsocial/types/dto'
import clsx from 'clsx'

export interface CreatorProps extends LinkProps {
  creator: ProfileData
}

export default function CreatorOverview({
  creator,
  className,
  ...props
}: CreatorProps) {
  return (
    <Link
      className={clsx('bg-bg-100', 'py-2 px-3 rounded-md', className)}
      {...props}
    >
      <div className={clsx('flex items-center', 'space-x-2.5')}>
        <ProfileImage className={clsx('w-8')} />
        <div className={clsx('flex flex-col')}>
          <p className={clsx('text-sm font-bold text-blue-400', 'mb-0.5')}>
            {creator.content?.name}
          </p>
          <p className={clsx('text-xs text-text-secondary')}>
            asked {formatDate(new Date())}
          </p>
        </div>
      </div>
    </Link>
  )
}
