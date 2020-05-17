import { Vector } from "../base/Vector";
import { DataStore } from "../base/DataStore";

export class Ladder {
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,-4),
            a: new Vector(0,0),
            width: 150,
            height: 20,
            extraHeight: 0,
            type: "normal",
            active: true          
        }
        Object.assign(def,args);
        Object.assign(this,def);
    }
    update () {
        this.p = this.p.add(this.v);
        this.v = this.v.add(this.a);

        if (this.p.y < -20) {
            this.active = false;
        }
    }
    draw () {
       const ctx = DataStore.getInstance().ctx;
       ctx.save();
            ctx.translate( this.p.x-this.width/2,this.p.y-this.extraHeight);
            ctx.fillStyle = "red";
            ctx.fillRect(0,0,this.width,this.height / 2);
       ctx.restore();
    }
    step (player) {
        player.v.y = 0;
        player.p.y = this.p.y;
    }
}