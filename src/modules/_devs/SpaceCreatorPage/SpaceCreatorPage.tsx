import Card from '#/components/Card'
import ImageCircleInput from '#/components/inputs/ImageCircleInput'
import TextField from '#/components/inputs/TextField'
import useFormikWrapper from '#/lib/hooks/useFormikWrapper'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { createSpaceForm } from './forms/schema'

const RichTextArea = dynamic(() => import('#/components/inputs/RichTextArea'), {
  ssr: false,
})

export default function SpaceCreatorPage() {
  const { getFieldData } = useFormikWrapper({
    ...createSpaceForm,
    onSubmit: () => {
      alert('SUBMIT')
    },
  })

  return (
    <div className={clsx('flex flex-col', 'w-full max-w-screen-sm', 'mx-auto')}>
      <h1 className={clsx('text-2xl')}>Welcome Developer!</h1>
      <p className={clsx('pt-2')}>
        This page will help you create a <strong>space</strong> in subsocial
        easily!
      </p>
      <Card
        className={clsx(
          'bg-bg-100',
          'px-6 pt-6 pb-12 mt-8',
          'flex flex-col items-center'
        )}
      >
        <p className='text-xl'>
          Let&apos;s create a <strong>space</strong>
        </p>
        <div
          className={clsx(
            'flex flex-col items-center',
            'space-y-4',
            'w-full',
            'mt-6'
          )}
        >
          <ImageCircleInput
            {...getFieldData('avatar')}
            helperText='Image should be less than 2MB'
          />
          <TextField {...getFieldData('name')} required label='Name' />
          <RichTextArea
            {...getFieldData('desc')}
            name='space-desc'
            label='Description'
          />
        </div>
      </Card>
    </div>
  )
}
