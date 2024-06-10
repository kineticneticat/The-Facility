import { drawLoopingAnimFrame } from "./Animation.js";
import { Asset, UnitDirections, drawPos, dt, walkSpeed } from "./Const.js";
import { Assets, getAssetData } from "./Handlers.js";
import { Vec2, Vec3 } from "./Maths.js";
import { Room } from "./Room.js";
import { Tile } from "./Tile.js";

export let playerPos = new Vec3(0, 0,0)
export let currentChar = "devchar"
export let screenPlayerPos: Vec2

enum PlayerAnimStates {
	IDLE = "",
	FORWARDS = "+x",
	BACKWARDS = "-x",
	LEFT = "+z",
	RIGHT = "-z",
	UP = "+y",
	DOWN = "-y"

}
export let playerAnimState: PlayerAnimStates

export function playerInit() {
	screenPlayerPos = new Vec3(3,0,3).screen
	playerAnimState = PlayerAnimStates.IDLE
}

export function updatePlayerState() {
	playerAnimState = key.Forwards ? PlayerAnimStates.FORWARDS : playerAnimState
	playerAnimState = key.Backwards ? PlayerAnimStates.BACKWARDS : playerAnimState
	playerAnimState = key.Left ? PlayerAnimStates.LEFT : playerAnimState
	playerAnimState = key.Right ? PlayerAnimStates.RIGHT : playerAnimState
	playerAnimState = key.Up ? PlayerAnimStates.UP : playerAnimState
	playerAnimState = key.Down ? PlayerAnimStates.DOWN : playerAnimState
	playerAnimState = !key.any() ? PlayerAnimStates.IDLE : playerAnimState
}

export function isMoveAllowed(currentPos:Vec3, deltaAttempt:Vec3, roomname: string) {
	let room = getAssetData<Room>(`${roomname},room`)
	return getAssetData<Tile>(room.tile(currentPos.add(deltaAttempt.round(0)))).solid
	|| getAssetData<Tile>(room.tile(currentPos.add(deltaAttempt.norm).add(Vec3.j.neg))).solid

}

export function Move(roomname: string) {
    let deltaPos = new Vec3(0,0,0)
	deltaPos = key.Forwards ? deltaPos.add(UnitDirections.FORWARDS.mul(walkSpeed)) : deltaPos
	deltaPos = key.Backwards ? deltaPos.add(UnitDirections.BACKWARDS.mul(walkSpeed)) : deltaPos
	deltaPos = key.Left ? deltaPos.add(UnitDirections.LEFT.mul(walkSpeed)) : deltaPos
	deltaPos = key.Right ? deltaPos.add(UnitDirections.RIGHT.mul(walkSpeed)) : deltaPos

	deltaPos = key.Up ? deltaPos.add(UnitDirections.UP.mul(walkSpeed)) : deltaPos
	deltaPos = key.Down ? deltaPos.add(UnitDirections.DOWN.mul(walkSpeed)) : deltaPos


	if (isMoveAllowed(playerPos, deltaPos, roomname)) {playerPos = playerPos.add(deltaPos.mul(dt))}
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