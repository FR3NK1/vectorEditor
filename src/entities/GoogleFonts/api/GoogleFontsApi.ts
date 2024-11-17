import { GoogleFontsService } from '../../../app/services/GoogleFontsService'
import { IGoogleFonts } from '../model/IGoogleFonts'

const GoogleFontsApi = GoogleFontsService.injectEndpoints({
  endpoints: (build) => ({
    getGoogleFontsList: build.query<IGoogleFonts, void>({
      query: () => ({
        url: '/google-fonts',
      }),
    }),
  }),
})

export const { useGetGoogleFontsListQuery } = GoogleFontsApi
