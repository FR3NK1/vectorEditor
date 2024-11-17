import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const GPTService = createApi({
  reducerPath: 'GPTService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:1234/' }),
  endpoints: () => ({}),
})
