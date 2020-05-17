import {Vector} from '../base/Vector';
import {DataStore} from '../base/DataStore';

export class Player {
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,0),
            a: new Vector(0,0.8),
            width: 40,
            height: 55,
            blood: 10,
            maxBlood: 10,
            lastBlock: null
        }

        Object.assign(def,args)
        Object.assign(this,def)
    }
    update () {
        this.p = this.p.add(this.v);
        this.v = this.v.add(this.a);
    }
    draw () {
        const ctx = DataStore.getInstance().ctx;
        ctx.fillStyle = "#eee";
        ctx.fillRect(this.p.x - this.width / 2, this.p.y - this.height, this.width, this.height)
    }
    drawBlood () {
        const ctx = DataStore.getInstance().ctx;
        for (let i=0; i < this.maxBlood; i++) {
            ctx.fillStyle = i < this.blood ? "red" : "rgba(255,255,255,.2)";
            ctx.fillRect(30 + i*15 + (i-1) * 4, 30, 10, 30)
        }
    }
    bloodDelta(delta) {
        this.blood += delta;
        if (this.blood > this.maxBlood) {
            this.blood = this.maxBlood;
        }
        if (this.blood < 0) {
            this.blood = 0;
            // game over
        }
    }
}