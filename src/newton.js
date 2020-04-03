import R from "./render.js";

const fG = 0.9; // force of gravity
const cF = 0.995; // coefficient of friction

let bodies = [];

class Body {
    constructor() {
	this.xPos = 1000000;
	this.yPos = 1000000;
	this.xVel = 0;
	this.yVel = 0;
	this.xAcc = 0;
	this.yAcc = 0;
	this.physicsBehaviors = [];
    }
}

/* Bodies are objects which can move. Their default position is offscreen, far to the bottom right,
 * assuming you don't, for some awful reason, make a mover bigger than the screen.
 * Technically, a mover can not have velocity or acceleration and never move. Whatever.
 */
class Mover extends Body {
    constructor(xPos, yPos, xVel, yVel, xAcc, yAcc, physicsBehaviors) {
	super();
	if(xPos !== undefined) {
	    this.xPos = xPos;
	} 
	
	if(yPos !== undefined) {
	    this.yPos = yPos;
	} 
	
	if(xVel !== undefined) {
	    this.xVel = xVel;
	} 
	
	if(yVel !== undefined) {
	    this.yVel = yVel;
	} 

	if(xAcc !== undefined) {
	    this.xAcc = xAcc;
	} 
	
	if(yAcc !== undefined) {
	    this.yAcc = yAcc;
	} 

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
} /* equals signs are important here! if collision sets this exactly equal to this number, it will
   * fail the check. This is only temporary example code for this, but it might be an important 
   * illustration of an idea to keep in mind.
   */

let collideSimple = function(obj) {
    if(obj.xPos <= 0) obj.xPos = 0;
    if(obj.yPos >= R.gameHeight - 50) obj.yPos = R.gameHeight - 50;
    if(obj.xPos >= R.gameWidth - 50) obj.xPos = R.gameWidth - 50;
    if(obj.yPos <= 0) obj.yPos = 0;
} 

let doPhysics = function() {
    /* Not gonna check for undefined, here. The array is called "bodies." You should only be putting
     * bodies in.
     */
    bodies.forEach(x => {
	x.physicsBehaviors.map(p => { p(x); });
    });
}

export default { Body, defaultMoveFunc, projectileMotion, bodies, doPhysics,
		 applyFriction, bounceOffWalls, collideSimple, Mover
	       };
