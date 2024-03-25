import { Assets, } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
import { playerPos } from "./Player.js";
import { Tiles, tileByName } from "./Tile.js";
export class Room {
    // handler: JsonHandler
    constructor(fn, name) {
        // this.handler = new JsonHandler(`room/${fn}`, name)
    }
    get data() { return Assets[this.handler.Asset].data; }
    draw(ctx) {
        let area = this.getArea;
        console.log(area);
        let ZL = area.length;
        for (let z in area) {
            let XL = area[z].length;
            for (let x in area[z]) {
                let YL = area[z][x].length;
                for (let y in area[z][x]) {
                    let X = parseInt(x);
                    let Y = parseInt(y);
                    let Z = parseInt(z);
                    let name = area[Z][XL - X - 1][YL - Y - 1];
                    let tile = tileByName(name);
                    Tiles[tile].draw(ctx, new Vec3(XL - X - 1, YL - Y - 1, Z - 1));
                }
            }
        }
    }
    get getArea() {
        let arr = [];
        for (const layer of this.data.layout) {
            arr.push(this.get2dArea(layer));
        }
        return arr;
    }
    get2dArea(arr) {
        let x = playerPos.x;
        let y = playerPos.y;
        if (x < 0 || y < 0 || x >= arr.length || y >= arr[0].length) {
            //   return null;
        }
        const subArray = [];
        const startX = Math.max(0, x - 3);
        const startY = Math.max(0, y - 3);
        const endX = Math.min(arr.length - 1, x + 3);
        const endY = Math.min(arr[0].length - 1, y + 3);
        for (let i = startX; i <= endX; i++) {
            const row = [];
            for (let j = startY; j <= endY; j++) {
                row.push(arr[i][j]);
            }
            subArray.push(row);
        }
        return subArray;
    }
}
//# sourceMappingURL=Room.js.map