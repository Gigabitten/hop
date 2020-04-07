import R from "./render.js";

const fG = 1.5; // force of gravity
const cF = 0.995; // coefficient of friction
// has to be between 0 and 1, preferably close to 1

let bodies = [];

function extendsBody(obj) {
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
let mover = function(obj, x, y, xVel, yVel, xAcc, yAcc, physicsBehaviors) {
    extendsBody(obj);
    if(x !== undefined) obj.x = x;
    if(y !== undefined) obj.y = y;	
    if(xVel !== undefined) obj.xVel = xVel;	
    if(yVel !== undefined) obj.yVel = yVel;
    if(xAcc !== undefined) obj.xAcc = xAcc;	
    if(yAcc !== undefined) obj.yAcc = yAcc;
    if(physicsBehaviors !== undefined && physicsBehaviors[0] !== undefined) {
	obj.physicsBehaviors = physicsBehaviors;
    } 
    
}

let applyVel = function(obj) {
    obj.x += obj.xVel;
    obj.y += obj.yVel;
} // pretty straightforward

let applyFriction = function(obj) {
    obj.xVel *= cF;
    obj.yVel *= cF;
}

let projectileMotion = function(obj) {
    obj.yVel += fG;
} 

let basicMove = [
    applyVel,
    projectileMotion,
    applyFriction,
];

let doPhysics = function() {
    bodies.forEach(x => {
	if(x.physicsBehaviors !== undefined) {
	    x.physicsBehaviors.map((doStep, index) => {
		let returnVal = doStep(x); // mutates x
		if(returnVal === -1) x.physicsBehaviors.splice(index,1);
	    });
	}
    });
}

export default { projectileMotion, bodies, doPhysics, applyFriction, mover,
		 basicMove, applyVel, 
	       };
