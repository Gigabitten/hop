let colliders = [];

function isInRange(p, s, e) { // start, end, point
    return Math.min(s, e) <= p && Math.max(s, e) >= p;
}

function rangesOverlap(aS, aE, bS, bE) { // a start, a end, b start, b end
    // a can be to the left or to the right of b, so...
    if(aS < bS) { // if a starts before b
	return aE > bS; // true if a ends before b begins
    } else { // if a starts at or after b
	return bE > aS; // true if b ends before a begins
    }
}

let isPointInRect = function(r, x, y) {
    return isInRange(x, r.x, r.x + r.width)
	&& isInRange(y, r.y, r.y + r.height);
}

let isRectInRect = function(r1, r2) {
    return (rangesOverlap(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width)
	    && rangesOverlap(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height));
}

let collide = function(r1, r2) {
    let first = "none";
    let second = "none";
    let h1 = r1.collisionHandler;
    let h2 = r2.collisionHandler;
    if(h1 !== undefined) first = h1(r1, r2);
    if(h2 !== undefined) second = h2(r2, r1);
    if(first !== "none" || second !== "none") {
	if(r1.name === "frog") {
	    if(second === "top") {
		r1.collided = true;
	    } 
	}
	if(r2.name === "frog") {
	    if(first === "bottom") {
		r2.collided = true;
	    } 
	}
    }
}

// remember - the second object in the collision function does the moving. an arbitrary decision, but
// it helps make it possible to think of collision as one object pushing another out of it
let pushOutHandler = function(r1, r2) {
    let side = "none";
    if(r2.collision === "rect") {
	if(isRectInRect(r1, r2)) {
	    let left = Math.abs((r2.x + r2.width) - r1.x);
	    let right = Math.abs((r1.x + r1.width) - r2.x);
	    let top = Math.abs((r2.y + r2.height) - r1.y);
	    let bottom = Math.abs((r1.y + r1.height) - r2.y);
	    let snapDirection = Math.min(left, right, top, bottom);
	    switch(snapDirection) {
	    case left:
		r2.xVel = 0;
		r2.x = r1.x - r2.width;
		side = "left";
		break;

	    case right:
		r2.xVel = 0;
		r2.x = r1.x + r1.width;
		side = "right";
		break;
		
	    case top:
		r2.yVel = 0;
		r2.y = r1.y - r2.height;
		r2.xVel = r1.xVel; // r2 is on top of r1, so it's dragged along
		side = "top";
		break;

	    case bottom:
		// r2 hits the bottom of r1, the only case where x-velocity isn't imparted
		r2.yVel = 0;
		r2.y = r1.y + r1.height;
		side = "bottom";
		break;
	    }
	} 
    }
    return side;
}

let colorHandler = function(r1, r2) {
    if(r2.name === "rect") {
	if(isRectInRect(r1, r2)) {
	    r1.color = '#006600';
	    r2.color = '#006600';
	} else {
	    r1.color = '#ff0000';
	    r2.color = '#ff0000';
	}
    }
}

let doCollisions = function() {
    let i;
    let j;
    /* this nested loop might seem like magic and it kinda is but basically this covers
     * every combination of two elements in colliders without repeats and self-collision
     * so for [1,2,3] it would check 1 against 2, 1 against 3, and 2 against 3.
     */
    for(i = 0; i < colliders.length - 1; i++) {
	for(j = i + 1; j < colliders.length; j++) {
	    collide(colliders[i], colliders[j]);
	}
    }
}

export default { colliders, doCollisions, pushOutHandler, colorHandler, };
// Nothing here yet. Soon! And it will be a lot, I think.
