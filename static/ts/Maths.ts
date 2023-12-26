/** for screen coords */
class Vec2 {
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
class Vec3 {
    x: number
    y: number
    z: number
    readonly vx = new Vec2(1,0.5)
    readonly vy = new Vec2(-1,0.5)
    /** z up */
    constructor(x:number, y:number, z:number) {
        this.x = x
        this.y = y
        this.z = z
    }
    get iso() {
        let flat = this.vx.mul(this.x).add(this.vy.mul(this.x))
        let vertical = new Vec2(0, this.z)
        return flat.add(vertical)
    }
    add(b: Vec3) {return new Vec3(this.x+b.x, this.y+b.y, this.z+b.z)}
    sub(b: Vec3) {return new Vec3(this.x-b.x, this.y-b.y, this.z-b.z)}
    mul(s: number) {return new Vec3(this.x*s, this.y*s, this.z*s)}
    div(s: number) {return new Vec3(this.x/s, this.y/s, this.z/s)}
}