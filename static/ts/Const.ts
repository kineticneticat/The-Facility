import { Vec2 } from "./Maths"

export type Asset<T> = {
    loaded: boolean,
    file?: string
    data: T
}
export type SimpleMap<V> = {
    [key:string]:V
}
export type RoomJSONData =  {
    layout: string[][][],
    groundLevel: number
}
export type Corners = "000" | "100" | "001" | "010" | "101" | "110" | "011" | "111" 
export type TileJSONData =  {
    name: string,
    corners: {
        "000": [number, number, number],
        "100": [number, number, number],
        "001": [number, number, number],
        "010": [number, number, number],
        "101": [number, number, number],
        "110": [number, number, number],
        "011": [number, number, number],
        "111": [number, number, number]
    },
    texture: string
}
export interface ImageData {
    img: HTMLImageElement
}
export const gridDim = 5
export const underView = 10
// Array.fill didnt play nice with types :(
export type RoomSubsetLayer = [
        [string, string, string, string, string],
        [string, string, string, string, string],
        [string, string, string, string, string],
        [string, string, string, string, string],
        [string, string, string, string, string]
    ]
export type RoomSubset = RoomSubsetLayer[]
export const blankSubsetLayer: RoomSubsetLayer = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]
export const blankSubset: RoomSubset = [
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer,
    blankSubsetLayer
]
export const dt = 0.01
export const walkSpeed = 7

export function tripleLoop<In, Out>(iterable: In[][][], callback:(i:number, j:number, k:number, element:In)=>Out):Out[] {
    let output: Out[] = []
    for (const i in iterable) {
        const I = parseInt(i)
        for (const j in iterable[I]) {
            const J = parseInt(j)
            for (const k in iterable[I][J]) {
                const K = parseInt(k)
                output.push(callback(I, J, K, iterable[I][J][K]))
            }
        }
    }
    return output
}
export function doubleLoop<In, Out>(iterable: In[][], callback:(i:number, j:number, element:In)=>Out):Out[] {
    let output: Out[] = []
    for (const i in iterable) {
        const I = parseInt(i)
        for (const j in iterable[I]) {
            const J = parseInt(j)
            output.push(callback(I, J, iterable[I][J]))
        }
    }
    return output
}
export let drawPos = {
    CENTRE: (topleft:Vec2, size:Vec2) => {return topleft.sub(size.div(2))},
    TOPLEFT: (topleft:Vec2, size:Vec2) => {return topleft}
}
export type callbackFunction = () => {}
export function f(obj:string[]) { return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) }

export type Vec2List = [number, number]

export type AnimData = {
    offset: Vec2List,
    meta: {topleft: Vec2List, size: Vec2List}[]
    alias: {[name: string]: number}
}