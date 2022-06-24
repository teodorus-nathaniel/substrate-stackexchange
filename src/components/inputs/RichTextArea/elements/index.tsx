import { RenderElementProps, RenderLeafProps } from 'slate-react'
import DefaultElement from './DefaultElement'
import Leaf from './Leaf'

export function renderElement(props: RenderElementProps) {
  switch (props.element.type) {
    default:
      return <DefaultElement {...props} />
  }
}

export function renderLeaf(props: RenderLeafProps) {
  return <Leaf {...props} />
}
