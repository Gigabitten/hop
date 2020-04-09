import N from "./src/newton.js";
import R from "./src/render.js";
import C from "./src/collision.js";
import S from "./src/shapes.js";
import U from "./src/utils.js";
import F from "./src/frog.js";
import Con from "./src/controls.js";

const gameSpeed = 60;
const timeStep = 1000 / gameSpeed; // 16.666...
let t0 = performance.now();
let frameCount = 0;

S.buildWall(-50, -50, 1380, 51, '#000000');
S.buildWall(-50, 719, 1380, 51, '#000000');
S.buildWall(-49, -50, 50, 820, '#000000');
S.buildWall(1279, -50, 50, 820, '#000000');

S.buildWall(200, 450, 80, 200, '#ff0000');

let gameLoop = function() {
    let t = performance.now();
    if(frameCount * timeStep < t - t0) {
	frameCount++;
	N.doPhysics();
	C.doCollisions();	
	Con.doingControls();
	R.redraw();
    }
    window.requestAnimationFrame(gameLoop);
}
// TODO: add visibility/collidability manager to game loop
window.addEventListener("keydown", Con.frogControls); //key being pressed
window.addEventListener("keyup", Con.frogControls);   //key being released

window.requestAnimationFrame(gameLoop);
