import { drawLoopingAnimFrame } from "./Animation.js";
import { UnitDirections, drawPos, dt, walkSpeed } from "./Const.js";
import { getAssetData } from "./Handlers.js";
import { Vec3 } from "./Maths.js";
export let playerPos = new Vec3(0, 0, 0);
export let currentChar = "devchar";
export let screenPlayerPos;
var PlayerAnimStates;
(function (PlayerAnimStates) {
    PlayerAnimStates["IDLE"] = "";
    PlayerAnimStates["FORWARDS"] = "+x";
    PlayerAnimStates["BACKWARDS"] = "-x";
    PlayerAnimStates["LEFT"] = "+z";
    PlayerAnimStates["RIGHT"] = "-z";
    PlayerAnimStates["UP"] = "+y";
    PlayerAnimStates["DOWN"] = "-y";
})(PlayerAnimStates || (PlayerAnimStates = {}));
export let playerAnimState;
export function playerInit() {
    screenPlayerPos = new Vec3(3, 0, 3).screen;
    playerAnimState = PlayerAnimStates.IDLE;
}
export function updatePlayerState() {
    playerAnimState = key.Forwards ? PlayerAnimStates.FORWARDS : playerAnimState;
    playerAnimState = key.Backwards ? PlayerAnimStates.BACKWARDS : playerAnimState;
    playerAnimState = key.Left ? PlayerAnimStates.LEFT : playerAnimState;
    playerAnimState = key.Right ? PlayerAnimStates.RIGHT : playerAnimState;
    playerAnimState = key.Up ? PlayerAnimStates.UP : playerAnimState;
    playerAnimState = key.Down ? PlayerAnimStates.DOWN : playerAnimState;
    playerAnimState = !key.any() ? PlayerAnimStates.IDLE : playerAnimState;
}
export function isMoveAllowed(currentPos, deltaAttempt, roomname) {
    let room = getAssetData(`${roomname},room`);
    return getAssetData(room.tile(currentPos.add(deltaAttempt.round(0)))).solid
        || getAssetData(room.tile(currentPos.add(deltaAttempt.norm).add(Vec3.j.neg))).solid;
}
export function Move(roomname) {
    let deltaPos = new Vec3(0, 0, 0);
    deltaPos = key.Forwards ? deltaPos.add(UnitDirections.FORWARDS.mul(walkSpeed)) : deltaPos;
    deltaPos = key.Backwards ? deltaPos.add(UnitDirections.BACKWARDS.mul(walkSpeed)) : deltaPos;
    deltaPos = key.Left ? deltaPos.add(UnitDirections.LEFT.mul(walkSpeed)) : deltaPos;
    deltaPos = key.Right ? deltaPos.add(UnitDirections.RIGHT.mul(walkSpeed)) : deltaPos;
    deltaPos = key.Up ? deltaPos.add(UnitDirections.UP.mul(walkSpeed)) : deltaPos;
    deltaPos = key.Down ? deltaPos.add(UnitDirections.DOWN.mul(walkSpeed)) : deltaPos;
    if (isMoveAllowed(playerPos, deltaPos, roomname)) {
        playerPos = playerPos.add(deltaPos.mul(dt));
    }
}
export function DrawPlayer(ctx, pos, time) {
    updatePlayerState();
    let screenpos = pos.screen;
    drawLoopingAnimFrame(ctx, "devchar,anim", playerAnimState, Math.round(time / 10), 10, screenpos, drawPos.CENTRE);
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
export let key = {
    Forwards: false,
    Backwards: false,
    Left: false,
    Right: false,
    Up: false,
    Down: false,
    any: () => { return key.Forwards || key.Backwards || key.Left || key.Right || key.Up || key.Down; }
};
document.addEventListener('keydown', (e) => {
    // console.log(e.keyCode)
    switch (e.keyCode) {
        case keyCodes.UP:
        case keyCodes.W:
            key.Forwards = true;
            break;
        case keyCodes.DOWN:
        case keyCodes.S:
            key.Backwards = true;
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
            key.Up = true;
            break;
        case keyCodes.SHIFT:
            key.Down = true;
            break;
    }
});
document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case keyCodes.UP:
        case keyCodes.W:
            key.Forwards = false;
            break;
        case keyCodes.DOWN:
        case keyCodes.S:
            key.Backwards = false;
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
            key.Up = false;
            break;
        case keyCodes.SHIFT:
            key.Down = false;
            break;
    }
});
//# sourceMappingURL=Player.js.map