import { drawLoopingAnimFrame } from "./Animation.js";
import { drawPos, dt, walkSpeed } from "./Const.js";
import { Vec2, Vec3 } from "./Maths.js";

export let playerPos = new Vec3(0, 0,0)
export let currentChar = "devchar"
export let screenPlayerPos: Vec2

enum PlayerAnimStates {
	IDLE = "",
	FORWARDS = "+x",
	BACKWARDS = "-x",
	LEFT = "+z",
	RIGHT = "-Z",
	UP = "+y",
	DOWN = "-y"

}
export let playerAnimState: PlayerAnimStates

export function playerInit() {
	screenPlayerPos = new Vec3(3,0,3).screen
	playerAnimState = PlayerAnimStates.IDLE
}

export function updatePlayerState() {
	playerAnimState = key.Forwards ? PlayerAnimStates.FORWARDS : PlayerAnimStates.IDLE
	playerAnimState = key.Backwards ? PlayerAnimStates.BACKWARDS : PlayerAnimStates.IDLE
	playerAnimState = key.Left ? PlayerAnimStates.LEFT : PlayerAnimStates.IDLE
	playerAnimState = key.Right ? PlayerAnimStates.RIGHT : PlayerAnimStates.IDLE
	playerAnimState = key.Up ? PlayerAnimStates.UP : PlayerAnimStates.IDLE
	playerAnimState = key.Down ? PlayerAnimStates.DOWN : PlayerAnimStates.IDLE
}

export function Move() {
    let deltaPos = new Vec3(0,0,0)
	deltaPos = key.Forwards ? deltaPos.add(UnitDirections.FORWARDS.mul(walkSpeed)) : deltaPos
	deltaPos = key.Backwards ? deltaPos.add(UnitDirections.BACKWARDS.mul(walkSpeed)) : deltaPos
	deltaPos = key.Left ? deltaPos.add(UnitDirections.LEFT.mul(walkSpeed)) : deltaPos
	deltaPos = key.Right ? deltaPos.add(UnitDirections.RIGHT.mul(walkSpeed)) : deltaPos

	deltaPos = key.Up ? deltaPos.add(UnitDirections.UP.mul(walkSpeed)) : deltaPos
	deltaPos = key.Down ? deltaPos.add(UnitDirections.DOWN.mul(walkSpeed)) : deltaPos


	playerPos = playerPos.add(deltaPos.mul(dt))
}

export function DrawPlayer(ctx:CanvasRenderingContext2D, pos: Vec3, time:number) {
	updatePlayerState()
	let screenpos = pos.screen
	drawLoopingAnimFrame(ctx, "devchar,anim", playerAnimState, Math.round(time/10), 10, screenpos, drawPos.CENTRE)

}

enum keyCodes {
	W = 87,
	A = 65,
	S = 83,
	D = 68,

	UP = 38,
	DOWN = 40,
	LEFT = 37,
	RIGHT = 39,

	SPACE = 32,
	SHIFT = 16
}

export const UnitDirections = {
    FORWARDS: new Vec3(1,0,0),
    BACKWARDS: new Vec3(-1,0,0),
    LEFT: new Vec3(0,0,1),
    RIGHT: new Vec3(0,0,-1),
    UP: new Vec3(0,1,0),
    DOWN: new Vec3(0,-1,0)
}

export let key = {
	Forwards: false, 
	Backwards: false, 
	Left: false, 
	Right: false, 
	Up: false, 
	Down: false,
	any: () => {return key.Forwards || key.Backwards || key.Left || key.Right || key.Up || key.Down}
}

document.addEventListener('keydown', (e) => {
		// console.log(e.keyCode)
		switch (e.keyCode) {
			case keyCodes.UP:
			case keyCodes.W:
				key.Forwards = true
				break;
			case keyCodes.DOWN:
			case keyCodes.S:
				key.Backwards = true
				break;
			case keyCodes.LEFT:
			case keyCodes.A:
				key.Left = true
				break;
			case keyCodes.RIGHT:
			case keyCodes.D:
				key.Right = true
				break;
			case keyCodes.SPACE:
				key.Up = true
				break;
			case keyCodes.SHIFT:
				key.Down = true
				break;
		}
	})

document.addEventListener('keyup', (e) => {
	switch (e.keyCode) {
		case keyCodes.UP:
		case keyCodes.W:
			key.Forwards = false
			break;
		case keyCodes.DOWN:
		case keyCodes.S:
			key.Backwards = false
			break;
		case keyCodes.LEFT:
		case keyCodes.A:
			key.Left = false
			break;
		case keyCodes.RIGHT:
		case keyCodes.D:
			key.Right = false
			break;
		case keyCodes.SPACE:
			key.Up = false
			break;
		case keyCodes.SHIFT:
			key.Down = false
			break;
	}
	})