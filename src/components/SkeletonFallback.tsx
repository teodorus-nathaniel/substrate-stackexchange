import clsx from 'clsx'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

export interface SkeletonFallbackProps extends SkeletonProps {
  isLoading?: boolean
  children: any
}

export default function SkeletonFallback({
  isLoading,
  children,
  className,
  ...props
}: SkeletonFallbackProps) {
  return !isLoading && children ? (
    children
  ) : (
    <Skeleton
      baseColor='#505050'
      highlightColor='#606060'
      className={clsx(className)}
      {...props}
    />
  )
}
