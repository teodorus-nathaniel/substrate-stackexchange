import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { BsX } from 'react-icons/bs'
import Button from './Button'
import Card, { CardProps } from './Card'

const sizes = {
  xl: clsx('max-w-screen-xl'),
  lg: clsx('max-w-screen-lg'),
  md: clsx('max-w-screen-md'),
  sm: clsx('max-w-screen-sm'),
}

export interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  size?: keyof typeof sizes
  withCloseButton?: boolean
  title?: string
  desc?: string
  children?: any
  panelProps?: CardProps
}

export default function Modal({
  handleClose,
  isOpen,
  withCloseButton = true,
  title,
  size = 'md',
  desc,
  children,
  panelProps,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} className={clsx('z-50')}>
      <div
        className={clsx('fixed inset-0', 'bg-black/30 backdrop-blur-sm')}
        aria-hidden='true'
      />
      <div
        className={clsx(
          'fixed inset-0 p-4',
          'flex items-center justify-center'
        )}
      >
        <div
          className={clsx(
            'flex items-center justify-center',
            'w-full min-h-full',
            sizes[size]
          )}
        >
          <Dialog.Panel className={clsx('mx-auto w-full', 'relative')}>
            <Card
              {...panelProps}
              className={clsx(
                'bg-bg-200',
                'flex flex-col',
                'p-4 min-h-[4em]',
                panelProps?.className
              )}
            >
              {withCloseButton && (
                <Button
                  size='content'
                  className={clsx('absolute right-4 top-4', 'p-1')}
                  variant='unstyled'
                >
                  <BsX className={clsx('text-xl')} />
                </Button>
              )}
              {title && <Dialog.Title>{title}</Dialog.Title>}
              {desc && <Dialog.Description>{desc}</Dialog.Description>}
              {children}
            </Card>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}