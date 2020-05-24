export const Blood = {
    setBloodDelta (delta) {
        this.blood += delta;
        if (this.blood > this.maxBlood) {
            this.blood = this.maxBlood;
        }
        if (this.blood < 0) {
            this.blood = 0;
        }
    },
    drawBlood () {
        for (let i=0; i < this.maxBlood; i++) {
            this.ctx.fillStyle = i < this.blood ? "red" : "rgba(255,255,255,0.2)";
            this.ctx.fillRect(30 + i*15 + (i-1) * 4, 30,10,30);
        }
    }
}