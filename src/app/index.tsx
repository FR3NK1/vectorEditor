import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Routing } from '../pages'
import './styles/style.css'

const App = () => {
  return (
    <div className='app'>
      <MantineProvider>
        <Routing />
      </MantineProvider>
    </div>
  )
}

export default App
