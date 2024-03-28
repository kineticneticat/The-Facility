import { gridDim } from "./Const.js";
import { Assets, RoomHandler } from "./Handlers.js";
import { Ready } from "./Main.js";
import { Vec3 } from "./Maths.js";
export class Room {
    name;
    constructor(name) {
        this.name = name;
        new RoomHandler(`static/json/room/${this.name}.room.json`, `${this.name}.room.data`);
    }
    get roomDataAssetName() { return `${this.name}.room.data`; }
    get roomDataAsset() { if (Ready()) {
        return Assets[this.roomDataAssetName];
    }
    else {
        throw Error(`Handlers not loaded (${this.roomDataAssetName})`);
    } }
    get roomData() { return this.roomDataAsset.data; }
    get roomLayout() { return this.roomData.layout; }
    subset(centre) {
        // :(
        let subset = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]
        ];
        let offset = Math.floor(gridDim / 2); //(true) ? Math.floor(gridDim/2) : 0
        let zerozerocorner = centre.sub(new Vec3(offset, 0, offset));
        for (const x in this.roomLayout) {
            let row = this.roomLayout[x];
            for (const z in row) {
                if (zerozerocorner.x <= parseInt(x) && parseInt(x) <= zerozerocorner.x + gridDim - 1 && zerozerocorner.z <= parseInt(z) && parseInt(z) <= zerozerocorner.z + gridDim - 1) {
                    subset[parseInt(x) - zerozerocorner.x][parseInt(z) - zerozerocorner.z] = this.roomLayout[x][z];
                }
            }
        }
        return subset;
    }
}
//# sourceMappingURL=Room.js.map