let colliders = [];

function isInRange(p, s, e) { // start, end, point
    return Math.min(s, e) <= p && Math.max(s, e) >= p;
}

function rangesOverlap(aS, aE, bS, bE) { // a start, a end, b start, b end
    // a can be to the left or to the right of b, so...
    if(aS < bS) { // if a starts before b
	return aE < bS; // true if a ends before b begins
    } else { // if a starts at or after b
	return bE < aS; // true if b ends before a begins
    }
}

let isPointInRect = function(r, x, y) {
    return isInRange(x, r.x, r.x + r.width)
	&& isInRange(y, r.y, r.y + r.height);
}

let isRectInRect = function(r1, r2) {
    return rangesOverlap(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width)
	&& rangesOverlap(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height);
}

let doCollisions = function(colliders) {
    
}

export default { colliders, doCollisions, isPointInRect };
// Nothing here yet. Soon! And it will be a lot, I think.
