import { Asset, Corners, RoomJSONData, SimpleMap, TileJSONData } from "./Const.js";
import { Assets, ImageHandler, TileHandler, getAsset } from "./Handlers.js";
import { ready } from "./Main.js";
import { Vec3 } from "./Maths.js";

export class Tile {
    name: string
    dataLoaded:boolean
    imgLoaded:boolean
    constructor(name:string) {
        this.name = name
        this.dataLoaded = false
        this.imgLoaded = false
        if (Object.keys(Assets).includes(this.assetName)) { return }
        new ImageHandler(`static/img/tile/${this.name}.png`, this.imgAssetName, () => {this.imgLoaded = true; this.callback()})
        new TileHandler(`static/json/tile/${this.name}.json`, this.dataAssetName, () => {this.dataLoaded = true; this.callback()})
        Assets[this.assetName] = {
            loaded: false,
            data: this
        } as Asset<Tile>
    }

    

    callback() {
        if (!(this.dataLoaded && this.imgLoaded)) { return }

        Assets[this.assetName].loaded = true
    }

    get assetName() { return `${this.name},tile` }
    get dataAssetName() { return `${this.name},data.tile` }
    get imgAssetName() { return `${this.name},img.tile` }

    get dataAsset() { return getAsset<TileJSONData>(this.dataAssetName) }
    get imgAsset() { return getAsset<HTMLImageElement>(this.imgAssetName) }

    get data(): TileJSONData {return this.dataAsset.data as TileJSONData}
    get img(): HTMLImageElement {return this.imgAsset.data as HTMLImageElement}

    get solid() { return this.data.solid}

    corners(corner:Corners) {
        return Vec3.list(this.data.corners[corner])
    }
}