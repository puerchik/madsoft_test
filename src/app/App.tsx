import { Outlet } from 'react-router-dom'

import '@/styles/index.scss'

export const App = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}
