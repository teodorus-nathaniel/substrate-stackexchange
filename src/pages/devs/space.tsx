import Card from '#/components/Card'
import ImageCircleInput from '#/components/inputs/ImageCircleInput'
import TextField from '#/components/inputs/TextField'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

const RichTextArea = dynamic(() => import('#/components/inputs/RichTextArea'), {
  ssr: false,
})

export default function SpaceCreatorPage() {
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
          <ImageCircleInput helperText='Image should be less than 2MB' />
          <TextField required label='Name' />
          <RichTextArea name='space-desc' label='Description' />
        </div>
      </Card>
    </div>
  )
}
