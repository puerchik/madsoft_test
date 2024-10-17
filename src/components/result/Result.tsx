import { resetTest } from '@/app/store/knowledgeChecksSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { useNavigate, useParams } from 'react-router-dom'

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
    navigate(`/`)
  }

  console.log(answers, correct, incorrect)
  return (
    <div>
      <h3>Результаты теста:</h3>
      <p>Тест пройден на {`${(correct / answers.length) * 100}`}%</p>
      <p>
        Правильных ответов {`${correct}`} из {`${answers.length}`}
      </p>
      <button onClick={restartTestHandler}>Пройти тест заново</button>
      <button onClick={selectTestHandler}>Выбрать другой тест</button>
    </div>
  )
}
