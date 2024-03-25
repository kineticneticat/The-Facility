import { devRenderGround } from "./Grid.js";
import { Failed, HandlersLoaded, TargetHandlers } from "./Handlers.js";
import { Room } from "./Room.js";
import { Vec3 } from "./Maths.js";
import { Tile, Tiles } from "./Tile.js";
import { tileData } from "./tiles.js";
export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
let first = false;
let canvasSize = {
    width: 500,
    height: 500
};
window.onload = () => {
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    init();
};
function init() {
    for (const tile of tileData) {
        new Tile(tile.name, tile.shape);
    }
    currentRoom = new Room("dev.json", "dev_room");
    ctx.imageSmoothingEnabled = false;
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
        for (const tile of Tiles) {
            tile.loaded();
        }
        console.log(Assets);
        console.log(Tiles);
        first = true;
        console.log(new Vec3(0, 0, 0));
    }
    if (Failed) {
        console.error("Handler Failed");
        return;
    }
    if (HandlersLoaded == TargetHandlers && !Failed) {
        // all handlers loaded
        Draw();
        console.log(key);
        Move();
    }
    requestAnimationFrame(loop);
}
function Draw() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    // Tiles[0].draw(ctx, new Vec3(0, 0, -1))
    currentRoom.draw(ctx);
    devRenderGround(ctx);
    devRenderTileOutline(ctx, Tiles[0], new Vec3(0, 0, -1));
}
//# sourceMappingURL=Main.js.map