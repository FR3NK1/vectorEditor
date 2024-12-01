import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUserSlice {
  userId: number | null
  userName: string | null
}

const initialState: IUserSlice = {
  userId: null,
  userName: null,
}

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ userId: number | null; userName: string | null }>) {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
  },
})

export const UserSliceActions = UserSlice.actions

export const UserReducer = UserSlice.reducer
