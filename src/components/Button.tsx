import { hoverRingClassName } from '#/lib/constants/common-classnames'
import clsx from 'clsx'
import { forwardRef, HTMLProps } from 'react'

const variants = {
  'filled-brand': clsx(
    hoverRingClassName,
    'bg-brand text-white',
    'enabled:active:brightness-90 enabled:active:bg-brand',
    'disabled:opacity-75'
  ),
  'outlined-red': clsx(
    hoverRingClassName,
    'border border-red-500 text-red-500'
  ),
  unstyled: clsx('hover:bg-gray-700', 'active:bg-gray-800'),
}

const sizes = {
  large: clsx('px-12 py-2'),
  medium: clsx('px-6 py-2'),
  small: clsx('px-3 py-1'),
  content: clsx(),
}

export interface ButtonProps
  extends Omit<Omit<HTMLProps<HTMLButtonElement>, 'size'>, 'ref'> {
  children?: any
  className?: string
  size?: keyof typeof sizes
  variant?: keyof typeof variants
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'filled-brand',
    size = 'medium',
    type,
    ...buttonProps
  },
  ref
) {
  const classNames = clsx(
    'flex justify-center items-center',
    'rounded-md',
    'cursor-pointer disabled:cursor-not-allowed',
    'transition-colors ease-out',
    'enabled:active:translate-y-px',
    sizes[size],
    variants[variant],
    className
  )

  return (
    <button
      type={type as any}
      {...buttonProps}
      ref={ref}
      className={classNames}
    >
      {children}
    </button>
  )
})
export default Button
