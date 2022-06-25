import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { HTMLProps, useEffect } from 'react'
import Link from './Link'

export interface TabData {
  text: string
  hash?: string
}

function encodeTab(tab: string) {
  return encodeURI(tab.replace(/ /g, '-').toLowerCase())
}
function decodeTab(encoded: string) {
  return decodeURI(encoded.replace(/-/g, ' '))
}

export interface TabLayoutProps extends HTMLProps<HTMLUListElement> {
  tabs: TabData[]
  selectedTab: number
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}

export default function TabLayout({
  tabs,
  selectedTab,
  setSelectedTab,
  className,
  ...props
}: TabLayoutProps) {
  useEffect(() => {
    const currentHash = location.hash.substring(1)
    const decodedHash = decodeTab(currentHash)
    const currentTab = tabs.findIndex(
      ({ text, hash }) => (hash ?? text).toLowerCase() === decodedHash
    )
    if (currentTab !== -1) {
      setSelectedTab(currentTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ul
      className={clsx(
        'flex items-baseline',
        'border-b-4 border-bg-100',
        className
      )}
      {...props}
    >
      {tabs.map(({ text, hash }, idx) => (
        <li
          key={idx}
          className={clsx('relative')}
          onClick={() => setSelectedTab(idx)}
        >
          <Link
            className={clsx(
              'pb-2.5 px-4',
              'block',
              selectedTab === idx && 'text-brand'
            )}
            href={`#${encodeTab(hash ?? text)}`}
          >
            {text}
          </Link>
          {selectedTab === idx && (
            <motion.div
              className={clsx(
                'w-full h-0.5',
                'rounded-full',
                'absolute',
                'left-0 -bottom-0.5',
                'bg-brand'
              )}
              layoutId='underline'
            />
          )}
        </li>
      ))}
    </ul>
  )
}
