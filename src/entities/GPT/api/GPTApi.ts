import { GPTService } from '../../../app/services/GPTService'
import { IGPTResponse } from '../model/IGPTResponse'
import { IMatchColorsToBrend } from '../model/IMatchColorsToBrend'

const GPTApi = GPTService.injectEndpoints({
  endpoints: (build) => ({
    matchColorsToBrend: build.mutation<
      {
        fromColor: string
        toColor: string
      }[],
      IMatchColorsToBrend
    >({
      query(data) {
        return {
          url: `/v1/chat/completions`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            model: 'qwen2.5-coder-14b-instruct',
            messages: [
              {
                role: 'user',
                content: `You are an assistant that only speaks JSON. Do not write normal text.
                            Convert the following colors ${JSON.stringify(
                              data.imageColors,
                            )}, so that they match the brand colors ${JSON.stringify(
                  data.brendImages,
                )}. Shades of brand colors are allowed.

                        Provide the answer as json, which will consist of an array of objects {fromColor, toColor}. Where fromColor is the color from the provided array, toColor is the color that needs to be used to match the brand book.`,
              },
            ],
            temperature: 0.7,
            max_tokens: -1,
            stream: false,
          },
        }
      },
      transformResponse: (response) => {
        const gptReponse = response as IGPTResponse
        const content = gptReponse.choices[0].message.content
          .replace('```json', '')
          .replace('```', '')
        return JSON.parse(content)
      },
    }),
  }),
})

export const { useMatchColorsToBrendMutation } = GPTApi
