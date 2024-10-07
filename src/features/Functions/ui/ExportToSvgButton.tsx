import { Button, Popover, Stack, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { canvasManager } from '../api/CanvasManager'

const ExportToSvgButton = () => {
  const [value, setValue] = useState('')

  return (
    <Popover width={300} trapFocus position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button variant='transparent'>
          <Text size='xl' fw={900} c='black' style={{ cursor: 'pointer' }}>
            Сохранить
          </Text>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <TextInput
            placeholder='Название файла'
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Button
            onClick={() => {
              if (value !== '') canvasManager.exportToSvg(value)
            }}
          >
            Сохранить
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ExportToSvgButton
