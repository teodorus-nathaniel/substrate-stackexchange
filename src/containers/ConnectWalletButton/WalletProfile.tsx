import Button, { ButtonProps } from '#/components/Button'
import ImageContainer from '#/components/ImageContainer'
import PopOver from '#/components/PopOver'
import SkeletonFallback from '#/components/SkeletonFallback'
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
  const { data, isLoading, isFetched } = useGetProfile({
    address: wallet.address,
  })
  const content = data?.content
  const { loadingChecker, getContent } = generateLoadingChecker(
    isLoading,
    isFetched
  )

  return (
    <PopOver
      trigger={
        <Button
          {...props}
          variant='unstyled'
          innerContainerClassName={clsx('flex items-center space-x-2')}
          className={clsx('rounded-full border border-bg-200', className)}
          size='content'
        >
          <p className={clsx('pl-4')}>{wallet.name}</p>
          <div className={clsx('w-9')}>
            <ImageContainer
              src={(wallet as any).avatar}
              aspectRatio='1:1'
              alt='Avatar'
            />
          </div>
        </Button>
      }
    >
      <div
        className={clsx('rounded-md bg-bg-200', 'p-4 w-60', 'flex flex-col')}
      >
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 shrink-0'>
            <SkeletonFallback
              isLoading={loadingChecker(content?.avatar)}
              circle
              height='100%'
              className='block'
            >
              <ImageContainer
                aspectRatio='1:1'
                src={
                  content?.avatar
                    ? getImageUrlFromIPFS(content.avatar)
                    : (wallet as any).avatar
                }
                className={clsx('rounded-full')}
              />
            </SkeletonFallback>
          </div>
          <p className={clsx('leading-snug text-sm font-bold', 'flex-1')}>
            <SkeletonFallback
              count={2}
              width='100%'
              isLoading={loadingChecker(content?.name)}
            >
              {getContent(content?.name, truncateMiddle(wallet.address))}
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
        <Button className='mt-4 text-sm' size='small'>
          View Profile
        </Button>
        <Button variant='outlined-red' className='mt-2 text-sm' size='small'>
          Sign Out
        </Button>
      </div>
    </PopOver>
  )
}
