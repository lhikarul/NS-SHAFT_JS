import { DataStore } from "./base/DataStore";
import { Ladder } from "./runtime/Ladder";
import { Vector } from "./base/Vector";
import {Player} from './player/Player';
import {TweenMax} from 'gsap';

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.player = null;
        this.ladders = [];
        this.width = 700;
        this.height = window.innerHeight;
        this.ladderType = [
            "normal","jump","slideLeft","slideRight","hurt","fade"
        ]
        this.hurt = 0;
        this.playing = false;
        this.keyStatus = {
            left: false,
            right: false
        }
        this.time = 0;
    }
    createLadders () {
        this.ladders = [];
        const wh = this.dataStore.get('wh');
        for (let i=0; i < wh/150; i++) {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * this.width, (i * 150) + 100),
                type: this.ladderType[parseInt(Math.random() * this.ladderType.length)]
            }))
        }
        console.log(this.ladders)
    }
    createPlayer () {
        this.player = new Player({
            p: new Vector(this.width/2,200)
        })
    }
    run () {
        requestAnimationFrame(this.draw.bind(this));
        setInterval(this.update.bind(this), 1000 / 30)
    }
    update () {
        let touching = false;
        this.player.update();

        if (this.keyStatus.left) {
            this.player.p.x -= 8;
        }
        if (this.keyStatus.right) {
            this.player.p.x += 8
        }

        this.ladders.forEach(ladder => {
            ladder.update();
            if (ladder.p.x - ladder.width / 2 < this.player.p.x + this.player.width / 2 && ladder.p.x + ladder.width / 2 > this.player.p.x - this.player.width / 2) {
                if (this.player.p.y > ladder.p.y && this.player.p.y < ladder.p.y + ladder.height + 10) {
                    touching = true;
                    ladder.step(this.player)
                    this.player.lastBlock = ladder;
                }
            }
        });

        if (!touching) {
            this.player.lastBlock = null;
        }

        if (this.player.p.y - this.player.height < 0) {
            if (this.hurt === 0) {
                this.hurt = 1;
                this.player.bloodDelta(-3);
                this.player.v.y = 2;
                this.player.p.y = 10;
                TweenMax.to(this,.5,{hurt:0});
            }
        }

        this.time += 1;
        this.dataStore.put('time',this.time);
       
        if (this.time % 20 === 0) {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * this.width,this.height),
                type: this.ladderType[parseInt(Math.random() * this.ladderType.length)]
            }))
        }

        this.ladders = this.ladders.filter(ladder => ladder.active);
    }
    draw () {
        this.dataStore.ctx.fillStyle = "black";
        this.dataStore.ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

        const wh = this.dataStore.get('wh');
        const ww = this.dataStore.get('ww');
        this.dataStore.ctx.save();
            this.dataStore.ctx.translate(ww/2 - this.width/2,0)
            this.player.draw();
            this.ladders.forEach(ladder => ladder.draw());
            
            this.dataStore.ctx.beginPath();
                this.dataStore.ctx.moveTo(0,0);
                this.dataStore.ctx.lineTo(0,wh)
                this.dataStore.ctx.moveTo(this.width,0)
                this.dataStore.ctx.lineTo(this.width,wh)
                this.dataStore.ctx.strokeStyle = "rgba(255,255,255,.3)"
                this.dataStore.ctx.stroke()

        this.dataStore.ctx.restore();

        this.dataStore.ctx.fillStyle = "rgba(255,0,0," + this.hurt + ")";
        this.dataStore.ctx.fillRect(0,0,ww,wh);

        this.player.drawBlood();
        requestAnimationFrame(this.draw.bind(this));
    }
}