import R from "./render.js";

let rect = function(obj, topLeftX, topLeftY, width, height, hexColorCode) {
    obj.x = topLeftX;
    obj.y = topLeftY;
    obj.width = width;
    obj.height = height;
    obj.color = hexColorCode;
    obj.draw = R.rectDraw;
}

export default { rect };
