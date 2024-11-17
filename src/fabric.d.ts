import 'fabric'

declare module 'fabric' {
  namespace fabric {
    interface Object {
      fontFamily: string
      data?: {
        objectType?: string
      }
    }
  }
}
