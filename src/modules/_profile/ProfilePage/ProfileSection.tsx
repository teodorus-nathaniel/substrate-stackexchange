import AddressCopy from '#/components/AddressCopy'
import Link from '#/components/Link'
import ProfileImage from '#/components/ProfileImage'
import { useWalletContext } from '#/contexts/WalletContext'
import clsx from 'clsx'

export default function ProfileSection() {
  const [wallet] = useWalletContext()

  return (
    <div className={clsx('flex flex-col')}>
      <ProfileImage className='w-28' />
      <p className={clsx('font-bold text-lg', 'mt-2')}>
        Teodorus Nathaniel Kurniawan
      </p>
      <AddressCopy className={clsx('mt-1.5', 'text-text-secondary', 'text-xs')}>
        {wallet?.address ?? ''}
      </AddressCopy>
      <div className={clsx('mt-4 flex items-center', 'flex space-x-2')}>
        <Link
          variant='primary'
          className={clsx('text-sm', 'text-text-primary')}
        >
          813 <span className={clsx('text-text-secondary')}>Followers</span>
        </Link>
        <span className='text-lg font-bold'> &middot; </span>
        <Link
          variant='primary'
          className={clsx('text-sm', 'text-text-primary')}
        >
          813 <span className={clsx('text-text-secondary')}>Following</span>
        </Link>
      </div>
    </div>
  )
}
