import { hoverRingClassName } from '#/lib/constants/common-classnames'
import clsx from 'clsx'
import { useId } from 'react'

export interface RequiredFieldWrapperProps {
  containerClassName?: string
  fullWidth?: boolean

  label?: string
  labelClassName?: string
  helperText?: string
  helperTextClassName?: string

  error?: string | boolean
  required?: boolean

  id?: string
}

export interface FieldWrapperProps extends RequiredFieldWrapperProps {
  children: (id: string, commonClassNames: string) => JSX.Element
}

export default function FieldWrapper({
  containerClassName,
  label,
  labelClassName,
  helperText,
  helperTextClassName,
  fullWidth = true,
  id,
  required,
  children
}: FieldWrapperProps) {
  const generatedId = useId()
  const usedId = id || generatedId

  const commonClassNames = clsx(
    'bg-bg-200',
    'py-2 pl-4 pr-9',
    'rounded-md',
    'transition duration-150',
    'hover:brightness-125',
    'focus:brightness-125',
    'disabled:cursor-not-allowed disabled:brightness-75',
    hoverRingClassName
  )

  return (
    <div
      className={clsx(
        'flex flex-col',
        fullWidth && 'w-full',
        'space-y-2',
        containerClassName
      )}
    >
      {label && (
        <label htmlFor={usedId} className={clsx('mb-0.5', labelClassName)}>
          {label}
          {required && <span className='text-red-500'> *</span>}
        </label>
      )}
      {children(usedId, commonClassNames)}
      {helperText && (
        <p className={clsx('text-xs text-text-secondary', helperTextClassName)}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export function getCleanedInputProps<T extends RequiredFieldWrapperProps>(
  props: T
) {
  const {
    containerClassName: _containerProps,
    label: _label,
    labelClassName: _labelProps,
    error: _error,
    fullWidth: _fullWidth,
    helperText: _helperText,
    helperTextClassName: _helperTextProps,
    id: _id,
    ...otherProps
  } = props

  return otherProps
}
