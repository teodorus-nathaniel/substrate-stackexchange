import Modal from '#/components/Modal'
import Post from '#/containers/Post'
import { useState } from 'react'

export default function NewQuestionsPage() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div>
      <div className='flex flex-col space-y-8'>
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
