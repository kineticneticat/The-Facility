import { canvasSize } from "./Main.js";
/** for screen coords */
export class Vec2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get xy() { return [this.x, this.y]; }
    add(b) { return new Vec2(this.x + b.x, this.y + b.y); }
    sub(b) { return new Vec2(this.x - b.x, this.y - b.y); }
    mul(s) { return new Vec2(this.x * s, this.y * s); }
    div(s) { return new Vec2(this.x / s, this.y / s); }
    had(b) { return new Vec2(this.x * b.x, this.y * b.y); }
    get round() { return new Vec2(Math.round(this.x), Math.round(this.y)); }
}
/** for world coords */
export class Vec3 {
    x;
    y;
    z;
    vx = new Vec2(1, 0.5);
    vy = new Vec2(-1, 0.5);
    /** z up */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get iso() {
        let flat = this.vx.mul(this.x).add(this.vy.mul(this.y));
        let vertical = new Vec2(0, this.z);
        return flat.add(vertical);
    }
    add(b) { return new Vec3(this.x + b.x, this.y + b.y, this.z + b.z); }
    sub(b) { return new Vec3(this.x - b.x, this.y - b.y, this.z - b.z); }
    mul(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
    div(s) { return new Vec3(this.x / s, this.y / s, this.z / s); }
    had(b) { return new Vec3(this.x * b.x, this.y * b.y, this.z * b.z); }
    /** transforms an easy to use vector to a renderable one
     *  i.e world gets moved and scaled to centre of screen
    */
    get screen() {
        return this.iso
            .add(new Vec2(0, -3.5))
            .div(3.5)
            .had(new Vec2(1, -1))
            .mul(canvasSize.height / 2.75)
            .add(new Vec2(canvasSize.width / 2, canvasSize.height / 2));
    }
}
//# sourceMappingURL=Maths.js.map