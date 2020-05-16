export class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    set(x,y) {
        this.x = x;
        this.y = y;
    }
    move(x,y) {
        this.x += x;
        this.y += y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    mul(s) {
        return new Vector(this.x * s, this.y * y);
    }
    clone () {
        return new Vector(this.x,this.y)
    }
    equal (v) {
        return this.x == v.x && this.y == v.y;
    }
    get length () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    get angle() {
    return Math.atan2(this.y,this.x); // 0 ~ 2PI 之間
    }
    get unit () {
    return this.mul(1/this.length); // 向量長度為1
    }
    set length (nv) {
        let temp = this.unit.mul(nv);
        this.set(temp.x,temp.y)
    }
}