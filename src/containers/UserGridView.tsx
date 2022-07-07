import { ProfileData } from '@subsocial/types/dto'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import CreatorOverview from './PostDetail/CreatorOverview'

export interface UserGridViewProps extends HTMLProps<HTMLDivElement> {
  users: (ProfileData & { address: string })[]
}

export default function UserGridView({
  users,
  className,
  ...props
}: UserGridViewProps) {
  return (
    <div className={clsx('grid grid-flow-col gap-4', className)} {...props}>
      {users.map((user) => (
        <CreatorOverview
          creator={user}
          creatorId={user.address}
          key={user.address}
        />
      ))}
    </div>
  )
}
