import {DataStore} from './js/base/DataStore';
import { Director } from './js/Director';
export class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.dataStore.ctx = this.ctx;
        this.init();
    }
    init () {
        this.dataStore
                    .put('wh',window.innerHeight)
                    .put('ww', window.innerWidth)

        this.registerEvent();
        this.director.createPlayer();
        this.director.createLadders();
        this.director.playing = true;
        this.director.run();
    }
    registerEvent () {
        window.addEventListener("keydown", (evt) => {
            let key = evt.key.replace("Arrow","").toLowerCase();
            this.director.keyStatus[key] = true;
        })

        window.addEventListener("keyup", (evt) => {
            let key = evt.key.replace("Arrow","").toLowerCase();
            this.director.keyStatus[key] = false;
        })

        document.getElementById("game_start_btn").addEventListener('click',() => {
            this.init();
        })
    }
}