import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@mantine/core'
import { ICanvasObject } from '../Functions/api/CanvasSlice'

interface SortableHierarchyItemProps {
  item: ICanvasObject
}

const SortableHierarchyItem = ({ item }: SortableHierarchyItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        shadow='sm'
        style={{ cursor: 'grab', backgroundColor: 'var(--mantine-color-orange-1)' }}
      >
        {item.type + ' ' + item.id}
      </Card>
    </div>
  )
}

export default SortableHierarchyItem
