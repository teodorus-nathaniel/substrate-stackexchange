import { FAST_TRANSITION } from '#/lib/constants/transition'
import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { BsX } from 'react-icons/bs'
import Button from './Button'
import Card, { CardProps } from './Card'

const sizes = {
  xl: clsx('max-w-screen-xl'),
  lg: clsx('max-w-screen-lg'),
  md: clsx('max-w-2xl'),
  sm: clsx('max-w-md'),
  xs: clsx('max-w-sm'),
}

export interface ModalProps extends Omit<CardProps, 'size'> {
  isOpen: boolean
  handleClose: () => void
  size?: keyof typeof sizes
  withCloseButton?: boolean
  title?: string
  desc?: string
  children?: any
  ringColor?: 'default' | 'error'
}

const MotionDialogPanel = motion<any>(Dialog.Panel)

const Modal = forwardRef(function Modal(
  {
    handleClose,
    isOpen,
    withCloseButton = true,
    title,
    size = 'md',
    desc,
    children,
    ringColor = 'default',
    className,
    ...props
  }: ModalProps,
  ref
) {
  return (
    <Dialog open={isOpen} onClose={handleClose} className={clsx('z-40')}>
      <div
        className={clsx(
          'fixed inset-0',
          'bg-black/30 backdrop-blur-sm',
          'z-40'
        )}
        aria-hidden='true'
      />
      <div
        className={clsx(
          'fixed inset-0 top-0 p-4',
          'flex items-center justify-center z-50'
        )}
      >
        <div
          className={clsx(
            'flex items-center justify-center',
            'w-full min-h-full',
            sizes[size]
          )}
        >
          <MotionDialogPanel
            layout
            className={clsx('mx-auto w-full', 'relative')}
            transition={FAST_TRANSITION}
          >
            <Card
              {...props}
              ref={ref as any}
              className={clsx(
                'bg-bg-100 ring-1',
                'flex flex-col',
                'p-4 min-h-[4em]',
                ringColor === 'default' && 'ring-brand/40',
                ringColor === 'error' && 'ring-red-500',
                className
              )}
            >
              {withCloseButton && (
                <Button
                  onClick={handleClose}
                  size='content'
                  className={clsx('!absolute right-4 top-4', 'p-1')}
                  variant='unstyled'
                >
                  <BsX className={clsx('text-xl')} />
                </Button>
              )}
              {title && <Dialog.Title>{title}</Dialog.Title>}
              {desc && <Dialog.Description>{desc}</Dialog.Description>}
              {children}
            </Card>
          </MotionDialogPanel>
        </div>
      </div>
    </Dialog>
  )
})

export default Modal
