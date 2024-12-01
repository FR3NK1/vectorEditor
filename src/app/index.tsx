import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { Routing } from '../pages'
import AuthorizationPage from '../pages/AuthorizationPage'
import Header from '../widgets/Header/Header'
import { useAppSelector } from './hooks/hooks'
import './styles/style.css'

const App = () => {
  const userInfo = useAppSelector((state) => state.User)

  return (
    <div className='app'>
      <MantineProvider>
        <Notifications />
        {userInfo?.userId ? (
          <>
            <Header />
            <Routing />
          </>
        ) : (
          <AuthorizationPage />
        )}
      </MantineProvider>
    </div>
  )
}

export default App
