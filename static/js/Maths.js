"use strict";
/** for screen coords */
class Vec2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(b) { return new Vec2(this.x + b.x, this.y + b.y); }
    sub(b) { return new Vec2(this.x - b.x, this.y - b.y); }
    mul(s) { return new Vec2(this.x * s, this.y * s); }
    div(s) { return new Vec2(this.x / s, this.y / s); }
}
/** for world coords */
class Vec3 {
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
        let flat = this.vx.mul(this.x).add(this.vy.mul(this.x));
        let vertical = new Vec2(0, this.z);
        return flat.add(vertical);
    }
    add(b) { return new Vec3(this.x + b.x, this.y + b.y, this.z + b.z); }
    sub(b) { return new Vec3(this.x - b.x, this.y - b.y, this.z - b.z); }
    mul(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
    div(s) { return new Vec3(this.x / s, this.y / s, this.z / s); }
}
//# sourceMappingURL=Maths.js.map