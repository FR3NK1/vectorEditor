import { useAppSelector } from '../../app/hooks/hooks'
import SortableHierarchy from '../../features/SortableHierarchy/SortableHierarchy'
import classes from './HierarchyBar.module.css'

const HierarchyBar = () => {
  const canvasObjects = useAppSelector((state) => state.canvas.canvasObjects)

  return (
    <div className={classes.hierarchyBar}>
      <SortableHierarchy canvasObjects={canvasObjects} />
    </div>
  )
}

export default HierarchyBar
