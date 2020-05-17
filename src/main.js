import {DataStore} from './js/base/DataStore';
import { Ladder } from './js/runtime/Ladder';
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

        this.director.createPlayer();
        this.director.createLadders();
        this.director.run();
    }
}