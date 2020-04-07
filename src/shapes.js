import R from "./render.js";
import N from "./newton.js";

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

export default { rect };
