import clsx from 'clsx'
import { ChangeEvent, HTMLProps, useRef, useState } from 'react'
import { BsArrowRepeat, BsImage } from 'react-icons/bs'
import Button from '../Button'
import ImageContainer from '../ImageContainer'
import FieldWrapper, {
  getCleanedInputProps,
  RequiredFieldWrapperProps,
} from './common/FieldWrapper'

type ParentProps = Omit<HTMLProps<HTMLInputElement>, 'onChange'> &
  RequiredFieldWrapperProps
export interface ImageCircleInputProps extends ParentProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>, file: File) => void
  imageContainerClassName?: string
}

export default function ImageCircleInput({
  imageContainerClassName,
  ...props
}: ImageCircleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState('')

  console.log(props.error)
  return (
    <FieldWrapper
      {...props}
      containerClassName={clsx('items-center', props.containerClassName)}
    >
      {(id) => (
        <Button
          className={clsx(
            'bg-bg-200',
            'rounded-full w-32 h-32',
            'relative group',
            imageContainerClassName
          )}
          type='button'
          onClick={() => inputRef.current?.click()}
          variant='unstyled'
          size='content'
        >
          <input
            type='file'
            {...getCleanedInputProps(props)}
            id={id}
            onChange={(e) => {
              const files = e.target.files || []
              const file = files[0]
              setImageUrl(URL.createObjectURL(file))
              props.onChange && props.onChange(e, file)
            }}
            className={clsx('hidden', props.className)}
            ref={inputRef}
          />
          {imageUrl ? (
            <ImageContainer
              aspectRatio='1:1'
              className={clsx('rounded-full')}
              src={imageUrl}
            />
          ) : (
            <BsImage className='text-2xl' />
          )}
          <BsArrowRepeat
            className={clsx(
              'text-2xl',
              'absolute bottom-1.5 right-1.5',
              'group-hover:rotate-180 group-focus:rotate-180',
              'transition duration-500'
            )}
          />
        </Button>
      )}
    </FieldWrapper>
  )
}
