import { ActionIcon } from '@mantine/core'
import { IconTextSize } from '@tabler/icons-react'
import { canvasManager } from '../api/CanvasManager'

const CreateTextButton = () => {
  return (
    <ActionIcon
      variant='light'
      color='orange'
      aria-label='Text'
      size='xl'
      onClick={() => canvasManager.addText()}
    >
      <IconTextSize />
    </ActionIcon>
  )
}

export default CreateTextButton
