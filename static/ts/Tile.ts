import { Asset, Corners, RoomJSONData, SimpleMap, TileJSONData } from "./Const.js";
import { Assets, ImageHandler, TileHandler } from "./Handlers.js";
import { ready } from "./Main.js";
import { Vec3 } from "./Maths.js";

export class Tile {
    assetName: string
    dataLoaded:boolean
    imgLoaded:boolean
    constructor(name:string) {
        this.assetName = name
        this.dataLoaded = false
        this.imgLoaded = false
        if (Object.keys(Assets).includes(this.assetName)) { return }
        new ImageHandler(`static/img/tile/${this.assetName}.png`, this.imgAssetName, () => {this.imgLoaded = true; this.callback()})
        new TileHandler(`static/json/tile/${this.assetName}.json`, this.dataAssetName, () => {this.dataLoaded = true; this.callback()})
        Assets[this.assetName] = {
            loaded: false,
            data: this
        } as Asset<Tile>
    }

    callback() {
        if (!(this.dataLoaded && this.imgLoaded)) { return }

        Assets[this.assetName].loaded = true
    }

    get dataAssetName() { return `${this.assetName},data.tile` }
    get imgAssetName() { return `${this.assetName},img.tile` }

    get dataAsset() { return Assets[this.dataAssetName] as Asset<TileJSONData> }
    get imgAsset() { return Assets[this.imgAssetName] as Asset<HTMLImageElement> }

    get data(): TileJSONData {return this.dataAsset.data as TileJSONData}
    get img(): HTMLImageElement {return this.imgAsset.data as HTMLImageElement}

    corners(corner:Corners) {
        return Vec3.list(this.data.corners[corner])
    }
}