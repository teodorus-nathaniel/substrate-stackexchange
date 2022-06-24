import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type ElementTypes = 'paragraph'
type CustomElement = { type: ElementTypes; children: CustomText[] }
type CustomText = {
  text: string
  bold?: boolean
  underline?: boolean
  italic?: boolean
  code?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
