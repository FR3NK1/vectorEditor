export interface IVectorImagesItems {
  id: number
  name: string
  preview: {
    width: number
    height: number
    url: string
  }
}
export interface IVectorImages {
  pagination: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
  }
  items: IVectorImagesItems[]
}
