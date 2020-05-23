import { DataStore } from "../base/DataStore";

export class Background {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    draw () {
        const {ctx,ww,wh,gameWidth} = this.dataStore;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ww,wh);
        
        // 遊戲邊界
        ctx.save();
            ctx.translate((ww-gameWidth)/2, 0);
            ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0,wh);
                ctx.moveTo(gameWidth,0);
                ctx.lineTo(gameWidth,wh);
            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.stroke();
        ctx.restore();
    }
}