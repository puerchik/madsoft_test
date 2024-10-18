import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'

import s from './homePage.module.scss'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Приложение для проведения тестирования.</h1>
      <div className={s.buttonWrapper}>
        <Button onClickHandler={() => navigate('/selectTest')}>Выбрать тест для прохождения</Button>
        <Button onClickHandler={() => navigate('/createTest')}>Создать тест</Button>
      </div>
    </div>
  )
}
