import { Vector } from "../base/Vector"
import { DataStore } from "../base/DataStore";
import { Blood } from "./Blood";

export class Player extends Blood {
    static getInstance(width=700) {
        if (!Player.instance) {
            Player.instance = new Player({
                p: new Vector(width/2,200)
            });
        }
        return Player.instance;
    }
    constructor(args) {
        super(10,10)
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,0),
            a: new Vector(0,0.8),
            width: 40,
            height: 55,
            lastLadder: null,
            hurt: 0
        }
        Object.assign(def,args);
        Object.assign(this,def);
    }
    get ctx () {
        return DataStore.getInstance().ctx;
    }
    update () {
        this.p = this.p.add(this.v);
        this.v = this.v.add(this.a);
    }
    draw () {
        this.update();
        this.ctx.fillStyle = "#eee";
        this.ctx.fillRect(this.p.x - this.width/2, this.p.y - this.height,this.width,this.height);
    }
    drawBlood () {
        super.draw();
    }
}