import R from "./render.js";
import N from "./newton.js";
import C from "./collision.js";

let rect = function(obj, topLeftX, topLeftY, width, height, hexColorCode) {
    obj.name = "rect"; // string comparison is slow but this is so much clearer than numerical ID's
    obj.collision = "rect";
    obj.x = topLeftX;
    obj.y = topLeftY;
    obj.width = width;
    obj.height = height;
    obj.color = hexColorCode;
    obj.draw = R.rectDraw;
    N.mover(obj);
}

let buildWall = function(x, y, w, h, c) {
    let wall = new Object();
    rect(wall, x, y, w, h, c);
    wall.collisionHandler = C.wallHandler;
    R.pushOntoLayer(wall, 10);
    C.colliders.push(wall);
    wall.type = "wall";
}

export default { rect, buildWall };
