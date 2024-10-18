import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/app/App'
import { Question } from '@/components/question'
import { Result } from '@/components/result'
import { HomePage } from '@/components/homePage'
import { TestCreationForm } from '@/components/testCreationForm'
import { TestSelectionComponent } from '@/components/testSelectionComponent'
import { NotFoundPage } from '@/components/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/test/:id/:number',
        element: <Question />,
      },
      {
        path: '/test/:id/result',
        element: <Result />,
      },
      {
        path: '/createTest',
        element: <TestCreationForm />,
      },
      {
        path: '/selectTest',
        element: <TestSelectionComponent />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
