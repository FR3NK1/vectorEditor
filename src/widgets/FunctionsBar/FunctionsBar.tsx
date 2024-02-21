import { ActionIcon, Stack } from '@mantine/core'
import { IconIcons, IconTextSize } from '@tabler/icons-react'
import CreateShapeButton from '../../features/Functions/ui/CreateShapeButton'
import classes from './FunctionsBar.module.css'
const FunctionsBar = () => {
  return (
    <Stack className={classes.functionsBar} align='center' justify='flex-start' gap='xs'>
      <ActionIcon variant='light' color='orange' aria-label='Text' size='xl'>
        <IconTextSize />
      </ActionIcon>
      <CreateShapeButton />
      <ActionIcon variant='light' color='orange' aria-label='Icons' size='xl'>
        <IconIcons />
      </ActionIcon>
    </Stack>
  )
}

export default FunctionsBar
