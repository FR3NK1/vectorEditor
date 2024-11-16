import { Stack } from '@mantine/core'
import ChangeShapeColor from '../../features/Properties/ui/ChangeShapeColor.tsx/ChangeShapeColor'
import GroupChanger from '../../features/Properties/ui/GroupChanger/GroupChanger'
import classes from './PropertiesBar.module.css'

const PropertiesBar = () => {
  return (
    <Stack className={classes.propertiesBar}>
      <GroupChanger />
      <ChangeShapeColor />
    </Stack>
  )
}

export default PropertiesBar
