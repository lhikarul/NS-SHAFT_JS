import { DataStore } from "./base/DataStore";
import { Ladders } from "./runtime/Ladders";
import { Vector } from "./base/Vector";
import { Player } from "./Player/Player";
import { TweenMax } from "gsap/gsap-core";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance;
    }
    constructor() {
        this.width = 700;
        this.dataStore = DataStore.getInstance();
        this.player = Player.getInstance(this.width);
        this.dataStore.set('time',0);
        this.time = this.dataStore.get('time');
        this.laddersType = [
            "normal","jump","slideLeft","slideRight",
            "hurt","fade"
        ]
        this.keyStatus = {
            left: false,
            right: false
        }
        this.isGameOver = true;
    }

    get ctx () {
        return this.dataStore.ctx;
    }

    createLadders(inner = true) {
       const wh = this.dataStore.get('wh');

       let ladders = this.dataStore.get('ladders');
        if (inner) {
            // wh/150 --> 每個階梯的間隔為 150
            for (let i=0; i < wh/150; i++) {
                ladders.push(new Ladders({
                    p: new Vector(Math.random() * this.width, i * 150 + 100), // i=0, 樓梯 Y 為100, i=1, Y 為 250, 不停的向下增加樓梯
                    type: this.laddersType[parseInt(Math.random() * this.laddersType.length)]
                }))
            }
        }else {
            ladders.push(new Ladders({
                p: new Vector(Math.random() * this.width, wh),
                type: this.laddersType[parseInt(Math.random() * this.laddersType.length)]
            }))
        }

        // remove ladders
        ladders = ladders.filter(ladder => ladder.active);

        this.dataStore.set('ladders',ladders);
    }

    checkTouching (ladder) {
        let touching = false;
        const wh = this.dataStore.get('wh');

        if (this.player.p.y > wh + this.player.height) {
            console.log(this.player.p.y)
            this.isGameOver = true;
        }

        if (ladder.p.x - ladder.width/2 < this.player.p.x + this.player.width / 2 
                && ladder.p.x + ladder.width/2 > this.player.p.x - this.player.width / 2
                    && this.player.p.y > ladder.p.y
                        && this.player.p.y < ladder.p.y + ladder.height + 10) {
            touching = true;
            ladder.step(this.player);
            this.player.lastLadder = ladder;
        }

        if (this.player.p.y - this.player.height < 0) {
            if (this.player.hurt === 0) {
                this.player.hurt = 1;
                this.player.bloodDelta(-3);
                this.player.v.y = 3;
                this.player.p.y = 100;
                TweenMax.to(this.player,0.5,{hurt: 0})
            }
        }

        if (this.player.p.x - this.player.width/2 < 0) {
            this.player.p.x = 0 + this.player.width;
        }

        if (this.player.p.x + this.player.width / 2 > this.width) {
            this.player.p.x = this.width - this.player.width / 2;
        }
    }

    playerMoving() {
        if (this.keyStatus.left) {
            this.player.p.x -= 4;
        }
        if (this.keyStatus.right) {
            this.player.p.x += 4;
        }
    }

    run () {

            this.time += 1;
            this.dataStore.set('time',this.time);
    
            if (this.time % 40 === 0) {
                this.createLadders(false);
            }
    
            this.playerMoving();
            this.draw();
            
            if (!this.isGameOver) {
                const timer = requestAnimationFrame(() => this.run());
                this.dataStore.set('timer ',timer)
            }else {
                cancelAnimationFrame(this.dataStore.get('timer'));
                this.dataStore.get('start_btn').style.display = "block";
                this.dataStore.destory();
                // this.player.p.y = 200;
            }
       
    }

    draw () {
        const wh = this.dataStore.get('wh');
        const ww = this.dataStore.get('ww');
        this.dataStore.get('background').draw();

        this.ctx.fillStyle = "rgba(255,0,0," + this.player.hurt + ")";
        this.ctx.fillRect(0,0,ww,wh);

        this.player.drawBlood();

        // 畫階梯層數
        this.ctx.font = "40px Ariel";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("地下: " + parseInt(this.time/100) + "階", 40, 100);

        // 移動畫布
        this.ctx.save();
            this.ctx.translate(ww/2 - this.width/2,0);

            this.dataStore.get('ladders').forEach(ladder => {
                this.checkTouching(ladder);
                ladder.draw();
            });

            this.player.draw();

            this.ctx.beginPath();
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(0,wh);
                this.ctx.moveTo(this.width,0)
                this.ctx.lineTo(this.width,wh)
                this.ctx.strokeStyle = "rgba(255,255,255,0.3)"
                this.ctx.stroke()

            // 上方的刺
            this.ctx.beginPath();
                let span = this.width / 60;
                for (let i=0; i <= this.width/span; i++) {
                    this.ctx.lineTo(i * span, (i%2) * 30) 
                } 
                this.ctx.fillStyle = "white";
                this.ctx.fill()

        this.ctx.restore();
    }
}