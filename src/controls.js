import F from "./frog.js";
import N from "./newton.js";
import C from "./collision.js";

const speed = 8;
const jumpSpeed = 20;

let p = F.player;

let frogControls = function(event) {
    var key_state = event.type == "keydown";
    switch(event.keyCode) {
    case 65: //A Key
    case 37: //Left Key
        p.left = key_state;
        break;
	
    case 87: //W Key	
    case 38: //Up Key
        p.up = key_state;
        break;
	
    case 68: //D Key	
    case 39: //Right Key
        p.right = key_state;
        break;

    case 83: // S Key
    case 40: // Down Key
	p.down = key_state;
    }
}

function updateState() {
    switch(p.state) {
    case "leftWallHang":
    case "rightWallHang":
	if(p.lockedX !== p.x) p.state = "airborne";
	if(!C.isInRange(p.y, p.min, p.max)) p.state = "airborne";
	break;
    case "ceilingHang":
    case "grounded":	
	if(p.lockedY !== p.y) p.state = "airborne";
	if(!C.isInRange(p.x, p.min, p.max)) p.state = "airborne";
	break;
    case "airborne":
	if(p.landed) {
	    p.state = "grounded";
	    p.lockedY = p.y;
	}
	if(p.hitLeftWall) {
	    p.state = "leftWallHang";
	    p.lockedX = p.x;
	}
	if(p.hitRightWall) {
	    p.state = "rightWallHang";
	    p.lockedX = p.x;
	}
	if(p.hitCeiling) {
	    p.state = "ceilingHang";
	    p.lockedY = p.y;
	}
	break;
    }
}

function dealWithGravity() {
    if(p.state !== "airborne") {
	p.physicsBehaviors = N.noGrav;
	if(p.state !== p.lastState) {
	    F.xVel = 0;
	    F.yVel = 0;
	}
    }
    else {
	p.physicsBehaviors = N.basicMove;
    }
}

function doingControls(){
    p.lastState = p.state;
     
    updateState();
    
    p.landed = false; // these have to be set somewhere else to become true
    p.hitLeftWall = false;
    p.hitRightWall = false;
    p.hitCeiling = false;

    switch(p.state) {
    case "airborne":
	if(Math.abs(p.xVel) < jumpSpeed / 2) {
	    if(p.left) {
		p.xVel -= speed / 8;
	    }
	    if(p.right) {
		p.xVel += speed / 8;
	    }
	} // a little bit of aerial control
	break;

    case "grounded":
	if(p.left) {
	    p.xVel = -speed;
	}
	if(p.right) {
	    p.xVel = speed;
	}
	if(p.up) {
            p.yVel = -jumpSpeed;
	    if(p.left) p.xVel -= jumpSpeed / 2;
	    if(p.right) p.xVel += jumpSpeed / 2;
	    // jumps feel like crap if you don't give them extra velocity in both relevant directions
	    // so I add half the jumpspeed to the current speed
	}
	break;

    case "leftWallHang":
	if(p.up) {
            p.yVel = -speed;
	}
	if(p.down) {
	    p.yVel = speed;
	}
	if(p.right) {
	    p.xVel = jumpSpeed;
	    if(p.up) p.yVel -= jumpSpeed / 2;
	    if(p.down) p.yVel += jumpSpeed / 2;
	}	
	break;

    case "rightWallHang":
	if(p.up) {
            p.yVel = -speed;
	}
	if(p.down) {
	    p.yVel = speed;
	}
	if(p.left) {
	    p.xVel = -jumpSpeed;
	    if(p.up) p.yVel -= jumpSpeed / 2;
	    if(p.down) p.yVel += jumpSpeed / 2;
	}	
	break;

    case "ceilingHang":
	if(p.down) {
            p.yVel = jumpSpeed;
	    if(p.left) p.xVel -= jumpSpeed / 2;
	    if(p.right) p.xVel += jumpSpeed / 2;
	}
	if(p.left) {
	    p.xVel = -speed;
	}
	if(p.right) {
	    p.xVel = speed;
	}	
	break;
    }

    dealWithGravity();
}

export default { frogControls, doingControls, };
