import clsx from 'clsx'
import { HTMLProps } from 'react'
import FieldWrapper, {
  getCleanedInputProps,
  RequiredFieldWrapperProps
} from './common/FieldWrapper'

export default function TextField(
  props: HTMLProps<HTMLInputElement> & RequiredFieldWrapperProps
) {
  return (
    <FieldWrapper {...props}>
      {(id, commonClassNames) => (
        <input
          {...getCleanedInputProps(props)}
          id={id}
          className={clsx(commonClassNames, props?.className)}
        />
      )}
    </FieldWrapper>
  )
}
