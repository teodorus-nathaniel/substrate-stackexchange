import clsx from 'clsx'
import React, { forwardRef, HTMLProps } from 'react'

type Variants = 'filled' | 'outlined'
type Colors = 'brand' | 'secondary'
type Styles = `${Variants}-${Colors}`

const styles: Record<Styles, string> = {
  'filled-brand': clsx(
    'bg-brand text-white',
    'enabled:hover:bg-brand/90 enabled:hover:ring-brand/40 enabled:hover:ring-2 enabled:hover:ring-offset-1',
    'enabled:focus:bg-brand/90 enabled:focus:ring-brand/40 enabled:focus:ring-2 enabled:focus:ring-offset-1 focus:outline-none',
    'enabled:active:brightness-90 enabled:active:bg-brand',
    'disabled:opacity-75'
  ),
  'filled-secondary': clsx(),
  'outlined-brand': clsx(),
  'outlined-secondary': clsx(),
}

interface Props extends HTMLProps<HTMLButtonElement> {
  children: any
  className?: string
  variant?: Variants
  color?: Colors
  largeHorizontalPadding?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    className,
    variant = 'filled',
    color = 'brand',
    largeHorizontalPadding = false,
    type,
    ...buttonProps
  },
  ref
) {
  const classNames = clsx(
    'flex justify-center items-center',
    `py-2 ${largeHorizontalPadding ? 'px-12' : 'px-6'}`,
    'rounded-md font-bold',
    'cursor-pointer disabled:cursor-not-allowed',
    'transition-colors ease-out',
    'enabled:active:translate-y-px',
    styles[`${variant}-${color}`],
    className
  )

  return (
    <button
      type={type as any}
      {...buttonProps}
      ref={ref}
      className={classNames}>
      {children}
    </button>
  )
})
export default Button