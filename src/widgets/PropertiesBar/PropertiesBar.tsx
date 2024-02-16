import { Stack } from '@mantine/core'
import ChangeShapeColor from '../../features/Properties/ui/ChangeShapeColor.tsx/ChangeShapeColor'
import classes from './PropertiesBar.module.css'

const PropertiesBar = () => {
  return (
    <Stack className={classes.propertiesBar}>
      <ChangeShapeColor />
    </Stack>
  )
}

export default PropertiesBar
