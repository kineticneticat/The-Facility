import { AssetIndex, Assets, ImageHandler } from "./Handlers.js"
import { Vec2, Vec3 } from "./Maths.js"

export let Tiles: Tile[] = []

export function tileByName(name:string):number {
    for (const i in Tiles) {
        if (Tiles[i].name == name) {
            return parseInt(i)
        }
    }
    return -1
}

export interface TileShape {
    "pp": number,
    "np": number,
    "pn": number,
    "nn": number
}

export class Tile {
    shape: TileShape
    name: string
    index: number
    handler: ImageHandler
    Asset: AssetIndex = -1
    constructor(name: string, shape: TileShape) {
        this.name = name
        this.shape = shape
        this.index = Tiles.push(this)-1
        this.handler = new ImageHandler(`tiles/${this.name}.png`, this.name)
    }

    loaded() {
        this.Asset = this.handler.Asset
        document.body.appendChild(this.img)
    }
    get img() {
        return Assets[this.Asset].data
    }

    draw(ctx:CanvasRenderingContext2D, pos: Vec3) {
        let x = pos.add(new Vec3(0, 1, 0)).screen.x
        let y = pos.add(new Vec3(2, 2, 0)).screen.y
        let w = new Vec3(1, 0, 0).screen.sub(new Vec3(0, 1, 0).screen).x

        ctx.drawImage(this.img, x, y, w, w)

    }
}