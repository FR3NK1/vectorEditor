import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const VectorImageService = createApi({
  reducerPath: 'VectorImageService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: () => ({}),
})
