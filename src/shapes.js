import R from "./render.js";
import N from "./newton.js";
import C from "./collision.js";

let Graphics = PIXI.Graphics;

let rect = function(x, y, w, h, r) {
    r.name = 3;
    r.collision = 3;
    r.x = x;
    r.y = y;
    r.width = w;
    r.height = h;
    r.top = function() {
	return this.y;
    }
    r.right = function() {
	return this.x + this.width;
    }
    r.bottom = function() {
	return this.y + this.height;
    }
    r.left = function() {
	return this.x;
    }
    r.sprites = [];
}

let dev = function(x, y, w, h, r) {
    if(r === undefined) r = new Object();
    collidableRect(x, y, w, h, r);
    r.name = 6;
    r.sprites[0] = R.genTile("dev.bmp", w, h);
    r.draw = R.singleDraw;
    anchorAndAdd(r);
    return r;
}

let anchorAndAdd = function(r) {
    r.sprites.map((s) => {
	if(s.anchor !== undefined) {
	    s.anchor.set(0.5, 0.5);
	    R.app.stage.addChild(s);
	}
    });
}

let collidableRect = function(x, y, w, h, r, l) {
    if(r === undefined) r = new Object();
    rect(x, y, w, h, r);
    r.collisionHandler = C.wallHandler;
    C.colliders.push(r);
    if(l === undefined) l = 10;
    R.pushOntoLayer(r, l);
    N.mover(r);
    r.collision = 1;
}

let ceiling = function(x, y, w, h, r) {
    if(r === undefined) r = new Object();
    collidableRect(x, y, w, h, r);
    r.draw = R.ceilingDraw;
    r.type = 9;

    r.sprites[0] = R.genTile("swampSubsurface.bmp", w, h);
    anchorAndAdd(r);
}
// walls need an orientation - 2 for right internal walls, 4 for left
let wall = function(x, y, w, h, o, r) {
    if(r === undefined) r = new Object();
    collidableRect(x, y, w, h, r, 11);
    if(o === 2) {
	r.draw = R.rightWallDraw;
	r.name = 7;
    }
    else if(o === 4) {
	r.draw = R.leftWallDraw;
	r.name = 8;
    }
    else throw "Hey! Walls need an orientation.";
    r.sprites[0] = R.genSprite("swampWallCorner.bmp");
    r.sprites[1] = R.genSprite("swampWallCorner.bmp");
    r.sprites[1].scale.y *= -1;
    r.sprites[2] = R.genTile("swampWall.bmp", 8, h - 16);
    r.sprites[3] = R.genTile("wallDirt.bmp", w - 8, h - 16);
    r.sprites[4] = R.genTile("wallTransition.bmp", w - 8, 8);
    r.sprites[5] = R.genTile("wallTransition.bmp", w - 8, 8);
    r.sprites[5].scale.y *= -1;
    if(o === 4) R.flipSprites(r, 'horizontal');
    anchorAndAdd(r);
}

let floor = function(x, y, w, h, r) {
    if(r === undefined) r = new Object();
    collidableRect(x, y, w, h, r);
    r.name = 6;
    r.sprites[0] = R.genTile("swampSurface.bmp", w, 8);
    r.sprites[1] = R.genTile("swampSubsurface.bmp", w, h - 8);
    r.draw = R.floorDraw;
    anchorAndAdd(r);
}

let killRect = function(x, y, w, h, r) {
    if(r === undefined) r = new Object();
    dev(x, y, w, h, r);
    r.collisionHandler = C.killHandler;
    r.name = 4;
}

let checkpoint = function(x, y, r) {
    let w = 64;
    let h = 32;
    if(r === undefined) r = new Object();
    collidableRect(x, y, h, h, r);
    r.name = 9;
    r.sprites[0] = R.genSprite("lilypad.bmp", w, h);
    r.draw = R.singleDraw;
    r.collisionHandler = C.checkpointHandler;
    r.name = 4;
    anchorAndAdd(r);
}

let buildRoomBorder = function(w, h, t, c) {
    ceiling(-t, -t, 2*t+w, t, '#333333'); // top
    wall(-t, -t, t, 2*t+h, 4); // left
    floor(-t, h, 2*t+w, t); // bottom
    wall(w, -t, t, 2*t+h, 2); // right
}

export default { rect, buildRoomBorder, killRect, checkpoint, floor, wall, ceiling, anchorAndAdd,
		 dev, };
