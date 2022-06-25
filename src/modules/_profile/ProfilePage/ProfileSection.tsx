import AddressCopy from '#/components/AddressCopy'
import Button from '#/components/Button'
import ProfileImage from '#/components/ProfileImage'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import FollowingFollowerCount from '#/containers/FollowingFollowerCount'
import { useWalletContext } from '#/contexts/WalletContext'
import useLogout from '#/lib/hooks/useLogout'
import { useGetProfile } from '#/services/subsocial/queries'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BsBoxArrowInRight, BsPencil } from 'react-icons/bs'

export default function ProfileSection() {
  const [wallet] = useWalletContext()
  const logout = useLogout()

  const { query } = useRouter()
  const id = query.id as string | undefined
  const address = id ?? wallet?.address ?? ''
  const { data, isLoading, isFetched } = useGetProfile({
    address,
  })
  const content = data?.content
  const { IntegratedSkeleton, loadingChecker } = useIntegratedSkeleton(
    isLoading,
    isFetched
  )

  return (
    <div className={clsx('flex flex-col')}>
      <div className={clsx('flex justify-between')}>
        <ProfileImage
          className='w-28'
          isLoading={loadingChecker(content?.avatar)}
        />
        <div className={clsx('mt-3')}>
          <div className={clsx('flex items-center', 'space-x-3')}>
            <Button
              variant='unstyled-border'
              className={clsx('text-blue-400')}
              size='icon-medium'
              rounded
            >
              <BsPencil />
            </Button>
            <Button
              variant='unstyled-border'
              className={clsx('text-red-500')}
              size='icon-medium'
              rounded
              onClick={logout}
            >
              <BsBoxArrowInRight />
            </Button>
          </div>
        </div>
      </div>
      <div className={clsx('font-bold text-lg', 'mt-2')}>
        <IntegratedSkeleton
          content={content?.name}
          defaultContent={<AddressCopy>{data?.id ?? ''}</AddressCopy>}
        >
          {(name) => <p>{name}</p>}
        </IntegratedSkeleton>
      </div>
      {content?.name && (
        <AddressCopy className={clsx('mb-4', 'text-text-secondary', 'text-xs')}>
          {data?.id ?? ''}
        </AddressCopy>
      )}
      <FollowingFollowerCount className={clsx('mt-2')} />
      <IntegratedSkeleton className={clsx('mt-6')} content={content?.summary}>
        {(summary) => (
          <div className={clsx('text-text-secondary text-sm', 'mt-6')}>
            {summary}
          </div>
        )}
      </IntegratedSkeleton>
    </div>
  )
}
