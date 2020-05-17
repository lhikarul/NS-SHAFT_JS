import { Vector } from "../base/Vector";
import { DataStore } from "../base/DataStore";
import {TweenMax} from "gsap";

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
            ctx.fillStyle = "#888";
            ctx.font="20px Ariel"
            ctx.fillText(this.type, 0 ,30)

            if (this.type === "normal" || this.type === "hurt") {
                ctx.fillRect(0,0,this.width,this.height / 2);
            }
            if (this.type == 'hurt') {
                let span = this.width/16;
                ctx.beginPath();
                    for (let i=0; i <= this.width/span; i+= 1) {
                        ctx.lineTo(i*span, -(i%2)*15);
                    }
                    ctx.fillStyle = "#ddd";
                    ctx.fill();
            }
            
            if (this.type === "jump") {
                ctx.fillStyle = "#53d337";
                ctx.fillRect(0,0,this.width,5);
                ctx.fillRect(0,this.height+this.extraHeight,this.width,5)
            }

            if (this.type === "fade") {
                ctx.fillStyle = "#ffd428";
                ctx.fillRect(0,0,this.width,this.height / 2);
            }

            if (this.type === "slideLeft" || this.type === "slideRight") {
                let time = DataStore.getInstance().map.get('time');
                for (let i=0; i < this.width/20; i+=1) {
                    let x = i * 20 + (time % 20) * (this.type === "slideLeft" ? -1 : 1);
                    if (x < 0) {
                        x = 0;
                    }
                    let width = 10;
                    if (x + width > this.width) {
                        width = this.width - x < 0 ? 0 : (this.width - x);
                    }
                    ctx.fillStyle = "red";
                    ctx.save();
                        ctx.transform(1,0,0.5,1,0,0);
                        ctx.fillRect(x,0,width,this.height);
                    ctx.restore();

                }
            }

       ctx.restore();
    }
    step (player) {
        player.v.y = 0;
        if (player.lastBlock !== this) {
            player.bloodDelta(1)
        }
        if (this.type !== "fade") {
            player.p.y = this.p.y;
        }

        if (this.type === "hurt") {
            if (player.lastBlock !== this) { 
                player.bloodDelta(-2)
            }
        }

        if (this.type === "jump") {
            player.v.y = -15;
            this.extraHeight = 10;
            TweenMax.to(this,0.2,{extraHeight: 0})
        }
        if (this.type === "slideLeft") {
            player.p.x -= 3;
        }

        if (this.type === "slideRight") {
            player.p.x += 3;
        }

        if (this.type === "fade") {
            player.p.y -= 3;
        }
    }
}