import { gridDim } from "./Const.js";
import { ctx, canvasSize } from "./Main.js";
import { Vec3, Vec2 } from "./Maths.js";
import { Room } from "./Room.js";
import { Tile } from "./Tile.js";


export function devRenderGround(ctx: CanvasRenderingContext2D) {
    let list = [...Array(gridDim).keys()]
    for (const x of list) {
        for (const z of list) {
            let pos = new Vec3(x, 0, z)
            let screen = pos.screen
            // ctx.fillStyle = (x==0 && y==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"
            ctx.fillStyle = `rgb(${x/gridDim*255}, ${z/gridDim*255}, 0)`
            ctx.beginPath()
            ctx.arc(screen.x, screen.y, 5, 0, Math.PI*2)
            ctx.fill()
        }
    }
}

export function devRenderTileOutline(ctx:CanvasRenderingContext2D, tile:Tile, pos:Vec3) {
    ctx.strokeStyle = "rgb(219, 57, 24)"
    ctx.beginPath()
    let a = (x: Vec3) => x.screen.xy
    let zeroCorner = pos.sub(new Vec3(.5, .5, .5))
    ctx.moveTo(...a(zeroCorner.add(tile.corners("000"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("100"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("101"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("001"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("000"))))

    ctx.moveTo(...a(zeroCorner.add(tile.corners("010"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("110"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("111"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("011"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("010"))))

    ctx.moveTo(...a(zeroCorner.add(tile.corners("000"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("010"))))
    ctx.moveTo(...a(zeroCorner.add(tile.corners("100"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("110"))))
    ctx.moveTo(...a(zeroCorner.add(tile.corners("101"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("111"))))
    ctx.moveTo(...a(zeroCorner.add(tile.corners("001"))))
    ctx.lineTo(...a(zeroCorner.add(tile.corners("011"))))
    
    ctx.stroke()
}

export function devRenderRoom(room: Room) {
    
}