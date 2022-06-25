import RichTextArea from '#/components/inputs/RichTextArea'
import clsx from 'clsx'

export default function AskForm() {
  return (
    <div className={clsx('flex flex-col')}>
      <RichTextArea
        name='ask-title'
        label='Title'
        startOneLine
        className={clsx('text-xl')}
        labelClassName={clsx('text-sm font-bold mb-0')}
        containerClassName={clsx('space-y-1')}
        helperText='Be specific and imagine you’re asking a question to another person'
        helperTextClassName={clsx('text-xs')}
      />
      <RichTextArea
        name='ask-body'
        label='Body'
        labelClassName={clsx('font-bold')}
        containerClassName={clsx('mt-8 text-sm')}
        helperText='Include all the information someone would need to answer your question'
        helperTextClassName={clsx('text-xs')}
      />
    </div>
  )
}
