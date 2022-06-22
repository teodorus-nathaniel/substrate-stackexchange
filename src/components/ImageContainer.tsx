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
  ...imageProps
}: ImageContainerProps) {
  const content = (
    <Image
      className={clsx('object-center object-cover')}
      layout={aspectRatio ? 'fill' : 'responsive'}
      {...imageProps}
      alt={imageProps.alt ?? ''}
    />
  )

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
