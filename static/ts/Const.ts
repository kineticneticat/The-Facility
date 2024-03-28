export type RoomSubset = [
    [string, string, string, string, string],
    [string, string, string, string, string],
    [string, string, string, string, string],
    [string, string, string, string, string],
    [string, string, string, string, string]
]
export interface IAsset {
    loaded: boolean,
    file: string,
    data: any 
}
export interface IAssetMap {
    [name:string]: IAsset
}
export interface RoomJSONData {
    "layout": string[][]
}
export type Corners = "000" | "100" | "001" | "010" | "101" | "110" | "011" | "111" 
export interface TileJSONData {
    "name": string,
    "corners": {
        "000": [number, number, number],
        "100": [number, number, number],
        "001": [number, number, number],
        "010": [number, number, number],
        "101": [number, number, number],
        "110": [number, number, number],
        "011": [number, number, number],
        "111": [number, number, number]
    },
    "texture": string
}
export interface ImageData {
    img: HTMLImageElement
}
export const gridDim = 5