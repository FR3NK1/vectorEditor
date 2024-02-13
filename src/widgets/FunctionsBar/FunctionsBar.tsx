import { ActionIcon, Stack } from '@mantine/core'
import { IconIcons, IconShape, IconTextSize } from '@tabler/icons-react'
import classes from './FunctionsBar.module.css'
const FunctionsBar = () => {
  return (
    <Stack className={classes.functionsBar} align='center' justify='flex-start'>
      <ActionIcon variant='light' color='orange' aria-label='Text' size='xl'>
        <IconTextSize />
      </ActionIcon>
      <ActionIcon variant='light' color='orange' aria-label='Shape' size='xl'>
        <IconShape />
      </ActionIcon>
      <ActionIcon variant='light' color='orange' aria-label='Icons' size='xl'>
        <IconIcons />
      </ActionIcon>
    </Stack>
  )
}

export default FunctionsBar
