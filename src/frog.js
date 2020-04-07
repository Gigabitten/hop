import N from "./newton.js";
import R from "./render.js";
import S from "./shapes.js";
import C from "./collision.js";

let makeFrog = function(obj) {
    obj.name = "frog";
    obj.collision = "rect";
    obj.airborne = true;
    obj.up = false;
    obj.left = false;
    obj.right = false;
    obj.collided = false;
    // indicates whether it landed on anything this frame
}

let player = new Object();
S.rect(player, 0, 0, 10, 10, '#003300');
makeFrog(player);
R.pushOntoLayer(player, 20);
player.collisionHandler = undefined;
C.colliders.push(player);
N.mover(player, 100, 100, 0, 0, 0, 0, N.basicMove);
N.bodies.push(player);

export default { player, };
