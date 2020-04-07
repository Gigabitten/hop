import N from "./newton.js";



let doControls = {
    left: false,
    right: false,
    up: false,
    keyListener: function(event) {
        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode){
            case 37: //Left key
                doControls.left = key_state;
            break;
            case 38: //Up Key
                doControls.up = key_state;
            break;
            case 39: //Right Key
                doControls.right = key_state;
            break;
            case 65: //A Key
                doControls.left = key_state;
            break;
            case 68: //D key
                doControls.right = key_state;
            break;
            case 87: //W Key
                doControls.up = key_state;
            break;
        }
    }
}

function doingControls(){
    if(doControls.up && N.bodies[0].jumping == false) //n.bodies[0] rn is player.
    {
        N.bodies[0].yVel-=20     //Move something into air
        N.bodies[0].jumping = true;
    }
    
   if(doControls.left)
   {
       N.bodies[0].xVel -= 0.5 
       
   }
   if(doControls.right)
   {
       N.bodies[0].xVel += 0.5
   }
}


export default { doControls, doingControls, };