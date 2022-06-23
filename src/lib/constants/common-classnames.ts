import clsx from 'clsx'

export const hoverRingClassName = clsx(
  'ring-offset-bg-0',
  'enabled:hover:ring-2 enabled:hover:ring-offset-2',
  'enabled:focus:ring-2 enabled:focus:ring-offset-2 focus:outline-none'
)
