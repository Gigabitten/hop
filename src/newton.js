import R from "./render.js";

const fG = 0.9; // force of gravity
const cF = 0.995; // coefficient of friction
// has to be between 0 and 1, preferably close to 1

let bodies = [];

function extendsBody(obj) {
    obj.xPos = 1000000;
    obj.yPos = 1000000;
    obj.xVel = 0;
    obj.yVel = 0;
    obj.xAcc = 0;
    obj.yAcc = 0;
    
    obj.physicsBehaviors = [];
}

/* Bodies are objects which can move. Their default position is offscreen, far to the bottom right,
 * assuming you don't, for some awful reason, make a mover bigger than the screen.
 * Technically, a mover can not have velocity or acceleration and never move. Whatever.
 */
class Mover {
    constructor(xPos, yPos, xVel, yVel, xAcc, yAcc, physicsBehaviors) {
	extendsBody(this);
	if(xPos !== undefined) this.xPos = xPos;
	if(yPos !== undefined) this.yPos = yPos;	
	if(xVel !== undefined) this.xVel = xVel;	
	if(yVel !== undefined) this.yVel = yVel;
	if(xAcc !== undefined) this.xAcc = xAcc;	
	if(yAcc !== undefined) this.yAcc = yAcc;
	if(physicsBehaviors !== undefined && physicsBehaviors[0] !== undefined) {
	    this.physicsBehaviors = physicsBehaviors;
	} 
    }
}

let defaultMoveFunc = function(obj) {
    obj.xPos += obj.xVel;
    obj.yPos += obj.yVel;
} // pretty straightforward

let applyFriction = function(obj) {
    obj.xVel *= cF;
    obj.yVel *= cF;
}

let projectileMotion = function(obj) {
    obj.yVel += fG;
} 

let bounceOffWalls = function(obj) {
    if(obj.xPos <= 0 || obj.xPos >= R.gameWidth - 50) obj.xVel = -obj.xVel;
    if(obj.yPos <= 0 || obj.yPos >= R.gameHeight - 50) obj.yVel = -obj.yVel;

    if(obj.xPos <= 0) obj.xPos = 0;
    if(obj.yPos >= R.gameHeight - 50) obj.yPos = R.gameHeight - 50;
    if(obj.xPos >= R.gameWidth - 50) obj.xPos = R.gameWidth - 50;
    if(obj.yPos <= 0) obj.yPos = 0;    
} /* equals signs are important here! if collision sets this exactly equal to this number, it will
   * fail the check. This is only temporary example code for this, but it might be an important 
   * illustration of an idea to keep in mind.
   */

let doPhysics = function() {
    bodies.forEach(x => {
	x.physicsBehaviors.map((doStep, index) => {
	    let returnVal = doStep(x); // mutates x
	    if(returnVal === -1) x.physicsBehaviors.splice(index,1);
	});
    });
}

export default { defaultMoveFunc, projectileMotion, bodies, doPhysics, applyFriction, Mover,
		 bounceOffWalls,
	       };
