import { blankSubset, tripleLoop } from "./Const.js";
import { Assets, RoomHandler } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
import { Tile } from "./Tile.js";
export class Room {
    name;
    constructor(name) {
        this.name = name;
        if (Object.keys(Assets).includes(this.assetName)) {
            return;
        }
        new RoomHandler(`static/json/room/${this.name}.json`, `${this.name},data.room`, () => { this.callback(); });
        Assets[this.assetName] = {
            loaded: false,
            data: this
        };
    }
    get assetName() { return `${this.name},room`; }
    get dataAssetName() { return `${this.name},data.room`; }
    get dataAsset() { return Assets[this.dataAssetName]; }
    get data() { return this.dataAsset.data; }
    get groundLevel() { return this.data.groundLevel; }
    get layout() { return this.data.layout; }
    callback() {
        this.loadTiles();
        Assets[this.assetName].loaded = true;
    }
    loadTiles() {
        tripleLoop(this.layout, (y, x, z, ele) => {
            if (ele) {
                new Tile(ele);
            }
        });
    }
    // why is this so fucking hard
    subset(centreBottom) {
        // debugger
        // :( god why is it so jank to make a deep copy
        // should be ok since its just a fancy string[][][]
        let subset = JSON.parse(JSON.stringify(blankSubset));
        let roundBottom = centreBottom.round(0);
        let zerozerocorner = roundBottom.sub([2, 5, 2]);
        let maxmaxcorner = zerozerocorner.add([4, 9, 4]);
        tripleLoop(this.layout, (y, x, z, ele) => {
            const rel = (new Vec3(x, y, z)).sub(zerozerocorner);
            if ((zerozerocorner.y <= y)
                && (y <= maxmaxcorner.y)
                && (zerozerocorner.x <= x)
                && (x <= maxmaxcorner.x)
                && (zerozerocorner.z <= z)
                && (z <= maxmaxcorner.z)) {
                subset[rel.y][rel.x][rel.z] =
                    y < 0 || y > this.layout.length ? "" :
                        x < 0 || x > this.layout[0].length ? "" :
                            z < 0 || z > this.layout[0][0].length ? "" :
                                this.layout[y][x][z];
            }
        });
        return subset;
    }
}
//# sourceMappingURL=Room.js.map