import { devRenderGround, devRenderRoom, devRenderTileOutline, renderRoom } from "./Render.js"
import { Assets, Failed, ImageHandler, RoomHandler} from "./Handlers.js"
import { AnimHandler, dataCtx, drawLoopingAnimFrame } from "./Animation.js"
import { DrawPlayer, Move, key, currentChar, playerInit, playerPos, screenPlayerPos } from "./Player.js"
import { Vec3, Vec2 } from "./Maths.js"
import { Room } from "./Room.js"

// check if all handlers are loaded
export function ready():boolean {for (const ele in Assets) {if (!Assets[ele].loaded) {return false}}; return true}

export let canvas = document.getElementById("canvas") as HTMLCanvasElement
export let ctx = canvas.getContext("2d", ) as CanvasRenderingContext2D
let first = true
let time = 0


let dev_room: Room
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
    dataCtx.imageSmoothingEnabled = false


    // init stuff
    playerInit()
    new Room("dev")
    new AnimHandler(currentChar)
    
    


    loop()
}

function loop() {
    if (!Failed && !ready()) {
        // not all handlers loaded so skip frame
        console.info("Handlers Not Loaded")
    }
    if (first && ready() && !Failed) {
        // triggers once after handlers loaded
        console.info("Handlers Loaded")

        first = false
    }
    if (Failed) {
        console.error("Handler Failed")
        return
    }
    if (ready() && !Failed && !first) {
        // all handlers loaded

        // debugger

        Draw()

        Move()
        time++
    }
    requestAnimationFrame(loop)
}


function Draw() {
    ctx.clearRect(0,0,canvasSize.width, canvasSize.height)
    // ctx.strokeStyle = "#000000"
    
    // devRenderGround(ctx)
    renderRoom(ctx, "dev", playerPos)
    // devRenderRoom(ctx, Assets["dev.room"].data, playerPos)
    DrawPlayer(ctx, new Vec3(2,1,2), time)

    
}