import { ActionIcon, Drawer, Grid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShape } from '@tabler/icons-react'
import { canvasManager } from '../api/CanvasManager'

const CreateShapeButton = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer opened={opened} onClose={close} title='Добавить фигуру'>
        <Grid>
          <Grid.Col span={6}>
            <ActionIcon
              variant='transparent'
              color='orange'
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: 'orange',
              }}
              onClick={() => canvasManager.addRect()}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ActionIcon
              variant='transparent'
              color='orange'
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: 'orange',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
              onClick={() => canvasManager.addTriangle()}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ActionIcon
              variant='transparent'
              color='orange'
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: 'orange',
                clipPath: 'circle(50% at 50% 50%)',
              }}
              onClick={() => canvasManager.addCircle()}
            />
          </Grid.Col>
        </Grid>
      </Drawer>
      <ActionIcon variant='light' color='orange' aria-label='Shape' size='xl' onClick={open}>
        <IconShape />
      </ActionIcon>
    </>
  )
}

export default CreateShapeButton
