export default class Inputs {
    constructor(game, player) {
        this.game = game;
        this.player = player;
       


        document.addEventListener("keydown", (e) => {
            this.handleKey(e.key.toLowerCase(), true);
        });

        document.addEventListener("keyup", (e) => {
            this.handleKey(e.key.toLowerCase(), false);
        });

        document.addEventListener("mousedown", (e) => {
            let button = e.button;
            if(button == 0) {
                if(!this.game.player.deleted) {
                    this.player.shooting = true;
                }
                

            }

            if(button == 2) {
                if(!this.game.player.deleted) {
                    this.player.shooting = true;
                }
            }

        });

        document.addEventListener("wheel", (e) => {
            if(e.wheelDelta > 0) {
                this.game.zoomin();
            }    
            else if(e.wheelDelta < 0) {
                this.game.zoomout();
            }
        });

        document.addEventListener("mouseup", (e) => {
            let button = e.button;
            if(button == 0) {
                this.player.shooting = false;
                
            }

            if(button == 2) {
                this.player.shooting = false;
                
            }

        });

        document.addEventListener("mousemove", (e) => {
            this.player.mouseX = e.clientX;
            this.player.mouseY = e.clientY;
        });
    }

    handleKey(key, isPressed) {
        if(key == "w") {
            this.player.up = isPressed;
        }
        if(key == "a") {
            this.player.left = isPressed;
        }
        if(key == "s") {
            this.player.down = isPressed;
        }
        if(key == "d") {
            this.player.right = isPressed;
        }
    }

    
}