import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const GenerateImageService = createApi({
  reducerPath: 'GenerateImageService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7860/' }),
  endpoints: () => ({}),
})
