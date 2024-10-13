import { TestCreationForm } from '@/components/testCreationForm'
import { TestSelectionComponent } from '@/components/testSelectionComponent'

import '@/styles/index.scss'

export const App = () => {
  return (
    <main>
      <TestSelectionComponent />
      <TestCreationForm />
    </main>
  )
}
