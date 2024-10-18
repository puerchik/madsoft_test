import { Link } from 'react-router-dom'

import { useAppSelector } from '@/shared/hooks/reduxHooks'

import s from './testSelectionComponent.module.scss'

export const TestSelectionComponent = () => {
  const testsList = useAppSelector(state => state.persistedReducer)
  const testsListArr = Object.entries(testsList)
  testsListArr.pop()

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Выберите тест для прохождения:</h3>
      <ul className={s.testsList}>
        {testsListArr.map(el => (
          <li key={el[0]} className={s.testsListItem}>
            <Link
              className={s.testLink}
              to={`/test/${el[1].id}/${
                el[1].answers?.length < el[1].currentQuestionNumber
                  ? el[1].currentQuestionNumber
                  : 'result'
              }`}
            >
              {el[1].testName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
