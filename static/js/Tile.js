import { Assets, ImageHandler, TileHandler } from "./Handlers.js";
import { Ready } from "./Main.js";
import { Vec3 } from "./Maths.js";
export class Tile {
    name;
    constructor(name) {
        this.name = name;
        new TileHandler(`static/json/tile/${this.name}.tile.json`, this.tileDataAssetName);
        new ImageHandler(`static/img/tile/${this.name}.tile.png`, this.tileImgAssetName);
    }
    get tileDataAssetName() { return `${this.name}.tile.data`; }
    get tileImgAssetName() { return `${this.name}.tile.img`; }
    get tileDataAsset() { if (Ready()) {
        return Assets[this.tileDataAssetName];
    }
    else {
        throw Error(`Handlers not loaded (${this.tileDataAssetName})`);
    } }
    get tileImgAsset() { if (Ready()) {
        return Assets[this.tileImgAssetName];
    }
    else {
        throw Error(`Handlers not loaded (${this.tileImgAssetName})`);
    } }
    get tileData() { return this.tileDataAsset.data; }
    get tileImg() { return this.tileImgAsset.data; }
    corners(corner) {
        return Vec3.list(this.tileData.corners[corner]);
    }
}
//# sourceMappingURL=Tile.js.map