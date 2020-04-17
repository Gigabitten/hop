import R from "./render.js";
import F from "./frog.js";

const scrollSpeed = 0.06;

let scroll = function() {
    R.viewport.x += (R.viewport.width / 2 - (F.player.x + R.viewport.x)) * scrollSpeed;
    R.viewport.y += (R.viewport.height / 2 - (F.player.y + R.viewport.y)) * scrollSpeed;
}

export default { scroll, };
