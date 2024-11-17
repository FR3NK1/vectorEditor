import { ActionIcon, Button, ColorPicker, Group, Popover, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useMatchColorsToBrendMutation } from '../../../../entities/GPT/api/GPTApi'
import DeleteIndicator from '../../../../shared/DeleteIndicator'
import { canvasManager } from '../../../Functions/api/CanvasManager'

const AIChangeShapeColor = () => {
  const [colorsArray, setColorsArray] = useState<string[]>([])

  const [matchColors, { isLoading }] = useMatchColorsToBrendMutation()

  const matchColorsToBrend = async () => {
    const imageColors = canvasManager.getActiveObjectColors() as string[]
    const newColors = await matchColors({ brendImages: colorsArray, imageColors: imageColors })
    if ('data' in newColors) {
      canvasManager.changeActiveObjectColors(newColors.data)
    }
  }
  return (
    <Stack gap={5}>
      <Text fw={500}>Цвета макета</Text>
      <Group>
        {colorsArray.map((item, index) => (
          <Popover key={index} trapFocus position='bottom' withArrow shadow='md'>
            <Popover.Target>
              <Button color={item} style={{ border: '1px solid lightgray', overflow: 'visible' }}>
                <DeleteIndicator
                  size={15}
                  action={() => {
                    setColorsArray(colorsArray.filter((_, i) => i !== index))
                  }}
                />
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <ColorPicker
                format='hex'
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
                  setColorsArray(colorsArray.map((item, i) => (i === index ? value : item)))
                }
              />
            </Popover.Dropdown>
          </Popover>
        ))}
        <ActionIcon
          variant='filled'
          color='orange'
          onClick={() => setColorsArray((current) => [...current, 'white'])}
          size='lg'
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <Button
        variant='gradient'
        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
        onClick={() => matchColorsToBrend()}
        loading={isLoading}
      >
        Сделать магию
      </Button>
    </Stack>
  )
}

export default AIChangeShapeColor
