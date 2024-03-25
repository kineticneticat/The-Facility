import { Assets, ImageHandler } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
export let Tiles = [];
export function tileByName(name) {
    for (const i in Tiles) {
        if (Tiles[i].name == name) {
            return parseInt(i);
        }
    }
    return -1;
}
export class Tile {
    shape;
    name;
    index;
    handler;
    Asset = -1;
    constructor(name, shape) {
        this.name = name;
        this.shape = shape;
        this.index = Tiles.push(this) - 1;
        this.handler = new ImageHandler(`tiles/${this.name}.png`, this.name);
    }
    loaded() {
        this.Asset = this.handler.Asset;
        document.body.appendChild(this.img);
    }
    get img() {
        return Assets[this.Asset].data;
    }
    draw(ctx, pos) {
        let x = pos.add(new Vec3(0, 1, 0)).screen.x;
        let y = pos.add(new Vec3(2, 2, 0)).screen.y;
        let w = new Vec3(1, 0, 0).screen.sub(new Vec3(0, 1, 0).screen).x;
        ctx.drawImage(this.img, x, y, w, w);
    }
}
//# sourceMappingURL=Tile.js.map