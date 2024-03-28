import { canvasSize } from "./Main.js"

/** for screen coords */
export class Vec2 {
    x: number
    y: number
    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }
    static list(arr:[number, number]):Vec2 {return new Vec2(arr[0], arr[1])}
    get xy():[number, number] {return [this.x, this.y]}
    add(b: Vec2) {return new Vec2(this.x+b.x, this.y+b.y)}
    sub(b: Vec2) {return new Vec2(this.x-b.x, this.y-b.y)}
    mul(s: number) {return new Vec2(this.x*s, this.y*s)}
    div(s: number) {return new Vec2(this.x/s, this.y/s)}
    had(b: Vec2) {return new Vec2(this.x*b.x, this.y*b.y)}
    get round() { return new Vec2(Math.round(this.x), Math.round(this.y))}

}

/** for world coords */
let vx = new Vec2(1,0.5)
let vz = new Vec2(-1,0.5)
export class Vec3 {
    x: number
    y: number
    z: number
    /** x:left-up, y:up, z:right-up */
    constructor(x:number, y:number, z:number) {
        this.x = x
        this.y = y
        this.z = z
    }
    get iso() {
        let flat = vx.mul(this.x).add(vz.mul(this.z))
        let vertical = new Vec2(0, this.y)
        return flat.add(vertical)
    }
    get xyz(): [number, number, number] {return [this.x, this.y, this.z]}
    static list(arr: [number, number, number]):Vec3 {return new Vec3(arr[0], arr[1], arr[2])}
    add(b: Vec3) {return new Vec3(this.x+b.x, this.y+b.y, this.z+b.z)}
    sub(b: Vec3) {return new Vec3(this.x-b.x, this.y-b.y, this.z-b.z)}
    mul(s: number) {return new Vec3(this.x*s, this.y*s, this.z*s)}
    div(s: number) {return new Vec3(this.x/s, this.y/s, this.z/s)}
    had(b: Vec3) {return new Vec3(this.x*b.x, this.y*b.y, this.z*b.z)}

    /** transforms an easy to use vector to a renderable one
     *  i.e world gets moved and scaled to centre of screen
    */
    get screen():Vec2 {
        return this.iso
            .add(new Vec2(0, -3.5))
            .div(3.5)
            .had(new Vec2(1,-1))
            .mul(canvasSize.height/2.75)
            .add(new Vec2(canvasSize.width/2, canvasSize.height/2))
    }
}