import Link, { LinkProps } from '#/components/Link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

const WIDTH = 225

interface Props extends HTMLProps<HTMLDivElement> {}

type LinkData = { text: string; to: string }
type NestedLinks = {
  title: string
  content: LinkData[]
}
const links: (NestedLinks | LinkData)[] = [
  { text: 'Home', to: '/' },
  {
    title: 'Questions',
    content: [
      { text: 'New', to: '/questions/new' },
      { text: 'Unanswered', to: '/questions/unanswered' },
      { text: 'Your Questions', to: '/profile/questions' }
    ]
  },
  {
    title: 'Users',
    content: [
      { text: 'All', to: '/users' },
      { text: 'Following', to: '/profile/following' },
      { text: 'Followers', to: '/profile/followers' }
    ]
  }
]

export default function Sidebar({ className, style, ...props }: Props) {
  const { pathname } = useRouter()

  return (
    <aside
      className={clsx(
        'flex flex-col',
        'px-4 py-6',
        'bg-bg-100',
        'rounded-md',
        className
      )}
      style={{ width: WIDTH, ...style }}
      {...props}
    >
      <button
        className={clsx(
          'p-2 bg-bg-100',
          'absolute right-1 top-0 translate-x-full',
          'z-10',
          'text-lg'
        )}
      >
        <BsChevronLeft />
      </button>
      {links.map((data) => {
        if ('to' in data) {
          return (
            <SidebarLink
              className={clsx('mb-2')}
              {...data}
              selected={data.to === pathname}
            />
          )
        }
        const { content, title } = data
        return (
          <div className='pb-6 space-y-1 flex flex-col' key={title}>
            <p className='font-bold px-2 py-1.5'>{title}</p>
            <div className={clsx('px-2 flex flex-col')}>
              {content.map((link) => (
                <SidebarLink
                  {...link}
                  className={clsx('!px-6')}
                  selected={link.to === pathname}
                  key={link.to}
                />
              ))}
            </div>
          </div>
        )
      })}
    </aside>
  )
}

function SidebarLink({
  text,
  to,
  selected,
  className,
  ...props
}: LinkData & { selected: boolean } & LinkProps) {
  return (
    <Link
      href={to}
      key={text}
      className={clsx(
        'px-2 py-1.5',
        selected ? 'bg-bg-200 font-bold' : '',
        'rounded-md',
        className
      )}
      {...props}
    >
      {text}
    </Link>
  )
}
