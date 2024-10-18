import { TestCreationForm } from '../testCreationForm'
import { TestSelectionComponent } from '../testSelectionComponent'
import s from './homePage.module.scss'

export const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <TestSelectionComponent />
      <TestCreationForm />
    </div>
  )
}
