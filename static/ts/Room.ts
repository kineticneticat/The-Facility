import { RoomJSONData, RoomSubset, blankSubset, blankSubsetLayer, gridDim, tripleLoop } from "./Const.js";
import { Assets, RoomHandler } from "./Handlers.js";
import { Ready } from "./Main.js";
import { Vec3 } from "./Maths.js"

export class Room {
    name: string
    constructor(name:string) {
        this.name = name
        new RoomHandler(`static/json/room/${this.name}.room.json`, `${this.name}.room.data`)
    }

    get roomDataAssetName() { return `${this.name}.room.data` }
    get roomDataAsset() { if (Ready()) {return Assets[this.roomDataAssetName]} else {throw Error(`Handlers not loaded (${this.roomDataAssetName})`)}}
    get roomData() { return this.roomDataAsset.data as RoomJSONData}
    get groundLevel() { return this.roomData.groundLevel }
    get roomLayout() { return this.roomData.layout }

    // why is this so fucking hard
    subset(centreBottom:Vec3) {
        // debugger
        // :( god why is it so jank to make a deep copy
        // should be ok since its just a fancy string[][][]
        let subset: RoomSubset = JSON.parse(JSON.stringify(blankSubset))
        let roundBottom = centreBottom.round(0)
        let zerozerocorner = roundBottom.sub([2, 5, 2])
        let maxmaxcorner = zerozerocorner.add([4, 9, 4])
        tripleLoop<string, void>(this.roomLayout, (y, x, z, ele) => {
            const rel = (new Vec3(x, y, z)).sub(zerozerocorner)
            if (   (zerozerocorner.y <= y)
                && (y <= maxmaxcorner.y)
                && (zerozerocorner.x <= x)
                && (x <= maxmaxcorner.x)
                && (zerozerocorner.z <= z)
                && (z <= maxmaxcorner.z) ) {
                
                subset[rel.y][rel.x][rel.z] = 
                y < 0 || y > this.roomLayout.length ? "" :
                x < 0 || x > this.roomLayout[0].length ? "" :
                z < 0 || z > this.roomLayout[0][0].length ? "" :
                this.roomLayout[y][x][z]
                
            }
        })
        return subset
    }
}

