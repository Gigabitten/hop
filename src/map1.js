import S from "./shapes.js"
import N from "./newton.js";
import F from "./frog.js";
import C from "./collision.js";
import R from "./render.js";

// Loading order actually determines rendering order. Load the things you want on top last.
// Some coordinates are specified in multiples of 32. Some are not. I hope which is which is clear.

let load = function() {
    R.viewport.minX = -1024;
    R.viewport.minY = -64;
    R.viewport.maxX = 1536;
    R.viewport.maxY = 1088;

    S.floor(-64, 32, 128, 64); // lower floor
    
    S.floor(8, 22, 16, 1); // platform

    S.wall(27, 15, 64, 18, 2); // right wall
    S.floor(27, 14, 64, 1); // upper floor

    S.firefly(512, 712, function(obj) {
	return obj.baseX - 300 * Math.cos(obj.counter / 120);
    }, function(obj) {
	return obj.baseY + 100 * Math.sin(obj.counter / 120);
    });

    S.firefly(-200, 980, function(obj) {
	return obj.baseX - 4 * Math.cos(obj.counter / 40);
    }, function(obj) {
	return obj.baseY - Math.sin(obj.counter / 20);
    });

    S.firefly(1100, 325, function(obj) {
	return obj.baseX - 2 * Math.cos(obj.counter / 8);
    }, function(obj) {
	return obj.baseY - 50 * Math.sin(obj.counter / 20);
    });

    F.makeFrog(F.player);
    F.player.xSpawn = -900;
    F.player.ySpawn = 960;
    F.player.neededScore = 3;
    F.player.respawn();
}

export default { load, }
