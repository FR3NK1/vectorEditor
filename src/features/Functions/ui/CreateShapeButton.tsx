import { ActionIcon, Drawer, Grid, Group, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShape, IconTrash } from '@tabler/icons-react'
import { store } from '../../../app/store/store'
import {
  useDeleteShapeMutation,
  useGetShapesByUserIdQuery,
} from '../../../entities/Shape/api/ShapeApi'
import ShapeActionIcon from '../../../shared/ShapeActionIcon'
import { canvasManager } from '../api/CanvasManager'

const CreateShapeButton = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { data: shapesData } = useGetShapesByUserIdQuery(store.getState().User.userId!)
  const [deleteShape] = useDeleteShapeMutation()

  return (
    <>
      <Drawer opened={opened} onClose={close} title='Добавить фигуру'>
        <Grid>
          <Grid.Col span={4}>
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
          <Grid.Col span={4}>
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
          <Grid.Col span={4}>
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
          {shapesData &&
            shapesData.map((shape) => (
              <Grid.Col span={4} key={shape.id}>
                <Group justify='flex-end'>
                  <ActionIcon
                    variant='subtle'
                    color='red'
                    size={'xs'}
                    style={{ position: 'absolute' }}
                    onClick={() => deleteShape(shape.id)}
                  >
                    <IconTrash size={'xs'} />
                  </ActionIcon>
                </Group>
                <ShapeActionIcon shape={shape} onClick={() => canvasManager.addShape(shape)} />
              </Grid.Col>
            ))}
          <Grid.Col span={4}>
            <UnstyledButton
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                border: '3px solid orange',
                borderRadius: '10px',
              }}
              onClick={() => {
                canvasManager.startDrawShape()
                close()
              }}
            >
              <Text size='xl' fw={700} ta='center' c={'orange'}>
                Добавить фигуру
              </Text>
            </UnstyledButton>
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
