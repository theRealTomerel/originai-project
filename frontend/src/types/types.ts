export interface PictureDataType{
    id: string,
    author:string,
    width:number,
    height:number,
    url:string,
    download_url:string
}

export type PicturesDataType = PictureDataType[]

export interface PictureDataDataType{
    id:string
    upvotes:number
    downvotes:number
}

export type PicturesDataDataType = PictureDataDataType[]

export type PictureStats = {
    upvotes:number,
    downvotes:number
}
export interface PictureDataObj{
    [id:number]:PictureStats
}