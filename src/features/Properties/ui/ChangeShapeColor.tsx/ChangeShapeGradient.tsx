import { ActionIcon, Button, ColorPicker, Group, Popover, Stack, Text } from '@mantine/core'
import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconPlus,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import DeleteIndicator from '../../../../shared/DeleteIndicator'
import { canvasManager } from '../../../Functions/api/CanvasManager'

export type GradientColor = {
  offset: number
  color: string
}

export type GradientCoordinates = {
  x1: number
  y1: number
  x2: number
  y2: number
}

const ChangeShapeGradient = () => {
  const [gradientColors, setGradientColors] = useState<GradientColor[]>([
    {
      offset: 0,
      color: 'white',
    },
    {
      offset: 1,
      color: 'white',
    },
  ])
  const [gradientCoordinates, setGradientCoordinates] = useState<GradientCoordinates>({
    x1: 1,
    x2: 0,
    y1: 0,
    y2: 0,
  })

  useEffect(() => {
    canvasManager.changeSelectionGradient(gradientColors, gradientCoordinates)
  }, [gradientColors, gradientCoordinates])
  return (
    <Stack>
      <Group>
        <Stack gap={5}>
          <Text fw={500}>Цвета градиента</Text>
          <Group>
            {gradientColors.map((item, index) => (
              <Popover key={item.offset} trapFocus position='bottom' withArrow shadow='md'>
                <Popover.Target>
                  <Button
                    onClick={() => {
                      setGradientColors(
                        gradientColors.map((item, i) =>
                          i === index ? { ...item, color: 'white' } : item,
                        ),
                      )
                    }}
                    color={item.color}
                    style={{ border: '1px solid lightgray', overflow: 'visible' }}
                  >
                    <DeleteIndicator
                      size={15}
                      action={() => {
                        const gradientCount = gradientColors.length
                        if (gradientCount > 2) {
                          const newGradientColors = gradientColors.filter(
                            (color) => color.offset !== item.offset,
                          )
                          newGradientColors.forEach((item, index) => {
                            item.offset = index / (gradientCount - 2)
                          })
                          setGradientColors(newGradientColors)
                        }
                      }}
                    />
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <ColorPicker
                    format='rgba'
                    fullWidth
                    swatches={[
                      '#2e2e2e',
                      '#868e96',
                      '#fa5252',
                      '#e64980',
                      '#be4bdb',
                      '#7950f2',
                      '#4c6ef5',
                      '#228be6',
                      '#15aabf',
                      '#12b886',
                      '#40c057',
                      '#82c91e',
                      '#fab005',
                      '#fd7e14',
                    ]}
                    onChange={(value) =>
                      setGradientColors(
                        gradientColors.map((item, i) =>
                          i === index ? { ...item, color: value } : item,
                        ),
                      )
                    }
                  />
                </Popover.Dropdown>
              </Popover>
            ))}
            <ActionIcon
              variant='filled'
              color='orange'
              onClick={() => {
                const gradientCount = gradientColors.length
                const newGradientColors = gradientColors.concat([
                  {
                    offset: 1,
                    color: 'white',
                  },
                ])
                newGradientColors.forEach((item, index) => {
                  item.offset = index / gradientCount
                })
                setGradientColors(newGradientColors)
              }}
              size='lg'
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
      <Group>
        <Stack gap={5}>
          <Text fw={500}>Стиль</Text>
          <Group>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 360 }}
              onClick={() => {
                setGradientCoordinates({ x1: 0, x2: 0, y1: 0, y2: 1 })
              }}
              size='lg'
            >
              <IconArrowDown color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 180 }}
              onClick={() => {
                setGradientCoordinates({ x1: 0, x2: 0, y1: 1, y2: 0 })
              }}
              size='lg'
            >
              <IconArrowUp color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 270 }}
              onClick={() => {
                setGradientCoordinates({ x1: 0, x2: 1, y1: 0, y2: 0 })
              }}
              size='lg'
            >
              <IconArrowRight color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 90 }}
              onClick={() => {
                setGradientCoordinates({ x1: 1, x2: 0, y1: 0, y2: 0 })
              }}
              size='lg'
            >
              <IconArrowLeft color='black' />
            </ActionIcon>
          </Group>
          <Group>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 135 }}
              onClick={() => {
                setGradientCoordinates({ x1: 1, x2: 0, y1: 1, y2: 0 })
              }}
              size='lg'
            >
              <IconArrowUpLeft color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 225 }}
              onClick={() => {
                setGradientCoordinates({ x1: 0, x2: 1, y1: 1, y2: 0 })
              }}
              size='lg'
            >
              <IconArrowUpRight color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 315 }}
              onClick={() => {
                setGradientCoordinates({ x1: 0, x2: 1, y1: 0, y2: 1 })
              }}
              size='lg'
            >
              <IconArrowDownRight color='black' />
            </ActionIcon>
            <ActionIcon
              variant='gradient'
              gradient={{ from: 'white', to: 'rgba(240, 124, 0, 1)', deg: 45 }}
              onClick={() => {
                setGradientCoordinates({ x1: 1, x2: 0, y1: 0, y2: 1 })
              }}
              size='lg'
            >
              <IconArrowDownLeft color='black' />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Stack>
  )
}

export default ChangeShapeGradient
