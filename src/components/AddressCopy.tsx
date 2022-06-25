import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import { BsFiles } from 'react-icons/bs'
import { toast } from 'react-toastify'
import Button from './Button'

export interface AddressCopyProps extends HTMLProps<HTMLDivElement> {
  address: string
  truncate?: boolean
}

export default function AddressCopy({
  address,
  truncate = true,
  ...props
}: AddressCopyProps) {
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(address)
    toast('Address copied to clipboard!')
  }
  return (
    <div
      onClick={copyToClipboard}
      className={clsx('flex items-center', 'cursor-pointer')}
      {...props}
    >
      <p>{truncate ? truncateMiddle(address) : address}</p>
      <Button
        className={clsx('rounded-full', 'p-1', 'text-text-secondary', 'ml-1.5')}
        style={{ fontSize: '75%' }}
        variant='unstyled'
        size='content'
      >
        <BsFiles className={clsx('w-4 h-4')} />
      </Button>
    </div>
  )
}
