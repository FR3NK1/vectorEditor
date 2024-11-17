import { Stack } from '@mantine/core'
import { useAppSelector } from '../../app/hooks/hooks'
import GoogleFontsSelect from '../../entities/GoogleFonts/ui/GoogleFontsSelect'
import ChangeShapeColor from '../../features/Properties/ui/ChangeShapeColor.tsx/ChangeShapeColor'
import GroupChanger from '../../features/Properties/ui/GroupChanger/GroupChanger'
import classes from './PropertiesBar.module.css'

const PropertiesBar = () => {
  const CanvasState = useAppSelector((state) => state.Canvas)

  return (
    <Stack className={classes.propertiesBar}>
      <GroupChanger />
      {CanvasState.activeObjects.includes('Text') && <GoogleFontsSelect />}
      <ChangeShapeColor />
    </Stack>
  )
}

export default PropertiesBar
