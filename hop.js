import N from "./src/newton.js";
import R from "./src/render.js";
import C from "./src/collision.js";
import S from "./src/shapes.js";

const gameSpeed = 60;
const timeStep = 1000 / gameSpeed; // 16.666...
let t0 = performance.now();
let frameCount = 0;

let rect = new Object();
S.rect(rect, 0, 0, 50, 50, '#ff0000');
N.mover(rect, 200, 400, 10, -15, 0, 0, [
    N.defaultMoveFunc,
    N.bounceOffWalls,
    N.projectileMotion,
    N.applyFriction,
]);
N.bodies.push(rect);
R.visibles.push(rect);

let gameLoop = function() {
    let t = performance.now();
    if(frameCount * timeStep < t - t0) {
	frameCount++;
	C.doCollisions();
	N.doPhysics();
	R.redraw();
    }
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
