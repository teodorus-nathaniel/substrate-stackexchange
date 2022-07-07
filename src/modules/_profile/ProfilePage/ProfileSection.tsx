import AddressCopy from '#/components/AddressCopy'
import Button from '#/components/Button'
import Link from '#/components/Link'
import ProfileImage from '#/components/ProfileImage'
import { useIntegratedSkeleton } from '#/components/SkeletonFallback'
import FollowingFollowerCount from '#/containers/FollowingFollowerCount'
import TippingButton from '#/containers/TippingButton'
import { useWalletContext } from '#/contexts/WalletContext'
import { encodeAddress } from '#/lib/helpers/chain'
import { getImageUrlFromIPFS } from '#/lib/helpers/image-url-generator'
import useLogout from '#/lib/hooks/useLogout'
import { useGetProfile } from '#/services/subsocial/queries'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { BsBoxArrowInRight, BsPencil } from 'react-icons/bs'

const RichTextArea = dynamic(() => import('#/components/inputs/RichTextArea'), {
  ssr: false,
})

export default function ProfileSection() {
  const [wallet] = useWalletContext()
  const logout = useLogout()

  const { query } = useRouter()
  const id = query.id as string | undefined
  const address = id ?? encodeAddress(wallet?.address) ?? ''
  const { data, isLoading, isFetched } = useGetProfile({
    address,
  })
  const content = data?.content
  const { IntegratedSkeleton, loadingChecker } = useIntegratedSkeleton(
    isLoading,
    isFetched
  )

  const isCurrentUser = !id || id === encodeAddress(wallet?.address)

  return (
    <div className={clsx('flex flex-col')}>
      <div className={clsx('flex justify-between')}>
        <ProfileImage
          className='w-28 h-28'
          isLoading={loadingChecker(content?.avatar)}
          src={content?.avatar && getImageUrlFromIPFS(content.avatar)}
        />
        <div className={clsx('mt-3')}>
          <div className={clsx('flex items-center', 'space-x-3')}>
            {isCurrentUser ? (
              <>
                <Link href='/profile/edit'>
                  <Button
                    variant='unstyled-border'
                    className={clsx('text-blue-400')}
                    size='icon-medium'
                    rounded
                  >
                    <BsPencil />
                  </Button>
                </Link>
                <Button
                  variant='unstyled-border'
                  className={clsx('text-red-500')}
                  size='icon-medium'
                  rounded
                  onClick={logout}
                >
                  <BsBoxArrowInRight />
                </Button>
              </>
            ) : (
              <TippingButton
                variant='unstyled-border'
                className={clsx('text-brand')}
                size='icon-medium'
                dest={address}
                profile={data}
              />
            )}
          </div>
        </div>
      </div>
      <div className={clsx('font-bold text-lg', 'mt-2')}>
        <IntegratedSkeleton
          content={content?.name}
          defaultContent={
            <AddressCopy>{encodeAddress(wallet?.address ?? '')}</AddressCopy>
          }
        >
          {(name) => <p>{name}</p>}
        </IntegratedSkeleton>
      </div>
      {content?.name && (
        <AddressCopy className={clsx('mb-4', 'text-text-secondary', 'text-xs')}>
          {data?.id ?? ''}
        </AddressCopy>
      )}
      <FollowingFollowerCount
        isLoading={loadingChecker(data?.struct)}
        followingCount={data?.struct.followingAccountsCount}
        followerCount={data?.struct.followersCount}
        className={clsx('mt-2')}
      />
      <IntegratedSkeleton className={clsx('mt-6')} content={content?.about}>
        {(about) => (
          <div className={clsx('text-text-secondary text-sm', 'mt-6')}>
            <RichTextArea name='about' asReadOnlyContent={{ content: about }} />
          </div>
        )}
      </IntegratedSkeleton>
    </div>
  )
}
