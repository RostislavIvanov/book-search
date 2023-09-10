export interface IBook {
    totalItems: number
    items: IBookItem[]
}
export interface IBookItem  {
    id: string
    etag: string
    searchInfo: ISearchInfo
    volumeInfo: IVolumeInfo
}

interface ISearchInfo {
    textSnippet: string
}


interface IVolumeInfo {
    title: string
    subtitle?: string
    authors: string[]
    categories: string[]
    description?: string
    imageLinks?: IImageLinks
    publishedDate: string
    previewLink?: string
}
interface IImageLinks {
    thumbnail?: string
    smallThumbnail?: string
    small?: string
    medium?: string
    large?: string
    extraLarge?: string
}