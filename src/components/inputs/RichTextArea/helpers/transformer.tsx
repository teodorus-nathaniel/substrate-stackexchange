import { CustomText } from '#/declarations/slate'
import { KeyboardEvent } from 'react'
import { BaseEditor, Editor, Text, Transforms } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

type EditorType = BaseEditor & ReactEditor & HistoryEditor

function matchTextProps(
  editor: EditorType,
  checker: (n: CustomText) => boolean
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && checker(n),
    universal: true,
  })
  return match
}

function toggleTextMark(
  editor: EditorType,
  checkActive: (editor: EditorType) => boolean,
  editedProps: (isActive: boolean) => Partial<CustomText>
) {
  const isActive = checkActive(editor)
  Transforms.setNodes(editor, editedProps(isActive), {
    match: (n) => Text.isText(n),
    split: true,
  })
}

export const CustomEditor = {
  isBoldMarkActive: (editor: EditorType) =>
    !!matchTextProps(editor, (n) => n.bold === true),
  isCodeMarkActive: (editor: EditorType) =>
    !!matchTextProps(editor, (n) => n.code === true),
  isItalicMarkActive: (editor: EditorType) =>
    !!matchTextProps(editor, (n) => n.italic === true),
  isUnderlineMarkActive: (editor: EditorType) =>
    !!matchTextProps(editor, (n) => n.underline === true),

  toggleBoldMark: (editor: EditorType) => {
    toggleTextMark(editor, CustomEditor.isBoldMarkActive, (isActive) => ({
      bold: !isActive,
    }))
  },
  toggleCodeMark: (editor: EditorType) => {
    toggleTextMark(editor, CustomEditor.isCodeMarkActive, (isActive) => ({
      code: !isActive,
    }))
  },
  toggleItalicMark: (editor: EditorType) => {
    toggleTextMark(editor, CustomEditor.isItalicMarkActive, (isActive) => ({
      italic: !isActive,
    }))
  },
  toggleUnderlineMark: (editor: EditorType) => {
    toggleTextMark(editor, CustomEditor.isUnderlineMarkActive, (isActive) => ({
      underline: !isActive,
    }))
  },
}

export function transformOnKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  editor: EditorType
) {
  if (!event.ctrlKey) return
  let isPreventDefault = true
  switch (event.key) {
    case '`': {
      CustomEditor.toggleCodeMark(editor)
      break
    }
    case 'b': {
      CustomEditor.toggleBoldMark(editor)
      break
    }
    case 'i': {
      CustomEditor.toggleItalicMark(editor)
      break
    }
    case 'u': {
      CustomEditor.toggleUnderlineMark(editor)
      break
    }
    default: {
      isPreventDefault = false
    }
  }
  if (isPreventDefault) event.preventDefault()
}
