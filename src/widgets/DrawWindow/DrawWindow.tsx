import { Center } from '@mantine/core'
import { useEffect } from 'react'
import { canvasManager } from '../../features/Functions/api/CanvasManager'
import classes from './DrawWindow.module.css'

const DrawWindow = () => {
  useEffect(() => {
    canvasManager.setCanvas()
  }, [])

  return (
    <div className={classes.drawWindow}>
      <Center h='100%'>
        <canvas id='canvas' />
      </Center>
    </div>
  )
}

export default DrawWindow
