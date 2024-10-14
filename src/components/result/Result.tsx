import { useAppSelector } from '@/shared/hooks/reduxHooks'
import { useParams } from 'react-router-dom'

export const Result = () => {
  const { id } = useParams()

  const testId = id ? id : ''

  const answers = useAppSelector(state => state.persistedReducer[testId].answers)
  const correct = answers.reduce((a, c) => (c.isCorrect ? a + 1 : a + 0), 0)
  const incorrect = answers.length - correct
  console.log(answers, correct, incorrect)

  return (
    <div>
      <h3>Результаты теста:</h3>
      <p>Тест пройден на {`${(correct / answers.length) * 100}`}%</p>
      <p>
        Правильных ответов {`${correct}`} из {`${answers.length}`}
      </p>
    </div>
  )
}
