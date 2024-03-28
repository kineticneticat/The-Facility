import { devRenderGround } from "./Grid.js";
import { Assets, Failed, HandlersLoaded, TargetHandlers } from "./Handlers.js";
import { Move } from "./Player.js";
import { Vec3 } from "./Maths.js";
import { Room } from "./Room.js";
import { Tile } from "./Tile.js";
export let Ready = () => HandlersLoaded == TargetHandlers;
export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
let first = false;
let dev_room;
let devGroundTile;
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
    loop();
}
function loop() {
    if (!Failed && (HandlersLoaded != TargetHandlers)) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded");
    }
    if (!first && (HandlersLoaded == TargetHandlers) && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded");
        console.log(dev_room.roomLayout);
        console.log(dev_room.subset(new Vec3(1, 0, 0)));
        first = true;
        console.log(Assets);
    }
    if (Failed) {
        console.error("Handler Failed");
        return;
    }
    if (HandlersLoaded == TargetHandlers && !Failed) {
        // all handlers loaded
        Draw();
        // console.log(key)
        Move();
    }
    requestAnimationFrame(loop);
}
function Draw() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    devRenderGround(ctx);
}
//# sourceMappingURL=Main.js.map