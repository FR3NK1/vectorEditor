import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'

export const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  )
}
