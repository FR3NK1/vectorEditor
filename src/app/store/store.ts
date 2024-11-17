import { configureStore } from '@reduxjs/toolkit'
import { CanvasReducer } from '../../entities/Canvas/api/CanvasSlice'
import { GoogleFontsService } from '../services/GoogleFontsService'
import { GPTService } from '../services/GPTService'
import { VectorImageService } from '../services/VectorImageService'

export const store = configureStore({
  reducer: {
    [VectorImageService.reducerPath]: VectorImageService.reducer,
    [GPTService.reducerPath]: GPTService.reducer,
    [GoogleFontsService.reducerPath]: GoogleFontsService.reducer,
    Canvas: CanvasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(VectorImageService.middleware)
      .concat(GPTService.middleware)
      .concat(GoogleFontsService.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
