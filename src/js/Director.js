import { DataStore } from "./base/DataStore";
import { Ladder } from "./runtime/Ladder";
import { Vector } from "./base/Vector";
import {Player} from './player/Player';

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
                type: this.ladderType[parseInt(this.ladderType.length)]
            }))
        }
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
        this.ladders.forEach(ladder => {
            ladder.update();
            if (ladder.p.x - ladder.width / 2 < this.player.p.x + this.player.width / 2 && ladder.p.x + ladder.width / 2 > this.player.p.x - this.player.width / 2) {
                if (this.player.p.y > ladder.p.y && this.player.p.y < ladder.p.y + ladder.height + 10) {
                    touching = true;
                    ladder.step(this.player)
                }
            }
        });

        this.time += 1;
       
        if (this.time % 20 === 0) {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * this.width,this.height),
                type: this.ladderType[parseInt(this.ladderType.length)]
            }))
        }

        this.ladders = this.ladders.filter(ladder => ladder.active);
    }
    draw () {
        this.dataStore.ctx.fillStyle = "black";
        this.dataStore.ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

        this.player.draw();
        this.ladders.forEach(ladder => ladder.draw());

        requestAnimationFrame(this.draw.bind(this));
    }
}