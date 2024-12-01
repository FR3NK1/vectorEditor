import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserService = createApi({
  reducerPath: 'UserService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: () => ({}),
})
