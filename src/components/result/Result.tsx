import { useNavigate, useParams } from 'react-router-dom'

import { resetTest } from '@/app/store/knowledgeChecksSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'

import { Button } from '@/components/button'

import s from './result.module.scss'

export const Result = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const testId = id ? id : ''

  const answers = useAppSelector(state => state.persistedReducer[testId].answers)
  const correct = answers.reduce((a, c) => (c.isCorrect ? a + 1 : a + 0), 0)
  const incorrect = answers.length - correct

  const restartTestHandler = () => {
    dispatch(resetTest({ testId }))
    navigate(`/test/${testId}/1`)
  }

  const selectTestHandler = () => {
    navigate('/')
  }

  console.log(answers, correct, incorrect)
  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Результаты теста:</h3>
      <p className={s.result}>Тест пройден на {`${(correct / answers.length) * 100}`}%</p>
      <p className={s.result}>
        Правильных ответов {`${correct}`} из {`${answers.length}`}
      </p>
      <div className={s.buttonWrapper}>
        <Button onClickHandler={restartTestHandler}>Пройти тест заново</Button>
        <Button onClickHandler={selectTestHandler}>Главная страница</Button>
      </div>
    </div>
  )
}
