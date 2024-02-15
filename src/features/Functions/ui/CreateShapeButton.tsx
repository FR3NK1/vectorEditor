import { ActionIcon, Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShape } from '@tabler/icons-react'
import { canvasManager } from '../api/CanvasManager'

const CreateShapeButton = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer opened={opened} onClose={close} title='Добавить фигуру'>
        <Button onClick={() => canvasManager.addRect()}>Добавить квадрат</Button>
        <Button onClick={() => canvasManager.addCircle()}>Добавить круг</Button>
      </Drawer>
      <ActionIcon variant='light' color='orange' aria-label='Shape' size='xl' onClick={open}>
        <IconShape />
      </ActionIcon>
    </>
  )
}

export default CreateShapeButton
