import Button, { ButtonProps } from '#/components/Button'
import ImageContainer from '#/components/ImageContainer'
import PopOver from '#/components/PopOver'
import SkeletonFallback from '#/components/SkeletonFallback'
import { getImageUrlFromIPFS } from '#/lib/helpers/image-url-generator'
import { useGetProfile } from '#/services/subsocial/queries'
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
  const { data, isLoading } = useGetProfile({
    address: wallet.address
  })
  const content = data?.content

  return (
    <PopOver
      trigger={
        <Button
          {...props}
          variant='unstyled'
          className={clsx(
            'flex items-center space-x-2',
            'rounded-full border border-bg-200',
            className
          )}
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
              isLoading={isLoading || !content?.avatar}
              circle
              height='100%'
              className='block'
            >
              <ImageContainer
                aspectRatio='1:1'
                src={getImageUrlFromIPFS(content?.avatar)}
                className={clsx('rounded-full')}
              />
            </SkeletonFallback>
          </div>
          <p className={clsx('leading-snug text-sm font-bold', 'flex-1')}>
            <SkeletonFallback count={2} width='100%' isLoading={isLoading}>
              {content?.name}
            </SkeletonFallback>
          </p>
        </div>
        <div className='flex flex-col mt-3'>
          <p className='text-text-secondary text-xs'>
            <SkeletonFallback isLoading={isLoading}>
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
