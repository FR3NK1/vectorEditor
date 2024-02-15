import { Group, Text } from '@mantine/core'
import ChangeSizePopover from '../../features/Functions/ui/ChangeSizePopover'
import classes from './Header.module.css'

const Header = () => {
  return (
    <Group justify='space-between' className={classes.header}>
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
      <Text size='xl' fw={900} c='black'>
        Save
      </Text>
    </Group>
  )
}

export default Header
