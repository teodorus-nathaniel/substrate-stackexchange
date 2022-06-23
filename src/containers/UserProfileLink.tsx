import ImageContainer from '#/components/ImageContainer'
import Link, { LinkProps } from '#/components/Link'
import clsx from 'clsx'

interface Props extends LinkProps {}

export default function UserProfileLink({ className, ...props }: Props) {
  return (
    <Link
      variant='primary'
      className={clsx('flex items-center', className)}
      {...props}
    >
      <div className={clsx('w-5 h-5', 'mr-2', 'relative top-px')}>
        <ImageContainer
          aspectRatio='1:1'
          src='https://app.subsocial.network/ipfs/ipfs/QmZ62eYxcMsQRUFzCJgLPseiEKBMdiwHZhsqZin2skQrRg'
          alt='profile'
        />
      </div>
      <p className='font-bold'>Justin Frevent</p>
    </Link>
  )
}
