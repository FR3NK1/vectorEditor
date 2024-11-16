import { configureStore } from '@reduxjs/toolkit'
import { VectorImageService } from '../services/VectorImageService'

export const store = configureStore({
  reducer: {
    [VectorImageService.reducerPath]: VectorImageService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(VectorImageService.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
