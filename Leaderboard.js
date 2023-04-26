export default class Leaderboard {
    constructor(game) {
        this.game = game;
        this.topFivePlayers = [];
    }

    update() {
        this.topFivePlayers = [...this.game.circles, this.game.player];
        this.topFivePlayers.sort((a, b) => b.r - a.r);
    }

    draw(ctx) {
        if(this.game.lbToggle == 1) {
            let UbuntuB = new FontFace('UbuntuB', 'url(Ubuntu-Bold.ttf)');
            UbuntuB.load();
    
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.strokeStyle = "rgb(0,0,0)";
            let fontSize = 25; 
            ctx.lineWidth = 1.5 * (0.038*fontSize);
            let font = `bold ${fontSize}px UbuntuB`;
            ctx.font = font;
            
            for(let i = 0; i < 5; i++) {
                
                try {
                    ctx.fillText((i+1) + ". " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                    ctx.strokeText((i+1) + ". " + this.topFivePlayers[i].playerName + ": " + Math.floor(this.topFivePlayers[i].r/this.game.currentScale), 25, (i * 50) + 50);
                } catch (error) {
                    
                    ctx.fillText((i+1) + ". : ", 25, (i * 50) + 50);
                    ctx.strokeText((i+1) + ". : ", 25, (i * 50) + 50);
                    console.log("Error: " + error + " player (AI) data not retrieved, (undefined/not initialized). Problem catched. Next draw loop nulls the error.");
                }
            }
        } else if(this.game.lbToggle == -1) {
            
        }
        
    }
}