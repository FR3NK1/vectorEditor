import { ActionIcon, Stack } from '@mantine/core'
import { IconTextSize } from '@tabler/icons-react'
import CreateShapeButton from '../../features/Functions/ui/CreateShapeButton'
import VectorImagesButton from '../../features/Functions/ui/VectorImagesButton'
import classes from './FunctionsBar.module.css'
const FunctionsBar = () => {
  return (
    <Stack className={classes.functionsBar} align='center' justify='flex-start' gap='xs'>
      <ActionIcon variant='light' color='orange' aria-label='Text' size='xl'>
        <IconTextSize />
      </ActionIcon>
      <CreateShapeButton />
      <VectorImagesButton />
    </Stack>
  )
}

export default FunctionsBar
