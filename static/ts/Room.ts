import { Asset, RoomJSONData, RoomSubset, blankSubset, blankSubsetLayer, gridDim, tripleLoop } from "./Const.js";
import { Assets, HandlerUser, RoomHandler } from "./Handlers.js";
import { ready } from "./Main.js";
import { Vec3 } from "./Maths.js"
import { Tile } from "./Tile.js";

export class Room implements HandlerUser {
    assetName: string
    constructor(name:string) {
        this.assetName = name
        if (Object.keys(Assets).includes(this.assetName)) {return}
        new RoomHandler(`static/json/room/${this.assetName}.json`, `${this.assetName}.data`, () => {this.callback()})
        Assets[this.assetName] = {
            loaded:false,
            data: this
        } as Asset<Room>
    }

    get dataAssetName() { return `${this.assetName}.data` }
    get dataAsset() { return Assets[this.dataAssetName] as Asset<RoomJSONData>}
    get data() { return this.dataAsset.data}
    get groundLevel() { return this.data.groundLevel }
    get layout() { return this.data.layout }

    callback() {
        this.loadTiles()

        Assets[this.assetName].loaded = true
    }
    loadTiles() {
        tripleLoop<string, void>(this.layout, (y, x, z, ele) => {
            if (ele) { new Tile(ele) }
        })
    }

    // why is this so fucking hard
    subset(centreBottom:Vec3) {
        // debugger
        // :( god why is it so jank to make a deep copy
        // should be ok since its just a fancy string[][][]
        let subset: RoomSubset = JSON.parse(JSON.stringify(blankSubset))
        let roundBottom = centreBottom.round(0)
        let zerozerocorner = roundBottom.sub([2, 5, 2])
        let maxmaxcorner = zerozerocorner.add([4, 9, 4])
        tripleLoop<string, void>(this.layout, (y, x, z, ele) => {
            const rel = (new Vec3(x, y, z)).sub(zerozerocorner)
            if (   (zerozerocorner.y <= y)
                && (y <= maxmaxcorner.y)
                && (zerozerocorner.x <= x)
                && (x <= maxmaxcorner.x)
                && (zerozerocorner.z <= z)
                && (z <= maxmaxcorner.z) ) {
                
                subset[rel.y][rel.x][rel.z] = 
                y < 0 || y > this.layout.length ? "" :
                x < 0 || x > this.layout[0].length ? "" :
                z < 0 || z > this.layout[0][0].length ? "" :
                this.layout[y][x][z]
                
            }
        })
        return subset
    }
}

