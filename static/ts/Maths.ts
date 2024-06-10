import { canvasSize } from "./Main.js"

const Maths = Math


/** for screen coords */
export class Vec2 {
    x: number
    y: number
    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }
    static list(arr:[number, number]):Vec2 {return new Vec2(arr[0], arr[1])}
    static fromImgData(img:ImageData) {return new Vec2(img.width, img.height)}
    static get i() {return new Vec2(1, 0)}
    static get j() {return new Vec2(0, 1)}
    get xy():[number, number] {return [this.x, this.y]}
    get len() {return Maths.sqrt(this.x**2 + this.y**2)}
    map(lambda: (x:number) => number) { return new Vec2(lambda(this.x), lambda(this.y)) }
    thing(b: Vec2|[number,number], lambda: (x:number,y:number)=>number): Vec2
    {return (b instanceof Vec2) ? new Vec2(lambda(this.x,b.x), lambda(this.y,b.y)) : this.thing(Vec2.list(b), lambda)}
    add(b: Vec2|[number,number]) {return this.thing(b, (x:number,y:number)=>{return x+y})}
    sub(b: Vec2|[number,number]) {return this.thing(b, (x:number,y:number)=>{return x-y})}
    hadm(b: Vec2|[number,number]) {return this.thing(b, (x:number,y:number)=>{return x*y})}
    hadd(b: Vec2|[number,number]) {return this.thing(b, (x:number,y:number)=>{return x/y})}
    mul(s: number) {return new Vec2(this.x*s, this.y*s)}
    div(s: number) {return new Vec2(this.x/s, this.y/s)}
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
    map(lambda: (x:number) => number) { return new Vec3(lambda(this.x), lambda(this.y), lambda(this.z)) }
    static get i() {return new Vec3(1, 0, 0)}
    static get j() {return new Vec3(0, 1, 0)}
    static get k() {return new Vec3(0, 0, 1)}
    round(places:number) {return this.map((x:number) => Maths.floor(x*(10**places))/(10**places))}
    truncate(places:number) {return this.map((x:number) => ((x*(10**places))-(x*(10**places)%1))/(10**places))}
    get len() {return Maths.sqrt(this.x**2 + this.y**2 + this.z**2)}
    get norm() { return this.div(this.len)}
    get neg() { return this.mul(-1) }
    thing(b: Vec3|[number,number,number], lambda: (x:number,y:number)=>number): Vec3
    {return (b instanceof Vec3) ? new Vec3(lambda(this.x,b.x), lambda(this.y,b.y), lambda(this.z,b.z)) : this.thing(Vec3.list(b), lambda)}

    add(b: Vec3|[number,number,number]) {return this.thing(b, (x:number,y:number)=>{return x+y})}
    sub(b: Vec3|[number,number,number]) {return this.thing(b, (x:number,y:number)=>{return x-y})}
    hadm(b: Vec3|[number,number,number]) {return this.thing(b, (x:number,y:number)=>{return x*y})}
    hadd(b: Vec3|[number,number,number]) {return this.thing(b, (x:number,y:number)=>{return x/y})}

    mul(s: number) {return new Vec3(this.x*s, this.y*s, this.z*s)}
    div(s: number) {return new Vec3(this.x/s, this.y/s, this.z/s)}


    /** transforms an easy to use vector to a renderable one
     *  i.e world gets moved and scaled to centre of screen
    */
    get screen():Vec2 {
        return this.iso
            .add([0, -3.5])
            .div(3.5)
            .hadm([1,-1])
            .mul(canvasSize.height/2.75)
            .add([canvasSize.width/2, canvasSize.height/2])
            .round
    }
}