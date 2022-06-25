import { EditorType } from '#/declarations/slate'
import clsx from 'clsx'
import { ChangeEventHandler, useMemo, useRef } from 'react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'
import { EditableProps } from 'slate-react/dist/components/editable'
import FieldWrapper, {
  getCleanedInputProps,
  RequiredFieldWrapperProps,
} from '../common/FieldWrapper'
import { renderElement, renderLeaf } from './elements'
import { deserializeDraft, serializeDraft } from './helpers/serializer'
import { transformOnKeyDown } from './helpers/transformer'

type ParentProps = EditableProps & RequiredFieldWrapperProps
export interface RichTextAreaProps extends ParentProps {
  name: string
  storagePrefix?: string
  startOneLine?: boolean
}

const defaultInitialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const onChangeWrapper = (
  onChange: ChangeEventHandler<HTMLDivElement> | undefined,
  content: string,
  name: string
) => {
  onChange &&
    onChange({
      target: {
        name: name,
        value: content,
      },
    } as any)
}

export default function RichTextArea({
  startOneLine,
  storagePrefix: _storagePrefix,
  onChange,
  ...props
}: RichTextAreaProps) {
  const editorRef = useRef<EditorType | null>(null)
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()))
  const editor = editorRef.current

  const storagePrefix = _storagePrefix ? `-${_storagePrefix}` : ''
  const storageKey = `textarea${storagePrefix}-${props.name}`
  const initialValue = useMemo(() => {
    let value = defaultInitialValue
    if (typeof window !== 'undefined') {
      const savedDraft = window.localStorage.getItem(storageKey)
      if (savedDraft) {
        onChangeWrapper(onChange, savedDraft, props.name)
        value = deserializeDraft(savedDraft)
      }
    }
    return value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  return (
    <FieldWrapper {...props}>
      {(id, classNames) => (
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => 'set_selection' !== op.type
            )
            if (isAstChange) {
              const content = serializeDraft(value)
              localStorage.setItem(storageKey, content)
              // TODO: because this is still json stringify, the length will be more than the actual content
              onChangeWrapper(onChange, content, props.name)
            }
          }}
        >
          <Editable
            {...getCleanedInputProps(props)}
            className={clsx(
              !startOneLine && 'min-h-[8em]',
              classNames,
              props.className
            )}
            id={id}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={(e) => transformOnKeyDown(e, editor)}
          />
        </Slate>
      )}
    </FieldWrapper>
  )
}
