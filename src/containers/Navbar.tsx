import Brand from '#/components/Brand'
import ConnectWalletButton from '#/components/ConnectWalletButton'
import clsx from 'clsx'
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  height: string | number
}

export default function Navbar({ height, className, style, ...props }: Props) {
  return (
    <nav
      className={clsx(
        'flex items-center justify-between',
        'py-4',
        'sticky top-0',
        'backdrop-blur-sm',
        className
      )}
      style={{ height, ...style }}
      {...props}
    >
      <Brand className='text-lg' />
      <ConnectWalletButton />
    </nav>
  )
}
