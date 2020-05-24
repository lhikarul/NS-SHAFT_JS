import { Vector } from "../base/Vector";
import { DataStore } from "../base/DataStore";
import {Director} from '../Director';
import {TweenMax} from 'gsap';

export class Ladder {
    constructor(args) {
        const def = {
            p: new Vector(0,0),
            v: new Vector(0,-3),
            a: new Vector(0,0),
            width: 150,
            height: 20,
            active: true,
            extraHeight: 0,
            type: "normal"
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

        if (this.p.y < -20) {
            this.active = false;
        }
    }
    draw () {
        this.ctx.save()

        // 階梯以中心點向左一半的距離開始畫,階梯的中心點會交集邊界的垂直線
            this.ctx.translate(this.p.x - this.width/2,this.p.y);
            
            this.ctx.fillStyle = "white";
            this.ctx.font = "20px Ariel"
            this.ctx.fillText(this.type,0,50)

            if (this.type === "normal" || this.type === "hurt") {
                this.ctx.fillStyle = "#888";
                this.ctx.fillRect(0,0,this.width,this.height);
            }

            if (this.type === "jump") {
                this.ctx.fillStyle = "#53d337";
                this.ctx.fillRect(0,0,this.width,5);
                this.ctx.fillRect(0,this.height + this.extraHeight, this.width,5);
            }

            if (this.type === "hurt") {
                let span = this.width / 16;
                this.ctx.beginPath();
                for (let i=0; i <= this.width/span; i++) {
                    this.ctx.lineTo(i * span, -(i%2) * 15);
                }
                this.ctx.fillStyle = "white";
                this.ctx.fill();
            }

            if (this.type === "fade") {
                this.ctx.fillStyle = "yellow";
                this.ctx.fillRect(0,0,this.width,this.height);
            }

            if (this.type === "slideLeft" || this.type === "slideRight") {
                const direction = this.type === "slideLeft" ? -1 : 1;
                for (let i=0; i < this.width/20; i++) {
                    let x = i * 20 + (Director.getInstance().time % 20) * direction;
                    let width = 10;
                    if (x < 0) {
                        x = 0;
                    }
                    if (x + width > this.width) {
                        width = this.width - x < 0 ? 0 : (this.width - x);
                    }

                    this.ctx.fillStyle = "red";
                    this.ctx.save();
                        this.ctx.transform(1,0,0.5,1,0,0);
                        this.ctx.fillRect(x,0,width,this.height);
                    this.ctx.restore();
                }
            }

        this.ctx.restore();
    }
    setPlayerStanding(player) {
        player.v.y = 0;

        if (player.lastLadder !== this) {
            player.setBloodDelta(1);
        }

        if (this.type !== "fade") {
            player.p.y = this.p.y;
        }

        if (this.type === "jump") {
            player.v.y -= 15;
            this.extraHeight = 10;
            TweenMax.to(this,0.2,{extraHeight:0})
        }

        if (this.type === "hurt") {
            if (player.lastLadder != this) {
                player.setBloodDelta(-2);
                player.hurt = 1;
                TweenMax.to(player,0.5,{hurt: 0})
            }
        }

        if (this.type === "slideLeft") {
            player.p.x -= 3;
        }

        if (this.type === "slideRight") {
            player.p.x += 3;
        }

        if (this.type === "fade") {
            player.p.y -= 2;
        }
    }
}