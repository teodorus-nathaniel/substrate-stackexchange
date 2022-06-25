import AddressCopy from '#/components/AddressCopy'
import Button from '#/components/Button'
import ProfileImage from '#/components/ProfileImage'
import FollowingFollowerCount from '#/containers/FollowingFollowerCount'
import { useWalletContext } from '#/contexts/WalletContext'
import clsx from 'clsx'
import { BsBoxArrowInRight, BsPencil } from 'react-icons/bs'

export default function ProfileSection() {
  const [wallet] = useWalletContext()

  return (
    <div className={clsx('flex flex-col')}>
      <div className={clsx('flex justify-between')}>
        <ProfileImage className='w-28' />
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
            >
              <BsBoxArrowInRight />
            </Button>
          </div>
        </div>
      </div>
      <p className={clsx('font-bold text-lg', 'mt-2')}>
        Teodorus Nathaniel Kurniawan
      </p>
      <AddressCopy className={clsx('mt-1.5', 'text-text-secondary', 'text-xs')}>
        {wallet?.address ?? ''}
      </AddressCopy>
      <FollowingFollowerCount className={clsx('mt-6')} />
      <div className={clsx('text-text-secondary text-sm', 'mt-6')}>
        Subsocial is an open protocol for decentralized social networks and
        marketplaces. It&apos;s built with Substrate and IPFS. Learn more
      </div>
    </div>
  )
}
