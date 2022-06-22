import clsx from 'clsx'
import RouterLink from 'next/link'
import { forwardRef, HTMLProps } from 'react'

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  noAnimation?: boolean
  ref?: any
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, href = '', noAnimation, ...anchorProps },
  ref
) {
  const classes = clsx('relative cursor-pointer', className)
  return href ? (
    <RouterLink href={href} passHref>
      <a {...anchorProps} ref={ref} className={classes} />
    </RouterLink>
  ) : (
    <span {...anchorProps} ref={ref} className={classes} />
  )
})
export default Link
