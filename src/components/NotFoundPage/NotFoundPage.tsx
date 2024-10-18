import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'

import s from './notFoundPage.module.scss'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <div className={s.wrapper}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>Page not found</p>
        <p className={s.text}>No match for {location.pathname}</p>
        <Button onClickHandler={() => navigate('/')}>Главная</Button>
      </div>
    </>
  )
}
