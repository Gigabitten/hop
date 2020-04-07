import F from "./frog.js";

let frogControls = function(event) {
    var key_state = event.type == "keydown";
    switch(event.keyCode){
    case 37: //Left key
        F.player.left = key_state;
        break;
    case 38: //Up Key
        F.player.up = key_state;
        break;
    case 39: //Right Key
        F.player.right = key_state;
        break;
    case 65: //A Key
        F.player.left = key_state;
        break;
    case 68: //D key
        F.player.right = key_state;
        break;
    case 87: //W Key
        F.player.up = key_state;
        break;
    }
}

function doingControls(){
    if(F.player.collided) {
	if(F.player.up) {
            F.player.yVel = -20;
	}
	if(F.player.left) {
	    F.player.xVel = -15;
	}
	if(F.player.right) {
	    F.player.xVel = 15;
	}
    }
    F.player.collided = false;
}

export default { frogControls, doingControls, };
