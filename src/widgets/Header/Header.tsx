import { Group, Text } from '@mantine/core'
import ChangeSizePopover from '../../features/Functions/ui/ChangeSizePopover'
import ExportToSvgButton from '../../features/Functions/ui/ExportToSvgButton'
import classes from './Header.module.css'

const Header = () => {
  return (
    <Group id='Header' justify='space-between' className={classes.header}>
      <Group>
        <Text
          size='xl'
          fw={900}
          variant='gradient'
          gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
        >
          VectorEditor
        </Text>
        <ChangeSizePopover />
      </Group>
      <ExportToSvgButton />
    </Group>
  )
}

export default Header
