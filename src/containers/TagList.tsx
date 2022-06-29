import Chip from '#/components/Chip'
import Link from '#/components/Link'
import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface TagListProps extends HTMLProps<HTMLDivElement> {
  tags: string[]
}

export default function TagList({ tags, className, ...props }: TagListProps) {
  return (
    <div className={clsx('flex flex-wrap space-x-2', className)} {...props}>
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`}>
          <Chip>{tag}</Chip>
        </Link>
      ))}
    </div>
  )
}
