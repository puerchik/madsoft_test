import { ReactNode } from 'react'
import clsx from 'clsx'

import s from './button.module.scss'

type Props = {
  type?: 'button' | 'reset' | 'submit'
  children?: ReactNode
  onClickHandler?: () => void
  classNames?: string
}

export const Button = ({ children, onClickHandler, classNames }: Props) => {
  return (
    <button className={clsx(s.button, classNames)} onClick={onClickHandler}>
      {children}
    </button>
  )
}
