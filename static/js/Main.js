import { devRenderRoom, renderRoom } from "./Grid.js";
import { Assets, Failed } from "./Handlers.js";
import { AnimHandler, dataCtx } from "./Animation.js";
import { DrawPlayer, Move, playerPos } from "./Player.js";
import { Room } from "./Room.js";
// check if all handlers are loaded
export function ready() { for (const ele in Assets) {
    if (!Assets[ele].loaded) {
        return false;
    }
} ; return true; }
export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
let first = true;
let time = 0;
let dev_room;
let testAnim;
export let canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight
};
window.onload = () => {
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    init();
};
function init() {
    ctx.imageSmoothingEnabled = false;
    dataCtx.imageSmoothingEnabled = false;
    // init stuff
    new Room("dev.room");
    new AnimHandler("dev.char", {
        "+x": 0,
        "-x": 1,
        "+y": 2,
        "-y": 3,
        "+z": 4,
        "-z": 5
    });
    new Room("dev.room");
    loop();
}
function loop() {
    if (!Failed && !ready()) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded");
    }
    if (first && ready() && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded");
        first = false;
        // console.log(Assets)
        // console.log(TileRegistry)
        // console.log(testAnim)
    }
    if (Failed) {
        console.error("Handler Failed");
        return;
    }
    if (ready() && !Failed && !first) {
        // all handlers loaded
        // debugger
        Draw();
        // console.log(playerPos)
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("+x", Math.round(time / 10), 10), 10, 10);
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("-x", Math.round(time / 10), 10), 100, 10);
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("+y", Math.round(time / 10), 10), 190, 10);
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("-y", Math.round(time / 10), 10), 280, 10);
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("+z", Math.round(time / 10), 10), 370, 10);
        ctx.putImageData(Assets["dev.char.anim"].data.frameImgName("-z", Math.round(time / 10), 10), 460, 10);
        Move();
        time++;
    }
    requestAnimationFrame(loop);
}
function Draw() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    renderRoom(ctx, Assets["dev.room"].data, playerPos);
    devRenderRoom(ctx, Assets["dev.room"].data, playerPos);
    DrawPlayer(ctx);
    // devRenderGround(ctx)
}
//# sourceMappingURL=Main.js.map