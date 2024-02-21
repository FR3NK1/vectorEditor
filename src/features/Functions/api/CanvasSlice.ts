import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FlattenedItem } from '../../../shared/SortableTree/Tree/types'
import { canvasManager } from './CanvasManager'

export interface ICanvasObject {
  id: number
  type: string
}

export interface CanvasState {
  canvasObjects: FlattenedItem[]
}

const initialState: CanvasState = {
  canvasObjects: [],
}

export const CanvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    addNewGroup: (state) => {
      const counter =
        state.canvasObjects.filter((item) => {
          const itemType = String(item.id).split(' ')[0]
          return itemType === 'Group'
        }).length + 1
      const newGroup: FlattenedItem = {
        children: [],
        depth: 0,
        id: 'Group ' + counter,
        index: 0,
        parentId: null,
        type: 'folder',
        collapsed: false,
      }
      state.canvasObjects = [newGroup, ...state.canvasObjects]
    },
    addCanvasObject: (state, action: PayloadAction<FlattenedItem>) => {
      state.canvasObjects = [action.payload, ...state.canvasObjects]
    },
    setCanvasObjects: (state, action: PayloadAction<FlattenedItem[]>) => {
      const oldArray = state.canvasObjects.filter((item) => item.type === 'file').reverse()
      const newArray = action.payload.filter((item) => item.type === 'file').reverse()

      newArray.forEach((item, index) => {
        if (newArray[index] != oldArray[index]) {
          canvasManager.moveTo(item.id, index)
        }
      })
      state.canvasObjects = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCanvasObject, setCanvasObjects, addNewGroup } = CanvasSlice.actions

export const canvasReducer = CanvasSlice.reducer
