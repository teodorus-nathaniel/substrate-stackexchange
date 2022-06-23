import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import AspectRatioContainer, {
  AspectRatioContainerProps
} from './AspectRatioContainer'

export interface ImageContainerProps extends ImageProps {
  aspectRatio?: AspectRatioContainerProps['aspectRatio']
  containerClassName?: string
}

export default function ImageContainer({
  aspectRatio,
  containerClassName,
  src,
  ...imageProps
}: ImageContainerProps) {
  let content
  if (typeof src === 'string') {
    content = (
      <img
        className={clsx(
          'object-center object-cover',
          aspectRatio && 'absolute top-0 left-0 w-full h-full'
        )}
        src={src}
        {...imageProps}
        alt={imageProps.alt ?? ''}
      />
    )
  } else {
    content = (
      <Image
        src={src}
        className={clsx('object-center object-cover')}
        layout={aspectRatio ? 'fill' : 'responsive'}
        {...imageProps}
        alt={imageProps.alt ?? ''}
      />
    )
  }

  return aspectRatio ? (
    <AspectRatioContainer
      aspectRatio={aspectRatio}
      className={containerClassName}
    >
      {content}
    </AspectRatioContainer>
  ) : (
    <div>{content}</div>
  )
}
