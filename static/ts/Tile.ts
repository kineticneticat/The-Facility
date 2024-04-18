import { Corners, SimpleMap, TileJSONData } from "./Const.js";
import { Assets, ImageHandler, TileHandler } from "./Handlers.js";
import { Ready } from "./Main.js";
import { Vec3 } from "./Maths.js";

export let TileRegistry:SimpleMap<Tile> = {}

export class Tile {
    name: string
    constructor(name:string) {
        this.name = name
        new TileHandler(`static/json/tile/${this.name}.tile.json`, this.tileDataAssetName)
        new ImageHandler(`static/img/tile/${this.name}.tile.png`, this.tileImgAssetName)
        TileRegistry[this.name] = this
    }

    get tileDataAssetName() { return `${this.name}.tile.data` }
    get tileImgAssetName() { return `${this.name}.tile.img` }

    get tileDataAsset() { if (Ready()) {return Assets[this.tileDataAssetName]} else {throw Error(`Handlers not loaded (${this.tileDataAssetName})`)}}
    get tileImgAsset() { if (Ready()) {return Assets[this.tileImgAssetName]} else {throw Error(`Handlers not loaded (${this.tileImgAssetName})`)}}

    get tileData(): TileJSONData {return this.tileDataAsset.data as TileJSONData}
    get tileImg(): HTMLImageElement {return this.tileImgAsset.data as HTMLImageElement}

    corners(corner:Corners) {
        return Vec3.list(this.tileData.corners[corner])
    }
}