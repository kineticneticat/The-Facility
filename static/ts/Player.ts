import { dt, walkSpeed } from "./Const.js";
import { Vec3 } from "./Maths.js";

export let playerPos = new Vec3(0, 0,0)

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
    RIGHT: new Vec3(0,0,-1),
    LEFT: new Vec3(0,0,1),
    UP: new Vec3(0,1,0),
    DOWN: new Vec3(0,-1,0)
}

export let key = {
	Forwards: false, 
	Backwards: false, 
	Left: false, 
	Right: false, 
	Up: false, 
	Down: false
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