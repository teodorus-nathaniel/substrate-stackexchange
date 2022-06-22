import Brand from '#/components/Brand'
import ConnectWalletButton from '#/components/ConnectWalletButton'
import clsx from 'clsx'

export default function Navbar() {
  return (
    <nav
      className={clsx(
        'flex items-center justify-between',
        'px-8 py-4',
        'sticky top-0',
        'backdrop-blur-sm'
      )}
    >
      <Brand className='text-lg' />
      <ConnectWalletButton />
    </nav>
  )
}
