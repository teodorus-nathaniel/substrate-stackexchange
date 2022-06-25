import Link from '#/components/Link'
import ProfileImage from '#/components/ProfileImage'
import { useWalletContext } from '#/contexts/WalletContext'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'

export default function ProfileSection() {
  const [wallet] = useWalletContext()

  return (
    <div className={clsx('flex flex-col')}>
      <ProfileImage className='w-28' />
      <p className={clsx('font-bold text-lg', 'mt-2')}>
        Teodorus Nathaniel Kurniawan
      </p>
      <p className={clsx('mt-1.5', 'text-text-secondary', 'text-xs')}>
        {truncateMiddle(wallet?.address)}
      </p>
      <div className={clsx('mt-4 flex items-center')}>
        <Link variant='primary' className={clsx('text-sm')}>
          <strong>813</strong> Followers
        </Link>
      </div>
    </div>
  )
}
