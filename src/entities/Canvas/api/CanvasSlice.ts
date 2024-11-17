import { createSlice } from '@reduxjs/toolkit'

export interface ICanvasSlice {
  activeObjects: string[]
}

const initialState: ICanvasSlice = {
  activeObjects: [],
}

const CanvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    setActiveObject(state, action) {
      state.activeObjects = action.payload
    },
  },
})

export const CanvasSliceActions = CanvasSlice.actions

export const CanvasReducer = CanvasSlice.reducer
