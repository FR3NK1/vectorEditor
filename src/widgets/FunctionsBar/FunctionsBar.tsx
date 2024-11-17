import { Stack } from '@mantine/core'
import CreateShapeButton from '../../features/Functions/ui/CreateShapeButton'
import CreateTextButton from '../../features/Functions/ui/CreateTextButton'
import VectorImagesButton from '../../features/Functions/ui/VectorImagesButton'
import classes from './FunctionsBar.module.css'
const FunctionsBar = () => {
  return (
    <Stack className={classes.functionsBar} align='center' justify='flex-start' gap='xs'>
      <CreateTextButton />
      <CreateShapeButton />
      <VectorImagesButton />
    </Stack>
  )
}

export default FunctionsBar
