import Button from '#/components/Button'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs'

interface Props extends HTMLProps<HTMLDivElement> {
  upVoteCount: number
  isUpVoted: boolean
  downVoteCount: number
  isDownVoted: boolean
}

export default function ReactionButtons({
  downVoteCount,
  isDownVoted,
  isUpVoted,
  upVoteCount,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx('flex items-center', 'space-x-4', className)}
      {...props}
    >
      <Button
        variant='unstyled'
        size='small'
        className={clsx('flex space-x-2 items-center')}
      >
        {isUpVoted ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        <p>{upVoteCount}</p>
      </Button>
      <Button
        variant='unstyled'
        size='small'
        className={clsx('flex space-x-2 items-center')}
      >
        {isDownVoted ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
        <p>{downVoteCount}</p>
      </Button>
    </div>
  )
}
