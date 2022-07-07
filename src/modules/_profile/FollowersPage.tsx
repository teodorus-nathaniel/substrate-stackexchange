import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import UserGridView from '#/containers/UserGridView'
import { useWalletContext } from '#/contexts/WalletContext'
import { useGetFollowers } from '#/services/subsocial/queries'
import clsx from 'clsx'

export default function FollowersPage() {
  const [wallet] = useWalletContext()
  const { data, isFetched, isLoading } = useGetFollowers({
    address: wallet?.address,
  })
  const { loadingChecker } = useIntegratedSkeleton(isLoading, isFetched)

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl mb-6'>Your Followers</h1>
      <UserGridView
        users={data ?? []}
        isLoading={loadingChecker(data)}
        noDataNotice='You have no followers yet'
        noticeClassName={clsx('text-text-secondary')}
      />
    </div>
  )
}
