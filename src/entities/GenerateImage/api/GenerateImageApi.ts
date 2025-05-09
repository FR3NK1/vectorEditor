import { GenerateImageService } from '../../../app/services/GenerateImageService'
import { IGenerateImageResponse } from '../model/IGenerateImageResponse'

const GenerateImageApi = GenerateImageService.injectEndpoints({
  endpoints: (build) => ({
    getImagesByPrompt: build.mutation<IGenerateImageResponse, string>({
      query: (prompt) => ({
        url: '/sdapi/v1/txt2img',
        method: 'POST',
        body: {
          prompt: prompt,
          sampler_name: 'Euler',
          scheduler: 'Simple',
          steps: 20,
          cfg_scale: 1,
          distilled_cfg_scale: 3.5,
          width: 512,
          height: 512,
        },
      }),
    }),
  }),
})

export const { useGetImagesByPromptMutation } = GenerateImageApi
