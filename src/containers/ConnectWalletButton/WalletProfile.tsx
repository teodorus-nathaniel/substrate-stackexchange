import Button, { ButtonProps } from '#/components/Button'
import ImageContainer from '#/components/ImageContainer'
import PopOver from '#/components/PopOver'
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
            <ImageContainer
              aspectRatio='1:1'
              src='https://app.subsocial.network/ipfs/ipfs/QmZ62eYxcMsQRUFzCJgLPseiEKBMdiwHZhsqZin2skQrRg'
              className={clsx('rounded-full')}
            />
          </div>
          <p className='leading-snug text-sm font-bold'>
            Teodorus Nathaniel Kurniawan
          </p>
        </div>
        <div className='flex flex-col mt-3'>
          <p className='text-text-secondary text-xs'>Frontend Developer 🧑‍💻</p>
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
