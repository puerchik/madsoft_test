import { TestCreationForm } from '@/components/testCreationForm'
import { TestSelectionComponent } from '@/components/testSelectionComponent'

import s from './homePage.module.scss'

export const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <TestSelectionComponent />
      <TestCreationForm />
    </div>
  )
}
