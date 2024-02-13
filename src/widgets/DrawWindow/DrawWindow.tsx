import { Center } from '@mantine/core'
import Canvas from '../../features/Canvas/Canvas'
import classes from './DrawWindow.module.css'

const DrawWindow = () => {
  return (
    <div className={classes.drawWindow}>
      <Center h='100%'>
        <Canvas />
      </Center>
    </div>
  )
}

export default DrawWindow
