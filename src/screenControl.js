import R from "./render.js";
import F from "./frog.js";

<<<<<<< HEAD
const scrollSpeed = 0.06;
=======
const scrollSpeed = 0.04;
>>>>>>> abbb61de976fe2ae8a16f5e06af62806975a6e18

let scroll = function() {
    R.xOffsetDelta.xO = (R.gameWidth / 2 - F.player.x) * scrollSpeed;
    R.yOffsetDelta.yO = (R.gameHeight / 2 - F.player.y) * scrollSpeed;
}

export default { scroll, };
