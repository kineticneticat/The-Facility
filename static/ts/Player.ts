import { Vec3 } from "./Maths.js";

export let playerPos = new Vec3(5,2,0)

export function Move() {
    
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

export let  Directions = {
    FORWARDS: new Vec3(1,0,0),
    BACKWARDS: new Vec3(1,0,0),
    LEFT: new Vec3(1,0,0),
    RIGHT: new Vec3(1,0,0)
}

export let key = {
	Up: false, 
	Down: false, 
	Left: false, 
	Right: false, 
	Space: false, 
	Shift: false
}

document.addEventListener('keydown', (e) => {
		// console.log(e.keyCode)
		switch (e.keyCode) {
			case keyCodes.UP :
			case keyCodes.W:
				key.Up = true
				break;
			case keyCodes.DOWN :
			case keyCodes.S:
				key.Down = true
				break;
			case keyCodes.LEFT :
			case keyCodes.A:
				key.Left = true
				break;
			case keyCodes.RIGHT :
			case keyCodes.D:
				key.Right = true
				break;
			case keyCodes.SPACE:
				key.Space = true
				break;
			case keyCodes.SHIFT:
				key.Shift = true
				break;
		}
	})

document.addEventListener('keyup', (e) => {
	switch (e.keyCode) {
		case keyCodes.UP:
		case keyCodes.W:
			key.Up = false
			break;
		case keyCodes.DOWN :
		case keyCodes.S:
			key.Down = false
			break;
		case keyCodes.LEFT :
		case keyCodes.A:
			key.Left = false
			break;
		case keyCodes.RIGHT :
		case keyCodes.D:
			key.Right = false
			break;
		case keyCodes.SPACE:
			key.Space = false
			break;
		case keyCodes.SHIFT:
			key.Shift = false
			break;
	}
	})