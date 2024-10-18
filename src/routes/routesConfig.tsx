import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/app/App'
import { Question } from '@/components/question'
import { Result } from '@/components/result'
import { HomePage } from '@/components/homePage'

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
    ],
  },
])
