import { devRenderGround, devRenderRoom, devRenderTileOutline, renderRoom } from "./Grid.js"
import { Assets, Failed, ImageHandler, RoomHandler, Queue, AnimHandler} from "./Handlers.js"
import { Move, key, playerPos } from "./Player.js"
import { Vec3, Vec2 } from "./Maths.js"
import { Room } from "./Room.js"
import { Tile, TileRegistry } from "./Tile.js"
import { Queuer } from "./Const.js"

// check if all handlers are loaded
export let Ready = ():boolean => {for (const ele in Queue) {if (!Queue[ele].done) {return false}}; return true}

export let canvas = document.getElementById("canvas") as HTMLCanvasElement
export let ctx = canvas.getContext("2d") as CanvasRenderingContext2D
let first = true

let dev_room: Room
let devGroundTile: Tile
let dwayne: Tile
let testAnim: AnimHandler

export let canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.onload = () => {
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    init()
}
function init() {
    ctx.imageSmoothingEnabled = false
    // init handlers from here

    dev_room = new Room("dev")
    devGroundTile = new Tile("dev_ground")
    dwayne = new Tile("dwayne")
    testAnim = new AnimHandler("dev")
    
    


    loop()
}

function loop() {
    if (!Failed && !Ready()) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded")
    }
    if (first && Ready() && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded")

        first = false
        // console.log(Assets)
        // console.log(TileRegistry)
        console.log(testAnim)

    }
    if (Failed) {
        console.error("Handler Failed")
        return
    }
    if (Ready() && !Failed && !first) {
        // all handlers loaded

        // debugger

        Draw()
        // console.log(playerPos)

        Move()
        
    }
    requestAnimationFrame(loop)
}


function Draw() {
    ctx.clearRect(0,0,canvasSize.width, canvasSize.height)

    renderRoom(ctx, dev_room, playerPos)
    // devRenderRoom(ctx, dev_room, playerPos)

    // devRenderGround(ctx)
}