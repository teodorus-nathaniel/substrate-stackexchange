import AddressCopy from '#/components/AddressCopy'
import Button, { ButtonProps } from '#/components/Button'
import Link from '#/components/Link'
import PopOver from '#/components/PopOver'
import ProfileImage from '#/components/ProfileImage'
import { generateIntegratedSkeleton } from '#/components/SkeletonFallback'
import { getImageUrlFromIPFS } from '#/lib/helpers/image-url-generator'
import { generateLoadingChecker } from '#/lib/helpers/renderer'
import useLogout from '#/lib/hooks/useLogout'
import { useGetCurrentUser } from '#/services/subsocial/queries'
import { WalletAccount } from '@talisman-connect/wallets'
import clsx from 'clsx'

export interface WalletProfileProps extends ButtonProps {
  wallet: WalletAccount
}

export default function WalletProfile({
  wallet,
  className,
  ...props
}: WalletProfileProps) {
  const logout = useLogout()
  const { data, isLoading, isFetched } = useGetCurrentUser()
  const content = data?.content
  const { loadingChecker } = generateLoadingChecker(isLoading, isFetched)
  const IntegratedSkeleton = generateIntegratedSkeleton(isLoading, isFetched)

  return (
    <PopOver
      trigger={
        <Button
          {...props}
          variant='unstyled'
          innerContainerClassName={clsx('flex items-center space-x-2')}
          className={clsx('border border-bg-200', className)}
          rounded
          size='content'
        >
          <p className={clsx('pl-4')}>{wallet.name}</p>
          <ProfileImage className={clsx('w-9')} src={(wallet as any).avatar} />
        </Button>
      }
    >
      <div
        className={clsx('rounded-md bg-bg-200', 'p-4 w-60', 'flex flex-col')}
      >
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 shrink-0'>
            <ProfileImage
              isLoading={loadingChecker(content?.avatar)}
              src={
                content?.avatar
                  ? getImageUrlFromIPFS(content.avatar)
                  : (wallet as any).avatar
              }
            />
          </div>
          <div className={clsx('text-sm', 'flex-1')}>
            <IntegratedSkeleton
              count={2}
              width='100%'
              content={content?.name}
              defaultContent={
                <AddressCopy className={clsx('font-bold')}>
                  {wallet.address}
                </AddressCopy>
              }
            >
              {(name) => (
                <div className={clsx('flex flex-col')}>
                  <p className={clsx('leading-snug')}>{name}</p>
                  <AddressCopy className={clsx('text-xs text-text-secondary')}>
                    {wallet.address}
                  </AddressCopy>
                </div>
              )}
            </IntegratedSkeleton>
          </div>
        </div>
        <div className='flex flex-col mt-3'>
          <p className='text-text-secondary text-xs'>
            <IntegratedSkeleton content={content?.summary} />
          </p>
        </div>
        <Link href='/profile'>
          <Button className='mt-4 w-full text-sm' size='small'>
            My Profile
          </Button>
        </Link>
        <Button
          variant='outlined-red'
          className='mt-2 text-sm'
          size='small'
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>
    </PopOver>
  )
}
