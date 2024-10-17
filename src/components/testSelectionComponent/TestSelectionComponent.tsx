import { useAppSelector } from '@/shared/hooks/reduxHooks'

import s from './testSelectionComponent.module.scss'
import { Link } from 'react-router-dom'

export const TestSelectionComponent = () => {
  const testsList = useAppSelector(state => state.persistedReducer)

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Выберите тест для прохождения:</h3>
      <ul className={s.testsList}>
        {Object.entries(testsList).map(el => (
          <li key={el[0]} className={s.testsListItem}>
            <Link to={`/test/${el[1].id}/${el[1].currentQuestionNumber}`}>{el[1].testName}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
