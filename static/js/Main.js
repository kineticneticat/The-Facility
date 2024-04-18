import { renderRoom } from "./Grid.js";
import { Failed, Queue, AnimHandler } from "./Handlers.js";
import { Move, playerPos } from "./Player.js";
import { Room } from "./Room.js";
import { Tile } from "./Tile.js";
// check if all handlers are loaded
export let Ready = () => { for (const ele in Queue) {
    if (!Queue[ele].done) {
        return false;
    }
} ; return true; };
export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
let first = true;
let time = 0;
let dev_room;
let devGroundTile;
let dwayne;
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
    // init handlers from here
    dev_room = new Room("dev");
    devGroundTile = new Tile("dev_ground");
    dwayne = new Tile("dwayne");
    testAnim = new AnimHandler("dev");
    loop();
}
function loop() {
    if (!Failed && !Ready()) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded");
    }
    if (first && Ready() && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded");
        first = false;
        // console.log(Assets)
        // console.log(TileRegistry)
        console.log(testAnim);
    }
    if (Failed) {
        console.error("Handler Failed");
        return;
    }
    if (Ready() && !Failed && !first) {
        // all handlers loaded
        // debugger
        Draw();
        // console.log(playerPos)
        ctx.putImageData(testAnim.frameImg(0, Math.round(time / 10)), 10, 10);
        Move();
        time++;
    }
    requestAnimationFrame(loop);
}
function Draw() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    renderRoom(ctx, dev_room, playerPos);
    // devRenderRoom(ctx, dev_room, playerPos)
    // devRenderGround(ctx)
}
//# sourceMappingURL=Main.js.map