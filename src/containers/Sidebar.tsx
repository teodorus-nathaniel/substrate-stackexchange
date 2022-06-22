import Link, { LinkProps } from '#/components/Link'
import { hoverRingClassName } from '#/lib/constants/common-classnames'
import { NORMAL_TRANSITION } from '#/lib/constants/transition'
import { TransitionVariants } from '#/lib/helpers/types'
import clsx from 'clsx'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

const WIDTH = 225

const containerVariants: TransitionVariants = {
  close: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}
const contentVariants: TransitionVariants = {
  close: { opacity: 0, x: -25, transition: NORMAL_TRANSITION },
  open: { opacity: 1, x: 0, transition: NORMAL_TRANSITION }
}

interface Props extends HTMLMotionProps<'aside'> {}

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

export default function Sidebar({ className, ...props }: Props) {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.aside
      className={clsx(
        'flex flex-col',
        'p-4',
        'bg-bg-100',
        'rounded-md',
        className
      )}
      animate={{
        width: isOpen ? WIDTH : 0,
        paddingLeft: !isOpen ? 0 : undefined,
        paddingRight: !isOpen ? 0 : undefined
      }}
      {...props}
    >
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
                    className={clsx('mb-2')}
                    {...data}
                    selected={data.to === pathname}
                  />
                )
              }
              const { content, title } = data
              return (
                <motion.div
                  className='pb-6 space-y-1 flex flex-col'
                  key={title}
                >
                  <motion.p
                    variants={contentVariants}
                    className='font-bold px-2 py-1.5'
                  >
                    {title}
                  </motion.p>
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
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
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
    <motion.div
      variants={contentVariants}
      className={clsx(
        'px-2 py-1.5',
        selected ? 'bg-bg-200 font-bold' : '',
        'rounded-md',
        className
      )}
    >
      <Link href={to} key={text} {...props}>
        {text}
      </Link>
    </motion.div>
  )
}
