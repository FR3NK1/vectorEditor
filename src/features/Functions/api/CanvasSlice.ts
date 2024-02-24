import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, current } from '@reduxjs/toolkit'
import _ from 'lodash'
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
    selectCanvasObjects: (
      state,
      action: PayloadAction<{ isShiftKeyDown: boolean; selectedArray: string[] }>,
    ) => {
      const canvasObjects = current(state.canvasObjects)
      const selectedArray = action.payload.selectedArray
      const selectedIds: string[] = []

      if (action.payload.isShiftKeyDown) {
        const firstIndex = _.findIndex(canvasObjects, ['id', selectedArray[0]])
        const secondIndex = _.findIndex(canvasObjects, [
          'id',
          selectedArray[selectedArray.length - 1],
        ])
        if (firstIndex <= secondIndex) {
          canvasObjects
            .filter((_item, index) => index >= firstIndex && index <= secondIndex)
            .forEach((item) => {
              if (item.id.split(' ')[0] === 'Group') {
                item.children.forEach((child) => {
                  selectedIds.push(child.id)
                })
              } else {
                selectedIds.push(item.id)
              }
            })
        } else {
          canvasObjects
            .filter((_item, index) => index <= firstIndex && index >= secondIndex)
            .forEach((item) => {
              if (item.id.split(' ')[0] === 'Group') {
                item.children.forEach((child) => {
                  selectedIds.push(child.id)
                })
              } else {
                selectedIds.push(item.id)
              }
            })
        }
      } else {
        canvasObjects
          .filter((item) => selectedArray.includes(item.id))
          .forEach((item) => {
            if (item.id.split(' ')[0] === 'Group') {
              item.children.forEach((child) => {
                selectedIds.push(child.id)
              })
            } else {
              selectedIds.push(item.id)
            }
          })
      }
      canvasManager.selectObjects([...new Set(selectedIds)])
    },
    deleteCanvasObject: (state, action: PayloadAction<string>) => {
      // clear objects
      let canvasObjects = current(state.canvasObjects).filter((item) => item.id !== action.payload)
      // clear groups
      let isClear = false
      while (!isClear) {
        // clear childers
        canvasObjects = canvasObjects.map((item) => {
          return {
            ...item,
            children: item.children.filter(
              (childrenItem) => !!_.find(canvasObjects, ['id', childrenItem.id]),
            ),
          }
        })
        // clear groups
        if (
          !!_.find(
            canvasObjects,
            (item) => item.children.length === 0 && item.id.split(' ')[0] === 'Group',
          )
        ) {
          canvasObjects = canvasObjects.filter(
            (item) => item.children.length !== 0 || item.id.split(' ')[0] !== 'Group',
          )
        } else {
          isClear = true
        }
      }
      state.canvasObjects = canvasObjects
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addCanvasObject,
  setCanvasObjects,
  addNewGroup,
  selectCanvasObjects,
  deleteCanvasObject,
} = CanvasSlice.actions

export const canvasReducer = CanvasSlice.reducer
