import { gridDim, tripleLoop } from "./Const.js";
import { Vec3, Vec2 } from "./Maths.js";
import { Room } from "./Room.js";
import { Tile, TileRegistry } from "./Tile.js";

export function renderTile(ctx:CanvasRenderingContext2D, tile:Tile, pos:Vec3):void {
    let imgSize = new Vec2(tile.tileImg.width, tile.tileImg.height)
    let width = new Vec3(1, 0, 0).screen.sub(new Vec3(0, 0, 1).screen).len
    let factor = width/tile.tileImg.width
    let scaledsize = imgSize.mul(factor)
    ctx.drawImage(tile.tileImg, ...pos.screen.sub(scaledsize.div(2)).xy, ...scaledsize.xy)
}

export function renderRoom(ctx:CanvasRenderingContext2D, room:Room, pos:Vec3): void {
    let subset = room.subset(pos)
    tripleLoop(subset, (y, x, z, ele) => {
        let tileName = subset[y][4-x][4-z]
        let tile = TileRegistry[tileName]
        // catch non-existent Tiles
        if (!tile && tileName) { console.log(TileRegistry); throw Error(`Tile "${tileName}" in "${room.name}" does not exist`) }
        if (tile) {
            renderTile(ctx, tile, new Vec3(4-x, y-2, 4-z))
        }
    })
}

export function devRenderGround(ctx: CanvasRenderingContext2D) {
    let list = [...Array(gridDim).keys()]
    for (const x of list) {
        for (const z of list) {
            let pos = new Vec3(x, 0, z)
            let screen = pos.screen
            // ctx.fillStyle = (x==0 && z==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"
            ctx.fillStyle = `rgb(${x/gridDim*255}, ${z/gridDim*255}, 0)`
            ctx.beginPath()
            ctx.arc(screen.x, screen.y, 5, 0, Math.PI*2)
            ctx.fill()
        }
    }
}

export function devRenderTileOutline(ctx:CanvasRenderingContext2D, tile:Tile, pos:Vec3) {
    ctx.strokeStyle = "rgb(219, 57, 24)"
    // ctx.strokeStyle = (pos.x==0 && pos.z==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"

    ctx.beginPath()
    let a = (x: Vec3) => x.screen.xy
    let zeroCorner = pos.add(new Vec3(.5, .5, .5))
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

export function devRenderRoom(ctx:CanvasRenderingContext2D, room: Room, pos:Vec3) {
    let subset = room.subset(pos)
    tripleLoop<string, void>(subset, (y, x, z, ele) => {
        let tileName = ele
        let tile = TileRegistry[tileName]
        // catch non-existent Tiles
        if (!tile && tileName) { throw Error(`Tile "${tileName}" in "${room.name}" does not exist`) }
        if (tile) {
            devRenderTileOutline(ctx, tile, new Vec3(x, y-4, z))
        }
    })
}