/* Note that this aren't my screen height and width, they're the height and width of the smallest
 * screen size which is common. If somebody has an absolutely enormous screen, they can just zoom in.
 * Getting screen dimensions with js is actually a nightmare. 
 */
const gameWidth = 1280;
const gameHeight = 720;

const context = document.querySelector("canvas").getContext("2d");
context.canvas.width = gameWidth;
context.canvas.height = gameHeight;

let visibles = [];

let redraw = function() {
    context.fillStyle = "#009933";
    context.fillRect(0, 0, gameWidth, gameHeight);
    /* important! clears the screen each frame. without this, drawing happens, but nothing gets
     * cleared. This is the standard for drawing 2d to a screen, at least for small-scale unoptimized 
     * stuff - wipe everything by clearing it with a rectangle across it, then rebuild.
     */
    visibles.forEach(x => {
	x.draw(x);
    });
}

export default { gameWidth, gameHeight, context, redraw, visibles };