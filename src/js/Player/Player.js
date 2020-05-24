import {Vector} from '../base/Vector';
import { DataStore } from '../base/DataStore';
import {Blood} from './Blood';

export class Player {
    static getInstance(width=700) {
        if (!Player.instance) {
            Player.instance = new Player({
                p: new Vector(width/2,200)
            })
        }
        return Player.instance;
    }
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,0),
            a: new Vector(0,0.8),
            width: 40,
            height: 55,
            blood: 10,
            maxBlood: 10,
            hurt: 0,
            lastLadder: null
        }
        Object.assign(def,args);
        Object.assign(this,def,Blood);
    }
    get ctx () {
        return DataStore.getInstance().ctx;
    }
    update () {
        this.p = this.p.add(this.v);
        this.v = this.v.add(this.a);
    }
    draw () {
        this.ctx.fillStyle = "white";
        const x = this.p.x - this.width/2;
        const y = this.p.y - this.height;
        this.ctx.fillRect(x,y,this.width,this.height);
    }
}