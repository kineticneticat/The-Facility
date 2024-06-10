import { Assets, ImageHandler, TileHandler, getAsset } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
export class Tile {
    name;
    dataLoaded;
    imgLoaded;
    constructor(name) {
        this.name = name;
        this.dataLoaded = false;
        this.imgLoaded = false;
        if (Object.keys(Assets).includes(this.assetName)) {
            return;
        }
        new ImageHandler(`static/img/tile/${this.name}.png`, this.imgAssetName, () => { this.imgLoaded = true; this.callback(); });
        new TileHandler(`static/json/tile/${this.name}.json`, this.dataAssetName, () => { this.dataLoaded = true; this.callback(); });
        Assets[this.assetName] = {
            loaded: false,
            data: this
        };
    }
    callback() {
        if (!(this.dataLoaded && this.imgLoaded)) {
            return;
        }
        Assets[this.assetName].loaded = true;
    }
    get assetName() { return `${this.name},tile`; }
    get dataAssetName() { return `${this.name},data.tile`; }
    get imgAssetName() { return `${this.name},img.tile`; }
    get dataAsset() { return getAsset(this.dataAssetName); }
    get imgAsset() { return getAsset(this.imgAssetName); }
    get data() { return this.dataAsset.data; }
    get img() { return this.imgAsset.data; }
    get solid() { return this.data.solid; }
    corners(corner) {
        return Vec3.list(this.data.corners[corner]);
    }
}
//# sourceMappingURL=Tile.js.map