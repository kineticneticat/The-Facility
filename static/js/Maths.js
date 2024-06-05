import { canvasSize } from "./Main.js";
const Maths = Math;
/** for screen coords */
export class Vec2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static list(arr) { return new Vec2(arr[0], arr[1]); }
    static fromImgData(img) { return new Vec2(img.width, img.height); }
    get xy() { return [this.x, this.y]; }
    get len() { return Maths.sqrt(this.x ** 2 + this.y ** 2); }
    map(lambda) { return new Vec2(lambda(this.x), lambda(this.y)); }
    thing(b, lambda) { return (b instanceof Vec2) ? new Vec2(lambda(this.x, b.x), lambda(this.y, b.y)) : this.thing(Vec2.list(b), lambda); }
    add(b) { return this.thing(b, (x, y) => { return x + y; }); }
    sub(b) { return this.thing(b, (x, y) => { return x - y; }); }
    hadm(b) { return this.thing(b, (x, y) => { return x * y; }); }
    hadd(b) { return this.thing(b, (x, y) => { return x / y; }); }
    mul(s) { return new Vec2(this.x * s, this.y * s); }
    div(s) { return new Vec2(this.x / s, this.y / s); }
    get round() { return new Vec2(Math.round(this.x), Math.round(this.y)); }
}
/** for world coords */
let vx = new Vec2(1, 0.5);
let vz = new Vec2(-1, 0.5);
export class Vec3 {
    x;
    y;
    z;
    /** x:left-up, y:up, z:right-up */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get iso() {
        let flat = vx.mul(this.x).add(vz.mul(this.z));
        let vertical = new Vec2(0, this.y);
        return flat.add(vertical);
    }
    get xyz() { return [this.x, this.y, this.z]; }
    static list(arr) { return new Vec3(arr[0], arr[1], arr[2]); }
    map(lambda) { return new Vec3(lambda(this.x), lambda(this.y), lambda(this.z)); }
    round(places) { return this.map((x) => Maths.floor(x * (10 ** places)) / (10 ** places)); }
    truncate(places) { return this.map((x) => ((x * (10 ** places)) - (x * (10 ** places) % 1)) / (10 ** places)); }
    get len() { return Maths.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2); }
    thing(b, lambda) { return (b instanceof Vec3) ? new Vec3(lambda(this.x, b.x), lambda(this.y, b.y), lambda(this.z, b.z)) : this.thing(Vec3.list(b), lambda); }
    add(b) { return this.thing(b, (x, y) => { return x + y; }); }
    sub(b) { return this.thing(b, (x, y) => { return x - y; }); }
    hadm(b) { return this.thing(b, (x, y) => { return x * y; }); }
    hadd(b) { return this.thing(b, (x, y) => { return x / y; }); }
    mul(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
    div(s) { return new Vec3(this.x / s, this.y / s, this.z / s); }
    /** transforms an easy to use vector to a renderable one
     *  i.e world gets moved and scaled to centre of screen
    */
    get screen() {
        return this.iso
            .add([0, -3.5])
            .div(3.5)
            .hadm([1, -1])
            .mul(canvasSize.height / 2.75)
            .add([canvasSize.width / 2, canvasSize.height / 2])
            .round;
    }
}
//# sourceMappingURL=Maths.js.map