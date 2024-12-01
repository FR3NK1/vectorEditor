import { UserService } from '../../../app/services/UserService'
import { ILoginUser } from '../model/ILoginUser'
import { IRegisterUser } from '../model/IRegisterUser'

const UserApi = UserService.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<{ id: number; name: string }, ILoginUser>({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: build.mutation<{ id: number; name: string }, IRegisterUser>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = UserApi
