import { DataStore } from "./base/DataStore";
import { Ladder } from "./runtime/Ladder";
import { Vector } from "./base/Vector";

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
        this.height = this.dataStore.get('wh');
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
    run () {
        console.log(this)
        requestAnimationFrame(this.draw.bind(this));
        setInterval(this.update.bind(this), 1000 / 30)
        // const timer = requestAnimationFrame(() => this.run())
        // this.dataStore.put('timer',timer);
    }
    update () {
        this.ladders.forEach(ladder => ladder.update());
    }
    draw () {
        this.dataStore.ctx.fillStyle = "black";
        this.dataStore.ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
        this.ladders.forEach(ladder => ladder.draw());

        requestAnimationFrame(this.draw.bind(this));
    }
}