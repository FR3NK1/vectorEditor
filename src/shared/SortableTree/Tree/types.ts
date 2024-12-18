import type { UniqueIdentifier } from '@dnd-kit/core'
import type { MutableRefObject } from 'react'

export interface TreeItem {
  id: UniqueIdentifier
  children: TreeItem[]
  collapsed?: boolean
  type: 'folder' | 'file'
}

export type TreeItems = TreeItem[]

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null
  depth: number
  index: number
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[]
  offset: number
}>
