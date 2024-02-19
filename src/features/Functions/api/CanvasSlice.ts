import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ICanvasObject {
  id: number
  type: string
}

export interface CanvasState {
  canvasObjects: ICanvasObject[]
}

const initialState: CanvasState = {
  canvasObjects: [],
}

export const CanvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    addCanvasObject: (state, action: PayloadAction<ICanvasObject>) => {
      state.canvasObjects = [...state.canvasObjects, action.payload]
    },
    deleteCanvasObjectById: (state, action: PayloadAction<number>) => {
      state.canvasObjects = state.canvasObjects.filter((item) => item.id !== action.payload)
    },
    movingItems: (state, action: PayloadAction<ICanvasObject[]>) => {
      state.canvasObjects = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCanvasObject, deleteCanvasObjectById, movingItems } = CanvasSlice.actions

export const canvasReducer = CanvasSlice.reducer
