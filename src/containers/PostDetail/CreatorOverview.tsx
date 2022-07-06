import Link from '#/components/Link'
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
import { HTMLProps } from 'react'
import TippingButton from '../TippingButton'

export interface CreatorProps extends HTMLProps<HTMLDivElement> {
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
    <div
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
          <div
            className={clsx(
              'text-sm font-bold',
              'mb-0.5',
              'flex justify-between items-center'
            )}
          >
            <Link variant='primary'>
              <IntegratedSkeleton
                content={usedCreator?.content?.name}
                defaultContent={truncateMiddle(creatorId)}
                width={100}
              >
                {(name) => name}
              </IntegratedSkeleton>
            </Link>
            {creatorId && (
              <TippingButton
                className={clsx('ml-2', 'text-lg')}
                beneficiary={creatorId}
              />
            )}
          </div>
          <p className={clsx('text-xs text-text-secondary', 'mb-1')}>
            asked{' '}
            <SkeletonFallback isLoading={isLoading} inline width={60}>
              {createDate ? formatDate(createDate) : '-'}
            </SkeletonFallback>
          </p>
        </div>
      </div>
    </div>
  )
}
