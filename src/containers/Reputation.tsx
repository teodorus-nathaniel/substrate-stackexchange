import SkeletonFallback, {
  useIntegratedSkeleton,
} from '#/components/SkeletonFallback'
import { useGetReputationByAddress } from '#/services/indexing/queries'
import clsx from 'clsx'
import { HTMLProps } from 'react'
import { BsAward } from 'react-icons/bs'

export interface ReputationProps extends HTMLProps<HTMLDivElement> {
  address: string
}

export default function Reputation({
  className,
  address,
  ...props
}: ReputationProps) {
  const { data, isLoading, isFetched } = useGetReputationByAddress(address)
  const { loadingChecker, getContent } = useIntegratedSkeleton(
    isLoading,
    isFetched
  )

  const reputation = data?.reputation?.value

  return (
    <div className={clsx('flex items-center', className)} {...props}>
      <SkeletonFallback isLoading={loadingChecker(reputation)} width={50}>
        <BsAward className='mr-1' />
        <span>{getContent(reputation, 0)}</span>
      </SkeletonFallback>
    </div>
  )
}
