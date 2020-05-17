export class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    set (x,y) {
        this.x = x;
        this.y = y;
    }
    move (x,y) {
        this.x += x;
        this.y += y;
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector(this.x - v.y, this.y - v.y);
    }
    mul(s) {
        return new Vector(this.x * s, this.y * s);
    }
    equal (v) {
        return this.v.x === v.x && this.v.y === v.y
    }
}