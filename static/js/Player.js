import { Vec3 } from "./Maths.js";
export let playerPos = new Vec3(5, 2, 0);
export function Move() {
}
var keyCodes;
(function (keyCodes) {
    keyCodes[keyCodes["W"] = 87] = "W";
    keyCodes[keyCodes["A"] = 65] = "A";
    keyCodes[keyCodes["S"] = 83] = "S";
    keyCodes[keyCodes["D"] = 68] = "D";
    keyCodes[keyCodes["UP"] = 38] = "UP";
    keyCodes[keyCodes["DOWN"] = 40] = "DOWN";
    keyCodes[keyCodes["LEFT"] = 37] = "LEFT";
    keyCodes[keyCodes["RIGHT"] = 39] = "RIGHT";
    keyCodes[keyCodes["SPACE"] = 32] = "SPACE";
    keyCodes[keyCodes["SHIFT"] = 16] = "SHIFT";
})(keyCodes || (keyCodes = {}));
export let Directions = {
    FORWARDS: new Vec3(1, 0, 0),
    BACKWARDS: new Vec3(1, 0, 0),
    LEFT: new Vec3(1, 0, 0),
    RIGHT: new Vec3(1, 0, 0)
};
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
};
document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    switch (e.keyCode) {
        case keyCodes.W:
            key.W = true;
            break;
        case keyCodes.A:
            key.A = true;
            break;
        case keyCodes.S:
            key.S = true;
            break;
        case keyCodes.D:
            key.D = true;
            break;
        case keyCodes.UP:
            key.Up = true;
            break;
        case keyCodes.DOWN:
            key.Down = true;
            break;
        case keyCodes.LEFT:
            key.Left = true;
            break;
        case keyCodes.RIGHT:
            key.Right = true;
            break;
        case keyCodes.SPACE:
            key.Space = true;
            break;
        case keyCodes.SHIFT:
            key.Shift = true;
            break;
    }
});
document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case keyCodes.W:
            key.W = false;
            break;
        case keyCodes.A:
            key.A = false;
            break;
        case keyCodes.S:
            key.S = false;
            break;
        case keyCodes.D:
            key.D = false;
            break;
        case keyCodes.UP:
            key.Up = false;
            break;
        case keyCodes.DOWN:
            key.Down = false;
            break;
        case keyCodes.LEFT:
            key.Left = false;
            break;
        case keyCodes.RIGHT:
            key.Right = false;
            break;
        case keyCodes.SPACE:
            key.Space = false;
            break;
        case keyCodes.SHIFT:
            key.Shift = false;
            break;
    }
});
//# sourceMappingURL=Player.js.map