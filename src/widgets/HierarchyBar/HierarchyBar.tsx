import { Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks/hooks'
import SortableHierarchy from '../../features/SortableHierarchy/SortableHierarchy'
import classes from './HierarchyBar.module.css'

const HierarchyBar = () => {
  const canvasObjects = useAppSelector((state) => state.canvas.canvasObjects)
  const [isRender, setIsRender] = useState(true)
  useEffect(() => {
    console.log(canvasObjects)
    setIsRender(false)
  }, [canvasObjects])

  useEffect(() => {
    if (!isRender) {
      setIsRender(true)
    }
  }, [isRender])
  return (
    <Stack className={classes.hierarchyBar}>
      {canvasObjects.length > 0 && isRender && <SortableHierarchy canvasObjects={canvasObjects} />}
    </Stack>
  )
}

export default HierarchyBar
