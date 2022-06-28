import Button from '#/components/Button'
import SkeletonFallback from '#/components/SkeletonFallback'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs'

interface Props extends HTMLProps<HTMLDivElement> {
  upVoteCount?: number
  downVoteCount?: number
  isUpVoted: boolean
  isDownVoted: boolean
  isLoading?: boolean
}

export default function ReactionButtons({
  downVoteCount,
  isDownVoted,
  isUpVoted,
  upVoteCount,
  className,
  isLoading,
  ...props
}: Props) {
  return (
    <div
      className={clsx('flex items-center', 'space-x-6', className)}
      {...props}
    >
      <Button
        variant='nothing'
        size='content'
        innerContainerClassName={clsx('flex space-x-2 items-center')}
      >
        <SkeletonFallback width={50} isLoading={isLoading}>
          {isUpVoted ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
          <p>{upVoteCount}</p>
        </SkeletonFallback>
      </Button>
      <Button
        variant='nothing'
        size='content'
        innerContainerClassName={clsx('flex space-x-2 items-center')}
      >
        <SkeletonFallback width={50} isLoading={isLoading}>
          {isDownVoted ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
          <p>{downVoteCount}</p>
        </SkeletonFallback>
      </Button>
    </div>
  )
}
