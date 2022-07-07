import clsx from 'clsx'
import { BsCash } from 'react-icons/bs'

export default function HomePage() {
  const highlightedTextClassNames = clsx('text-brand font-bold')
  const paragraphClassNames = clsx(
    'text-center max-w-[60ch] mx-auto mb-4 leading-loose'
  )
  return (
    <div>
      <h1 className='text-center text-2xl font-bold mb-8'>
        Welcome to Substrate StackExchange!
      </h1>
      <p className={paragraphClassNames}>
        <span className='text-text-secondary'>
          Need a help when building innovations with Substrate SDK?
        </span>
        <br />
        <span className={highlightedTextClassNames}>Search</span> for it or{' '}
        <span className={highlightedTextClassNames}>Ask it yourself</span> here
      </p>
      <p className={paragraphClassNames}>
        <span className='text-text-secondary'>
          Found an answer that you are looking for?
        </span>
        <br />
        Consider <span className={highlightedTextClassNames}>tipping</span> the
        helpful user <BsCash className='inline text-brand' />
      </p>
    </div>
  )
}
