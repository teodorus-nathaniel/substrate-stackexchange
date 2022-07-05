import Link, { LinkProps } from '#/components/Link'
import ProfileImage from '#/components/ProfileImage'
import SkeletonFallback, {
  useIntegratedSkeleton,
} from '#/components/SkeletonFallback'
import { formatDate } from '#/lib/helpers/date'
import { getImageUrlFromIPFS } from '#/lib/helpers/image-url-generator'
import { useGetProfile } from '#/services/subsocial/queries'
import { ProfileData } from '@subsocial/types/dto'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'

export interface CreatorProps extends LinkProps {
  creator?: ProfileData
  createDate?: number
  isLoading?: boolean
  creatorId?: string
  shouldFetchCreator?: boolean
}

export default function CreatorOverview({
  creator,
  className,
  createDate,
  isLoading,
  creatorId,
  shouldFetchCreator = false,
  ...props
}: CreatorProps) {
  const {
    data: localCreator,
    isLoading: localIsLoading,
    isFetched: localIsFetched,
  } = useGetProfile({ address: creatorId }, { enabled: shouldFetchCreator })

  const { IntegratedSkeleton, loadingChecker } = useIntegratedSkeleton(
    isLoading || localIsLoading,
    localIsFetched || !shouldFetchCreator
  )
  const usedCreator = creator ?? localCreator

  return (
    <Link
      className={clsx('bg-bg-100', 'py-2 px-3 rounded-md', className)}
      {...props}
    >
      <div className={clsx('flex items-center', 'space-x-2.5')}>
        <ProfileImage
          className={clsx('w-8')}
          isLoading={loadingChecker(usedCreator?.content?.avatar)}
          src={
            creator?.content?.avatar &&
            getImageUrlFromIPFS(creator?.content.avatar)
          }
        />
        <div className={clsx('flex flex-col')}>
          <p className={clsx('text-xs font-bold text-blue-400', 'mb-0.5')}>
            <IntegratedSkeleton
              content={usedCreator?.content?.name}
              defaultContent={truncateMiddle(creatorId)}
              width={100}
            >
              {(name) => name}
            </IntegratedSkeleton>
          </p>
          <p className={clsx('text-xs text-text-secondary')}>
            asked{' '}
            <SkeletonFallback isLoading={isLoading} inline width={60}>
              {createDate ? formatDate(createDate) : '-'}
            </SkeletonFallback>
          </p>
        </div>
      </div>
    </Link>
  )
}
