import Link, { LinkProps } from '#/components/Link'
import { hoverRingClassName } from '#/lib/constants/common-classnames'
import { NORMAL_TRANSITION } from '#/lib/constants/transition'
import { TransitionVariants } from '#/lib/helpers/types'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { HTMLProps, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

const WIDTH = 225

const containerVariants: TransitionVariants = {
  close: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}
const contentVariants: TransitionVariants = {
  close: { opacity: 0, x: -25, transition: NORMAL_TRANSITION },
  open: { opacity: 1, x: 0, transition: NORMAL_TRANSITION },
}

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
      { text: 'Your Questions', to: '/profile/questions' },
    ],
  },
  {
    title: 'Users',
    content: [
      { text: 'All', to: '/users' },
      { text: 'Following', to: '/profile/following' },
      { text: 'Followers', to: '/profile/followers' },
    ],
  },
]

export default function Sidebar({ className, ...props }: Props) {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={clsx(className)} {...props}>
      <button
        className={clsx(
          'p-2 bg-bg-100 text-lg',
          'absolute right-1 top-0 translate-x-full z-10',
          'rounded-r-md',
          hoverRingClassName
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <BsChevronLeft
          className={clsx(
            'transition duration-150',
            isOpen ? '' : 'rotate-180'
          )}
        />
      </button>
      <motion.aside
        className={clsx(
          'flex flex-col',
          'p-4 h-full',
          'bg-bg-100',
          'rounded-md'
        )}
        animate={{
          width: isOpen ? WIDTH : 0,
          opacity: isOpen ? 1 : 0,
          paddingLeft: !isOpen ? 0 : undefined,
          paddingRight: !isOpen ? 0 : undefined,
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={containerVariants}
              transition={NORMAL_TRANSITION}
              initial='close'
              animate='open'
              exit='close'
            >
              {links.map((data) => {
                if ('to' in data) {
                  return (
                    <SidebarLink
                      key={data.to}
                      className={clsx('mb-2')}
                      {...data}
                      selected={data.to === pathname}
                    />
                  )
                }
                const { content, title } = data
                return (
                  <motion.div
                    className='pb-6 flex flex-col space-y-1'
                    key={title}
                  >
                    <motion.p
                      variants={contentVariants}
                      className='font-bold px-2 py-1.5'
                    >
                      {title}
                    </motion.p>
                    <div className={clsx('px-2 flex flex-col', 'space-y-1')}>
                      {content.map((link) => (
                        <SidebarLink
                          {...link}
                          className={clsx('!px-6')}
                          selected={link.to === pathname}
                          key={link.to}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </div>
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
    <motion.div variants={contentVariants}>
      <Link
        className={clsx(
          'block',
          'px-2 py-1.5',
          'hover:bg-bg-200',
          selected ? 'bg-bg-200 font-bold text-brand' : '',
          'rounded-md',
          className
        )}
        href={to}
        key={text}
        {...props}
      >
        {text}
      </Link>
    </motion.div>
  )
}
