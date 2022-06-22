import clsx from 'clsx'
import { forwardRef, HTMLProps } from 'react'

type Variants = 'filled' | 'outlined'
type Colors = 'brand' | 'secondary'
type Styles = `${Variants}-${Colors}`

const styles: Record<Styles, string> = {
  'filled-brand': clsx(
    'bg-brand text-white ring-offset-bg-0',
    'enabled:hover:brightness-105 enabled:hover:ring-brand/75 enabled:hover:ring-2 enabled:hover:ring-offset-2',
    'enabled:focus:brightness-105 enabled:focus:ring-brand/75 enabled:focus:ring-2 enabled:focus:ring-offset-2 focus:outline-none',
    'enabled:active:brightness-90 enabled:active:bg-brand',
    'disabled:opacity-75'
  ),
  'filled-secondary': clsx(),
  'outlined-brand': clsx(),
  'outlined-secondary': clsx()
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
      className={classNames}
    >
      {children}
    </button>
  )
})
export default Button
