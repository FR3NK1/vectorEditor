import { configureStore } from '@reduxjs/toolkit'
import { CanvasReducer } from '../../entities/Canvas/api/CanvasSlice'
import { UserReducer } from '../../entities/User/api/UserSlice'
import { GoogleFontsService } from '../services/GoogleFontsService'
import { GPTService } from '../services/GPTService'
import { UserService } from '../services/UserService'
import { VectorImageService } from '../services/VectorImageService'

const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action)
    localStorage.setItem('UserState', '{"User":' + JSON.stringify(getState().User) + '}')
    return result
  }
}

const reHydrateStore = () => {
  let reHydrateObject = {}
  if (localStorage.getItem('UserState') !== null) {
    reHydrateObject = {
      ...reHydrateObject,
      ...JSON.parse(String(localStorage.getItem('UserState'))),
    }
  }
  return reHydrateObject
}

export const store = configureStore({
  reducer: {
    [VectorImageService.reducerPath]: VectorImageService.reducer,
    [GPTService.reducerPath]: GPTService.reducer,
    [GoogleFontsService.reducerPath]: GoogleFontsService.reducer,
    [UserService.reducerPath]: UserService.reducer,
    User: UserReducer,
    Canvas: CanvasReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(VectorImageService.middleware)
      .concat(GPTService.middleware)
      .concat(UserService.middleware)
      .concat(GoogleFontsService.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
