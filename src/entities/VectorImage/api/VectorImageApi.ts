import { VectorImageService } from '../../../app/services/VectorImageService'
import { IVectorImages } from '../model/IVectorImages'

const VectorImageApi = VectorImageService.injectEndpoints({
  endpoints: (build) => ({
    getAllVectorImages: build.query<IVectorImages, { name: string; page: number }>({
      query: (data) => ({
        url: '/vector-image',
        params: data,
      }),
    }),
    getVectorImageById: build.query<any, number>({
      query: (data) => ({
        url: `/vector-image/${data}`,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
})

export const { useGetAllVectorImagesQuery, useLazyGetAllVectorImagesQuery, useLazyGetVectorImageByIdQuery } = VectorImageApi
