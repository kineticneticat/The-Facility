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
	W: false, 
	A: false, 
	S: false, 
	D: false, 
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
			case keyCodes.W:
				key.W = true
				break;
			case keyCodes.A:
				key.A = true
				break;
			case keyCodes.S:
				key.S = true
				break;
			case keyCodes.D:
				key.D = true
				break;
			case keyCodes.UP:
				key.Up = true
				break;
			case keyCodes.DOWN:
				key.Down = true
				break;
			case keyCodes.LEFT:
				key.Left = true
				break;
			case keyCodes.RIGHT:
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
			case keyCodes.W:
				key.W = false
				break;
			case keyCodes.A:
				key.A = false
				break;
			case keyCodes.S:
				key.S = false
				break;
			case keyCodes.D:
				key.D = false
				break;
			case keyCodes.UP:
				key.Up = false
				break;
			case keyCodes.DOWN:
				key.Down = false
				break;
			case keyCodes.LEFT:
				key.Left = false
				break;
			case keyCodes.RIGHT:
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