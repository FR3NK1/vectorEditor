import { ActionIcon, Button, Popover, Stack, TextInput } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useState } from 'react'
import { canvasManager } from '../api/CanvasManager'

const ExportToSvgButton = () => {
  const [value, setValue] = useState('')

  return (
    <Popover width={300} trapFocus position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <ActionIcon variant='transparent' color='orange'>
          <IconDownload />
        </ActionIcon>
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
