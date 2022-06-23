import clsx from 'clsx'
import { HTMLProps } from 'react'

export interface CardProps extends HTMLProps<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps) {
  return <div className={clsx('rounded-md', 'p-2', className)} {...props} />
}
