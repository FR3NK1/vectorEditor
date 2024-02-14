import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface CanvasState {
  size: Record<'width' | 'height', number>
}

const initialState: CanvasState = {
  size: { width: 1000, height: 600 },
}

export const CanvasSlice = createSlice({
  name: 'Canvas',
  initialState,
  reducers: {
    changeCanvasSize: (state, action: PayloadAction<Record<'width' | 'height', number>>) => {
      state.size = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeCanvasSize } = CanvasSlice.actions

export const canvasReducer = CanvasSlice.reducer
