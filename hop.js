import N from "./src/newton.js";
import R from "./src/render.js";
import C from "./src/collision.js";
import S from "./src/shapes.js";
import U from "./src/utils.js";

const gameSpeed = 60;
const timeStep = 1000 / gameSpeed; // 16.666...
let t0 = performance.now();
let frameCount = 0;

let wallTop = new Object();
S.rect(wallTop, 0, -49, 1280, 50, '#000000');
wallTop.collisionHandler = C.pushOutHandler;
R.pushOntoLayer(wallTop, 10);
C.colliders.push(wallTop);

let wallBottom = new Object();
S.rect(wallBottom, 0, 719, 1280, 50, '#000000');
wallBottom.collisionHandler = C.pushOutHandler;
R.pushOntoLayer(wallBottom, 10);
C.colliders.push(wallBottom);

let wallLeft = new Object();
S.rect(wallLeft, -49, 0, 50, 720, '#000000');
wallLeft.collisionHandler = C.pushOutHandler;
R.pushOntoLayer(wallLeft, 10);
C.colliders.push(wallLeft);

let wallRight = new Object();
S.rect(wallRight, 1279, 0, 50, 720, '#000000');
wallRight.collisionHandler = C.pushOutHandler;
R.pushOntoLayer(wallRight, 10);
C.colliders.push(wallRight);

let i;
for(i = 0; i < 6; i++) {
    let r = new Object();
    let w = Math.random() * 100 + 20;
    let h = Math.random() * 100 + 20;
    let rX = Math.random() * (1280 - w);
    let rY = Math.random() * (720 - h);
    let xV = (Math.random() * 40) - 15;
    let yV = (Math.random() * 40) - 15;
    let c = "#"+((1<<24)*Math.random()|0).toString(16); // found online, not sure how it works
    S.rect(r, 0, 0, w, h, c);
    N.mover(r, rX, rY, xV, yV, 0, 0, N.bouncyFuncs);
    N.bodies.push(r);
    R.pushOntoLayer(r, 20);
    r.collisionHandler = C.pushOutHandler;
    C.colliders.push(r);
}

let gameLoop = function() {
    let t = performance.now();
    if(frameCount * timeStep < t - t0) {
	frameCount++;
	N.doPhysics();
	C.doCollisions();
	R.redraw();
    }
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
