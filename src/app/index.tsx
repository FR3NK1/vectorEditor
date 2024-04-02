import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { Routing } from '../pages'
import Header from '../widgets/Header/Header'
import './styles/style.css'

const App = () => {
  return (
    <div className='app'>
      <MantineProvider>
        <Notifications />
        <Header />
        <Routing />
      </MantineProvider>
    </div>
  )
}

export default App
