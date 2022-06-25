import Button from '#/components/Button'
import useFormikWrapper from '#/lib/hooks/useFormikWrapper'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { askQuestionForm } from './form/schema'

const RichTextArea = dynamic(() => import('#/components/inputs/RichTextArea'), {
  ssr: false,
})

export default function AskForm() {
  const { values, getFieldData, handleSubmit, resetForm } = useFormikWrapper({
    ...askQuestionForm,
    onSubmit: (values) => {
      console.log('CREATING QUESTION...')
      // setIsOpenModal(true)
      // createSpace(values)
    },
  })
  console.log(values)

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col')}>
      <h1 className={clsx('text-3xl')}>Ask a Public Question</h1>
      <RichTextArea
        label='Title'
        startOneLine
        className={clsx('text-xl')}
        labelClassName={clsx('text-sm font-bold mb-0')}
        containerClassName={clsx('space-y-1', 'mt-8')}
        helperText='Be specific and imagine you’re asking a question to another person'
        helperTextClassName={clsx('text-xs')}
        storagePrefix='ask'
        {...getFieldData('title')}
      />
      <RichTextArea
        label='Body'
        labelClassName={clsx('font-bold')}
        containerClassName={clsx('mt-8 text-sm')}
        helperText='Include all the information someone would need to answer your question'
        helperTextClassName={clsx('text-xs')}
        storagePrefix='ask'
        {...getFieldData('body')}
      />
      <div className={clsx('mt-8 space-x-4', 'flex items-center')}>
        <Button type='submit'>Post your question</Button>
        <Button
          onClick={() => resetForm()}
          type='button'
          variant='outlined-red'
        >
          Discard draft
        </Button>
      </div>
    </form>
  )
}
