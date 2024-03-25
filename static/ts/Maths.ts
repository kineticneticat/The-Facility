/** for screen coords */
export class Vec2 {
    x: number
    y: number
    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }
    add(b: Vec2) {return new Vec2(this.x+b.x, this.y+b.y)}
    sub(b: Vec2) {return new Vec2(this.x-b.x, this.y-b.y)}
    mul(s: number) {return new Vec2(this.x*s, this.y*s)}
    div(s: number) {return new Vec2(this.x/s, this.y/s)}
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
    add(b: Vec3) {return new Vec3(this.x+b.x, this.y+b.y, this.z+b.z)}
    sub(b: Vec3) {return new Vec3(this.x-b.x, this.y-b.y, this.z-b.z)}
    mul(s: number) {return new Vec3(this.x*s, this.y*s, this.z*s)}
    div(s: number) {return new Vec3(this.x/s, this.y/s, this.z/s)}
}