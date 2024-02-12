import { MantineProvider } from '@mantine/core'
import { Routing } from '../pages'

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
