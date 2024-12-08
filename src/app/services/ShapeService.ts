import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ShapeService = createApi({
  reducerPath: 'ShapeService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: () => ({}),
  tagTypes: ['Shape'],
})
