import Chip from '#/components/Chip'
import Link from '#/components/Link'
import SkeletonFallback from '#/components/SkeletonFallback'
import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface TagListProps extends HTMLProps<HTMLDivElement> {
  tags: string[]
  isLoading?: boolean
  skeletonWidth?: number
}

export default function TagList({
  tags,
  isLoading,
  className,
  skeletonWidth = 100,
  ...props
}: TagListProps) {
  return (
    <SkeletonFallback isLoading={isLoading} width={skeletonWidth}>
      <div className={clsx('flex flex-wrap space-x-2', className)} {...props}>
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <Chip>{tag}</Chip>
          </Link>
        ))}
      </div>
    </SkeletonFallback>
  )
}
