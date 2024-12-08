import { ShapeService } from '../../../app/services/ShapeService'
import { IShape } from '../model/IShape'

const ShapeApi = ShapeService.injectEndpoints({
  endpoints: (build) => ({
    getShapesByUserId: build.query<IShape[], number>({
      query: (userId) => ({
        url: `/shapes/user/${userId}`,
      }),
      providesTags: ['Shape'],
    }),
    deleteShape: build.mutation<void, number>({
      query(shapeId) {
        return {
          url: `shapes/${shapeId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Shape'],
    }),
  }),
})

export const { useGetShapesByUserIdQuery, useDeleteShapeMutation } = ShapeApi
