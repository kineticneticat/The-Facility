import { gridDim, tripleLoop } from "./Const.js";
import { Assets } from "./Handlers.js";
import { Vec3, Vec2 } from "./Maths.js";
export function renderTile(ctx, tile, pos) {
    let imgSize = new Vec2(tile.img.width, tile.img.height);
    let width = new Vec3(1, 0, 0).screen.sub(new Vec3(0, 0, 1).screen).len;
    let factor = width / tile.img.width;
    let scaledsize = imgSize.mul(factor);
    ctx.drawImage(tile.img, ...pos.screen.sub(scaledsize.div(2)).xy, ...scaledsize.xy);
}
export function renderRoom(ctx, roomName, pos) {
    let room = Assets[roomName + ",room"].data;
    let subset = room.subset(pos);
    tripleLoop(subset, (y, x, z, ele) => {
        let tileName = subset[y][4 - x][4 - z];
        if (!tileName) {
            return;
        }
        let asset = Assets[tileName + ",tile"];
        // if tile isnt loaded for some reason
        if (!asset) {
            console.log(Assets);
            throw Error(`Tile "${tileName}" in "${room.assetName}" does not exist`);
        }
        renderTile(ctx, asset.data, new Vec3(4 - x, y - 5, 4 - z));
    });
}
export function devRenderGround(ctx) {
    let list = [...Array(gridDim).keys()];
    for (const x of list) {
        for (const z of list) {
            let pos = new Vec3(x, 0, z);
            let screen = pos.screen;
            // ctx.fillStyle = (x==0 && z==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"
            ctx.fillStyle = `rgb(${x / gridDim * 255}, ${z / gridDim * 255}, 0)`;
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
export function devRenderTileOutline(ctx, tile, pos) {
    ctx.strokeStyle = "rgb(219, 57, 24)";
    // ctx.strokeStyle = (pos.x==0 && pos.z==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"
    ctx.beginPath();
    let process = (x) => x.screen.xy;
    let zeroCorner = pos.add(new Vec3(.5, .5, .5));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("000"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("100"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("101"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("001"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("000"))));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("010"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("110"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("111"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("011"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("010"))));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("000"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("010"))));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("100"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("110"))));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("101"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("111"))));
    ctx.moveTo(...process(zeroCorner.add(tile.corners("001"))));
    ctx.lineTo(...process(zeroCorner.add(tile.corners("011"))));
    ctx.stroke();
}
export function devRenderRoom(ctx, room, pos) {
    let subset = room.subset(pos);
    tripleLoop(subset, (y, x, z, tileName) => {
        // is air, so ignore
        if (tileName == "") {
            return;
        }
        // might not exist, if tile not loaded
        let asset = Assets[tileName + ",tile"];
        //if asset doesnt exist, error
        if (!asset) {
            console.log(Assets);
            throw Error(`Tile "${tileName}" in "${room.assetName}" does not exist`);
        }
        devRenderTileOutline(ctx, asset.data, new Vec3(x, y - 7, z));
    });
}
//# sourceMappingURL=Render.js.map