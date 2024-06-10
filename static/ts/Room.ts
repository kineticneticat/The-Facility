import { Asset, RoomJSONData, RoomSubset, blankSubset, blankSubsetLayer, gridDim, tripleLoop } from "./Const.js";
import { Assets, RoomHandler, getAsset } from "./Handlers.js";
import { ready } from "./Main.js";
import { Vec3 } from "./Maths.js"
import { Tile } from "./Tile.js";

export class Room {
    name: string
    constructor(name:string) {
        this.name = name
        if (Object.keys(Assets).includes(this.assetName)) {return}
        new RoomHandler(`static/json/room/${this.name}.json`, `${this.name},data.room`, () => {this.callback()})
        Assets[this.assetName] = {
            loaded:false,
            data: this
        } as Asset<Room>
    }

    get assetName() { return `${this.name},room`}
    get dataAssetName() { return `${this.name},data.room` }
    get dataAsset() { return getAsset<RoomJSONData>(this.dataAssetName)}
    get data() { return this.dataAsset.data}
    get groundLevel() { return this.data.groundLevel }
    get layout() { return this.data.layout }
    tile(pos: Vec3) {
        pos = pos.round(0)
        if (pos.y >= this.layout.length) {return ""}
        if (pos.x >= this.layout[0].length) {return ""}
        if (pos.z >= this.layout[0][0].length) {return ""}
        return `${this.layout[pos.y][pos.x][pos.z]},tile`}

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

