import { ActionIcon, Group } from '@mantine/core'
import { IconRowInsertTop } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { store } from '../../app/store/store'
import { SortableTree } from '../../shared/SortableTree/Tree/SortableTree'
import { FlattenedItem, TreeItems } from '../../shared/SortableTree/Tree/types'
import { buildTree, flattenTree } from '../../shared/SortableTree/Tree/utilities'
import { addNewGroup, setCanvasObjects } from '../Functions/api/CanvasSlice'

interface SortableHierarchyProps {
  canvasObjects: FlattenedItem[]
}

const SortableHierarchy = ({ canvasObjects }: SortableHierarchyProps) => {
  const [treeItems, setTreeItems] = useState<TreeItems>([])

  const [isRender, setIsRender] = useState(true)
  useEffect(() => {
    setIsRender(false)
  }, [canvasObjects])

  useEffect(() => {
    if (!isRender) {
      setIsRender(true)
    }
  }, [isRender])

  useEffect(() => {
    store.dispatch(setCanvasObjects(flattenTree(treeItems)))
  }, [treeItems])
  return (
    <>
      {canvasObjects.length > 0 && isRender && (
        <SortableTree
          sortableItems={buildTree(canvasObjects)}
          setSortableItems={setTreeItems}
          collapsible
          indicator
        />
      )}
      <Group pos='fixed' right={10} bottom={10}>
        <ActionIcon
          size='lg'
          variant='light'
          color='gray'
          onClick={() => store.dispatch(addNewGroup())}
        >
          <IconRowInsertTop />
        </ActionIcon>
      </Group>
    </>
  )
}

export default SortableHierarchy
