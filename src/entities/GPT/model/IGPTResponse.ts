export interface IGPTResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Choice[]
  usage: Usage
  system_fingerprint: string
}

interface Choice {
  index: number
  message: Message
  logprobs: null | unknown
  finish_reason: string
}

interface Message {
  role: string
  content: string
}

interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}
