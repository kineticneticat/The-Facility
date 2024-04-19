import { Assets, ImageHandler, TileHandler } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
export class Tile {
    assetName;
    dataLoaded;
    imgLoaded;
    constructor(name) {
        this.assetName = name;
        this.dataLoaded = false;
        this.imgLoaded = false;
        if (Object.keys(Assets).includes(this.assetName)) {
            return;
        }
        new ImageHandler(`static/img/tile/${this.assetName}.png`, this.imgAssetName, () => { this.imgLoaded = true; this.callback(); });
        new TileHandler(`static/json/tile/${this.assetName}.json`, this.dataAssetName, () => { this.dataLoaded = true; this.callback(); });
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
    get dataAssetName() { return `${this.assetName}.data`; }
    get imgAssetName() { return `${this.assetName}.img`; }
    get dataAsset() { return Assets[this.dataAssetName]; }
    get imgAsset() { return Assets[this.imgAssetName]; }
    get data() { return this.dataAsset.data; }
    get img() { return this.imgAsset.data; }
    corners(corner) {
        return Vec3.list(this.data.corners[corner]);
    }
}
//# sourceMappingURL=Tile.js.map