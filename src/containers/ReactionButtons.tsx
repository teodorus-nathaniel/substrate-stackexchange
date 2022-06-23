import Button from '#/components/Button'
import clsx from 'clsx'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'

export default function ReactionButtons() {
  return (
    <div className={clsx('flex items-center', 'space-x-4')}>
      <Button
        variant='unstyled'
        size='small'
        className={clsx('flex space-x-2 items-center')}
      >
        <BsHandThumbsUp />
        <p>25</p>
      </Button>
      <Button
        variant='unstyled'
        size='small'
        className={clsx('flex space-x-2 items-center')}
      >
        <BsHandThumbsDown />
        <p>10</p>
      </Button>
    </div>
  )
}
