import { generateLoadingChecker } from '#/lib/helpers/renderer'
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
  return isLoading === false || (isLoading === undefined && children) ? (
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

export interface IntegratedSkeletonProps<T>
  extends Omit<SkeletonFallbackProps, 'children'> {
  content: T | null | undefined
  defaultContent?: any
  children?: (content: T) => JSX.Element
}

export function generateIntegratedSkeleton(
  ...data: Parameters<typeof generateLoadingChecker>
) {
  const { loadingChecker } = generateLoadingChecker(...data)

  return function IntegratedSkeleton<T>({
    content,
    defaultContent,
    children,
    ...props
  }: IntegratedSkeletonProps<T>) {
    const shouldRenderDefaultContent = loadingChecker(content) || !content
    return (
      <SkeletonFallback {...props} isLoading={loadingChecker(content)}>
        {(() => {
          if (shouldRenderDefaultContent) {
            return defaultContent
          } else if (children) {
            return children(content)
          } else {
            return content
          }
        })()}
      </SkeletonFallback>
    )
  }
}
