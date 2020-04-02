const fG = 0.4; // force of gravity
const cF = 0.995; // coefficient of friction

let bodies = [];

/* Bodies are objects which can move. Their default position is offscreen, far to the bottom right,
 * assuming you don't, for some awful reason, make a mover bigger than the screen.
 * Technically, a mover can not have velocity or acceleration and never move. Whatever.
 */
class Body {
    constructor(xPos, yPos, xVel, yVel, xAcc, yAcc, moveThis) {
	if(xPos !== undefined) {
	    this.xPos = xPos;
	} else this.xPos = 1000000;
	
	if(yPos !== undefined) {
	    this.yPos = yPos;
	} else this.yPos = 1000000;
	
	if(xVel !== undefined) {
	    this.xVel = xVel;
	} else this.xVel = 0;
	
	if(yVel !== undefined) {
	    this.yVel = yVel;
	} else this.yVel = 0;
	// god this is awfully tedious
	if(xAcc !== undefined) {
	    this.xAcc = xAcc;
	} else this.xAcc = 0;
	
	if(yAcc !== undefined) {
	    this.yAcc = yAcc;
	} else this.yAcc = 0;

	if(moveThis !== undefined) {
	    this.moveThis = moveThis;
	} else this.moveThis = defaultMoveFunc;
    }
}

let defaultMoveFunc = function(obj) {
    obj.xVel += obj.xAcc;
    obj.yVel += obj.yAcc;
    obj.xVel *= cF;
    obj.yVel *= cF;
    obj.xPos += obj.xVel;
    obj.yPos += obj.yVel;
} // pretty straightforward

let projectileMotion = function(obj) {
    obj.xVel += obj.xAcc;
    obj.yVel += fG;
    obj.xVel *= cF;
    obj.yVel *= cF;
    obj.xPos += obj.xVel;
    obj.yPos += obj.yVel; 
} // same, but with gravity constantly affecting the y axis - the y acceleration does nothing

let doPhysics = function() {
    /* Not gonna check for undefined, here. The array is called "bodies." You should only be putting
     * bodies in.
     */
    bodies.forEach(x => {
	x.moveThis(x);
    });
}

export default { Body, defaultMoveFunc, projectileMotion, bodies, doPhysics,
	       };
