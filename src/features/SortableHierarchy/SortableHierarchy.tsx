import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import _ from 'lodash'
import { useState } from 'react'
import { store } from '../../app/store/store'
import { canvasManager } from '../Functions/api/CanvasManager'
import { ICanvasObject, movingItems } from '../Functions/api/CanvasSlice'
import SortableHierarchyItem from './SortableHierarchyItem'

interface SortableHierarchyProps {
  canvasObjects: ICanvasObject[]
}

const SortableHierarchy = ({ canvasObjects }: SortableHierarchyProps) => {
  const [items, setItems] = useState(canvasObjects)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = _.findIndex(items, ['id', active.id])
        const newIndex = _.findIndex(items, ['id', over.id])
        canvasManager.moveTo(active.id, newIndex)
        const movingArray = arrayMove(items, oldIndex, newIndex)
        store.dispatch(movingItems(movingArray))
        return movingArray
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableHierarchyItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default SortableHierarchy
