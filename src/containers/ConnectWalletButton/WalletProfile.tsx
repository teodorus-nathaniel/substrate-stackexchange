import AddressCopy from '#/components/AddressCopy'
import Button, { ButtonProps } from '#/components/Button'
import Link from '#/components/Link'
import PopOver from '#/components/PopOver'
import ProfileImage from '#/components/ProfileImage'
import SkeletonFallback from '#/components/SkeletonFallback'
import { useWalletContext } from '#/contexts/WalletContext'
import { getImageUrlFromIPFS } from '#/lib/helpers/image-url-generator'
import { generateLoadingChecker } from '#/lib/helpers/renderer'
import { useGetProfile } from '#/services/subsocial/queries'
import { truncateMiddle } from '@talisman-connect/ui'
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
  const [, setWallet] = useWalletContext()
  const { data, isLoading, isFetched } = useGetProfile({
    address: wallet.address,
  })
  const content = data?.content
  const { loadingChecker, getContent } = generateLoadingChecker(
    isLoading,
    isFetched
  )

  const signOut = () => {
    setWallet(null)
  }

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
          <p className={clsx('leading-snug text-sm font-bold', 'flex-1')}>
            <SkeletonFallback
              count={2}
              width='100%'
              isLoading={loadingChecker(content?.name)}
            >
              <AddressCopy
                address={getContent(
                  content?.name,
                  truncateMiddle(wallet.address) ?? ''
                )}
                truncate={false}
              />
            </SkeletonFallback>
          </p>
        </div>
        <div className='flex flex-col mt-3'>
          <p className='text-text-secondary text-xs'>
            <SkeletonFallback isLoading={loadingChecker(content?.summary)}>
              {content?.summary}
            </SkeletonFallback>
          </p>
        </div>
        <Link href='/profile'>
          <Button className='mt-4 w-full text-sm' size='small'>
            View / Edit Profile
          </Button>
        </Link>
        <Button
          variant='outlined-red'
          className='mt-2 text-sm'
          size='small'
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
    </PopOver>
  )
}
