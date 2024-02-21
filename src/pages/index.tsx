import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'

export const Routing = () => {
  const rootSize = document.getElementById('root')?.getBoundingClientRect().height

  return (
    <div style={{ height: rootSize ? `${rootSize - 60}px` : '100vh' }}>
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  )
}
