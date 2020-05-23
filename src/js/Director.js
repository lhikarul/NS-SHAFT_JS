import { DataStore } from "./base/DataStore";
import {Ladder} from './runtime/Ladder';
import { Vector } from "./base/Vector";
import { Player } from "./Player/Player";

export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.player = Player.getInstance();
        this.ladders = [];
        this.ladderTypes = [
            "normal","jump","slideLeft","slideRight",
            "hurt","fade"
        ]
        this.keyStatus = {
            left: false,
            right: false
        }
        this.time = 0;
    }
    get ctx () {
        return this.dataStore.ctx;
    }
    checkPlayerTouchingBorder() {
        if (this.player.p.x - this.player.width/2 < 0) {
            this.player.p.x = 0 + this.player.width;
        }
        if (this.player.p.x + this.player.width/2 > this.dataStore.gameWidth) {
            this.player.p.x = this.dataStore.gameWidth - this.player.width/2;
        }
    }
    checkPlayerTouchingLadder(ladder) {
        // let touching = false;
        if (this.player.p.x + this.player.width / 2 > ladder.p.x - ladder.width/2 
            && this.player.p.x - this.player.width/2 < ladder.p.x + ladder.width/2
                && this.player.p.y > ladder.p.y
                    && this.player.p.y < ladder.p.y + ladder.height + 10) {
                ladder.setPlayerStanding(this.player);
            }
    }
    setLadders(firstLoaded=false) {
        const {gameWidth,wh} = this.dataStore;
        const LADDER_WIDTH = 150;

        if (firstLoaded) {
            for (let i=0; i < Math.floor(this.dataStore.wh/150); i++) {
                console.log(Math.random() * (gameWidth - LADDER_WIDTH))
                this.ladders.push(new Ladder({
                    p: new Vector(Math.random() * gameWidth, i * 150 + 100),
                    type: this.ladderTypes[parseInt(Math.random() * this.ladderTypes.length)]
                }))
            }
        }else {
            this.ladders.push(new Ladder({
                p: new Vector(Math.random() * gameWidth, wh),
                type: this.ladderTypes[parseInt(Math.random() * this.ladderTypes.length)]
            }))
        }
        this.ladders = this.ladders.filter(ladder => ladder.active === true);
        
    }
    setPlayerMoving() {

        if (this.keyStatus.left) {
            this.player.p.x -= 8;
        }
        if (this.keyStatus.right) {
            this.player.p.x += 8;
        }
    }
    run () {

        this.setLadders(true);

        this.draw();
    }
    update (runTime) {

        this.checkPlayerTouchingBorder();
        this.setPlayerMoving();

        this.ladders.forEach(ladder => {
            ladder.update()
            this.checkPlayerTouchingLadder(ladder);
        });
        this.player.update();

        if (runTime % 60 === 0) {
            this.setLadders();
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
            this.player.draw();
        this.ctx.restore();

        requestAnimationFrame(() => this.draw());
    }
}