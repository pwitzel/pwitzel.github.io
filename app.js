import Game from "./Game.js";

let canv = document.querySelector("canvas");
let ctx = canv.getContext("2d");

const WIDTH = (canv.width = window.innerWidth);
const HEIGHT = (canv.height = window.innerHeight);



var game = new Game(WIDTH, HEIGHT, canv);



function gameLoop() {
    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    game.update();
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();