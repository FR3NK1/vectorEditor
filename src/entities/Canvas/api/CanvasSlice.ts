import { createSlice } from '@reduxjs/toolkit'

export interface ICanvasSlice {
  activeObjects: string[]
  shapeDrawingEnable: boolean
}

const initialState: ICanvasSlice = {
  activeObjects: [],
  shapeDrawingEnable: false,
}

const CanvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    setActiveObject(state, action) {
      state.activeObjects = action.payload
    },
    setShapeDrawingEnable(state, action) {
      state.shapeDrawingEnable = action.payload
    },
  },
})

export const CanvasSliceActions = CanvasSlice.actions

export const CanvasReducer = CanvasSlice.reducer
