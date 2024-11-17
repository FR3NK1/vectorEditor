import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const GoogleFontsService = createApi({
  reducerPath: 'GoogleFontsService',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: () => ({}),
})
