import Button from '#/components/Button'
import Select from '#/components/inputs/Select'
import TransactionModal from '#/containers/TransactionModal'
import useFormikWrapper from '#/lib/hooks/useFormikWrapper'
import { useCreatePost } from '#/services/subsocial/mutations'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { askQuestionForm } from './form/schema'

const RichTextArea = dynamic(() => import('#/components/inputs/RichTextArea'), {
  ssr: false,
})

export default function AskForm() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { mutate: postQuestion, isLoading, error } = useCreatePost()
  const { getFieldData, handleSubmit, resetForm } = useFormikWrapper({
    ...askQuestionForm,
    onSubmit: (values) => {
      console.log('CREATING QUESTION...')
      setIsOpenModal(true)
      const usedValues = {
        ...values,
        tags: values.tags.map(({ value }) => value.toLowerCase()),
      }
      postQuestion(usedValues)
    },
  })

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col')}>
      <TransactionModal
        action='Posting your question'
        isLoading={isLoading}
        errorMsg={error?.message}
        handleClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
      />
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
      <Select
        creatable
        containerClassName={clsx('mt-8 text-sm')}
        labelClassName={clsx('font-bold')}
        isMulti
        label='Tags'
        helperText='Choose at least one tag'
        helperTextClassName={clsx('text-xs')}
        {...getFieldData('tags')}
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
