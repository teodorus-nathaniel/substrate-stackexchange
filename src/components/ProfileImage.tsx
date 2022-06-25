import clsx from 'clsx'
import { ImageProps } from 'next/image'
import { HTMLProps } from 'react'
import ImageContainer from './ImageContainer'
import SkeletonFallback from './SkeletonFallback'

export interface ProfileImageProps
  extends Omit<HTMLProps<HTMLDivElement>, 'src'> {
  src?: ImageProps['src']
  alt?: string
  isLoading?: boolean
}

const DEFAULT_PROFILE_PIC =
  'https://app.subsocial.network/ipfs/ipfs/QmRXpLwHBpxRzqN4fVURtQfhB6kBqjXqey1CYEWRbCyfxJ'

export default function ProfileImage({
  className,
  src,
  alt,
  isLoading,
  ...props
}: ProfileImageProps) {
  return (
    <div className={clsx(className)} {...props}>
      <SkeletonFallback
        isLoading={isLoading}
        circle
        height='100%'
        className='block'
      >
        <ImageContainer
          src={src ?? DEFAULT_PROFILE_PIC}
          className={clsx('rounded-full')}
          aspectRatio='1:1'
          alt={alt ?? 'Profile'}
        />
      </SkeletonFallback>
    </div>
  )
}
