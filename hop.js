import N from "./src/newton.js";
import R from "./src/render.js";
import C from "./src/collision.js";

const gameSpeed = 60;
const timeStep = 1000 / gameSpeed;
let t0 = performance.now();
let frameCount = 0;

// pretty straightforward way to keep track of time - 
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
/* an example object with a rendering function of its own since I'm not sure exactly how I want to
 * do the pre-built rendering functions yet
 */
let rect = new N.Mover(1200, 350, 15, -25, 0, 0, [
    N.defaultMoveFunc,
    N.collideSimple,
    N.applyFriction,
    N.bounceOffWalls,
    N.projectileMotion,
]); // ...infinite loop if projectileMotion is before bounceOffWalls???
rect.draw = function(obj) {
    R.context.fillStyle = "#ff0000";
    R.context.beginPath();
    // I need to look into exactly how this works because I'm not really sure what a path is
    R.context.rect(obj.xPos, obj.yPos, 50, 50);
    R.context.fill();
}
// eventually we're gonna probably have constructors somewhere that do this pushing for us, probably
N.bodies.push(rect);
R.visibles.push(rect);
/* That's it. A 50x50 red square that comes up off the bottom left with quite some speed and falls
 * back down, in only 8 lines of code. Ideally it would only be 2, but that will come with time. I
 * hope this demonstrates the system I made pretty well! I think it turned out excellent.
 * It even has air friction! 
 */

window.requestAnimationFrame(gameLoop);
