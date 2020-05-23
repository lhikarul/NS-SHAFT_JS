import { DataStore } from "./base/DataStore";
import {Ladder} from './runtime/Ladder';
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
        this.ladders = [];
        this.time = 0;
    }
    get ctx () {
        return this.dataStore.ctx;
    }
    createLadders(firstLoaded=false) {
        const {gameWidth,wh} = this.dataStore;

        if (firstLoaded) {
            for (let i=0; i < this.dataStore.wh/150; i++) {
                this.ladders.push(new Ladder({
                    p: new Vector(Math.random() * gameWidth, i * 150 + 100)
                }))
            }
        }else {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * gameWidth, wh)
            }))
        }
        this.ladders = this.ladders.filter(ladder => ladder.active === true);
    }
    run () {

        this.createLadders(true);

        this.draw();

    }
    update (runTime) {

        this.ladders.forEach(ladder => ladder.update());

        if (runTime % 80 === 0) {
            this.createLadders();
        }
    }   
    draw () {
        this.time += 1;

        if (this.time % 2 === 0) {
            this.update(this.time);
        }

        const {ww,gameWidth} = this.dataStore;

        this.dataStore.get('background').draw();
        this.ctx.save();
            this.ctx.translate((ww-gameWidth)/2,0);
            this.ladders.forEach(ladder => ladder.draw());
        this.ctx.restore();

        requestAnimationFrame(() => this.draw());
    }
}