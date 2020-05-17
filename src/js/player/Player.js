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
}