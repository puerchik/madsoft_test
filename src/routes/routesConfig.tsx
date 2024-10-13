import { App } from '@/app/App'
import { Question } from '@/components/question'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test/:id/:number',
    element: <Question />,
  },
])
