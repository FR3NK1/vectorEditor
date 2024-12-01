import { Group, Text } from '@mantine/core'
import LogoutButton from '../../features/Authorization/LogoutButton'
import ChangeSizePopover from '../../features/Functions/ui/ChangeSizePopover'
import ExportToSvgButton from '../../features/Functions/ui/ExportToSvgButton'
import ImportFromSvgButton from '../../features/Functions/ui/ImportFromSvgButton'
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
      <Group>
        <ImportFromSvgButton />
        <ExportToSvgButton />
        <LogoutButton />
      </Group>
    </Group>
  )
}

export default Header
