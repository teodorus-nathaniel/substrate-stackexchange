import clsx from 'clsx'
import { useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'
import { EditableProps } from 'slate-react/dist/components/editable'
import FieldWrapper, {
  getCleanedInputProps,
  RequiredFieldWrapperProps
} from '../common/FieldWrapper'
import { renderElement, renderLeaf } from './elements'
import { transformOnKeyDown } from './helpers/transformer'

export type RichTextAreaProps = EditableProps & RequiredFieldWrapperProps

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

export default function RichTextArea(props: RichTextAreaProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <FieldWrapper {...props}>
      {(id, classNames) => (
        <Slate editor={editor} value={initialValue}>
          <Editable
            {...getCleanedInputProps(props)}
            className={clsx('min-h-[8em]', classNames, props.className)}
            id={id}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={(e) => transformOnKeyDown(e, editor)}
            onChange={(value) => {
              const isAstChange = editor.operations.some(
                (op) => 'set_selection' !== op.type
              )
              if (isAstChange) {
                const content = JSON.stringify(value)
                localStorage.setItem('content', content)
              }
            }}
          />
        </Slate>
      )}
    </FieldWrapper>
  )
}
