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
        case keyCodes.UP:
        case keyCodes.W:
            key.Up = true;
            break;
        case keyCodes.DOWN:
        case keyCodes.S:
            key.Down = true;
            break;
        case keyCodes.LEFT:
        case keyCodes.A:
            key.Left = true;
            break;
        case keyCodes.RIGHT:
        case keyCodes.D:
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
        case keyCodes.UP:
        case keyCodes.W:
            key.Up = false;
            break;
        case keyCodes.DOWN:
        case keyCodes.S:
            key.Down = false;
            break;
        case keyCodes.LEFT:
        case keyCodes.A:
            key.Left = false;
            break;
        case keyCodes.RIGHT:
        case keyCodes.D:
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