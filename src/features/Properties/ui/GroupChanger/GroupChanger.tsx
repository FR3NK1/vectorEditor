import { Button, Group } from '@mantine/core'
import { canvasManager } from '../../../Functions/api/CanvasManager'

const GroupChanger = () => {
  return (
    <Group grow>
      <Button variant='default' onClick={() => canvasManager.groupUngroupedObjects()}>
        Сгруппировать
      </Button>
      <Button variant='default' onClick={() => canvasManager.ungroupActiveObjects()}>
        Разгруппировать
      </Button>
    </Group>
  )
}

export default GroupChanger
