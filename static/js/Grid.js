import { Vec3 } from "./Maths.js";
export function devRenderGround(ctx) {
    let list = [...Array(8).keys()];
    for (const x of list) {
        for (const y of list) {
            let pos = new Vec3(x, y, 0);
            let screen = pos.screen;
            // ctx.fillStyle = (x==0 && y==0)? "rgb(255, 255, 255)" : "rgb(219, 57, 24)"
            ctx.fillStyle = `rgb(${x / 6 * 255}, ${y / 6 * 255}, 0)`;
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
export function devRenderTileOutline(ctx, tile, pos) {
    ctx.strokeStyle = "rgb(219, 57, 24)";
    ctx.beginPath();
    let a = (x) => x.screen.xy;
    ctx.moveTo(...a(pos));
    ctx.lineTo(...a(pos.add(new Vec3(1, 0, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(1, 1, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 1, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 0, 0))));
    ctx.moveTo(...a(pos.add(new Vec3(0, 0, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 0, tile.shape.nn))));
    ctx.moveTo(...a(pos.add(new Vec3(0, 1, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 1, tile.shape.np))));
    ctx.moveTo(...a(pos.add(new Vec3(1, 0, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(1, 0, tile.shape.pn))));
    ctx.moveTo(...a(pos.add(new Vec3(1, 1, 0))));
    ctx.lineTo(...a(pos.add(new Vec3(1, 1, tile.shape.pp))));
    ctx.moveTo(...a(pos.add(new Vec3(0, 0, tile.shape.nn))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 1, tile.shape.np))));
    ctx.lineTo(...a(pos.add(new Vec3(1, 1, tile.shape.pp))));
    ctx.lineTo(...a(pos.add(new Vec3(1, 0, tile.shape.pn))));
    ctx.lineTo(...a(pos.add(new Vec3(0, 0, tile.shape.nn))));
    ctx.stroke();
}
export function devRenderRoom(room) {
}
//# sourceMappingURL=Grid.js.map