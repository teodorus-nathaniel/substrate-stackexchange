import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'

export interface PopOverProps {
  children: any
  trigger: any
}

export default function PopOver({ children, trigger }: PopOverProps) {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 15],
        },
      },
    ],
  })

  return (
    <Popover className='relative'>
      <Popover.Button ref={setReferenceElement as any}>
        {trigger}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement as any}
        style={styles.popper}
        className='absolute z-10'
        {...attributes.popper}
      >
        {children}
      </Popover.Panel>
    </Popover>
  )
}
