function getBoundingBox (item) {
    let w = item.width * Math.abs(item.sx);
    let h = item.height * Math.abs(item.sy);
    let x1 = item.gx;
    let y1 = item.gy;
    let x2 = item.sx >= 0 ? x1 + w : x1 - w;
    let y2 = item.sy >= 0 ? y1 + h : y1 - h;

    return {
        minX: x1 <= x2 ? x1 : x2,
        minY: y1 <= y2 ? y1 : y2,
        maxX: x1 >= x2 ? x1 : x2,
        maxY: y1 >= y2 ? y1 : y2
    };
}

/**
 * Detects if point is inside a rectangle
 * @method pointRectCollide
 * @memberOf physics
 * @param  {Integer} x    The point's x
 * @param  {Integer} y    The point's y
 * @param  {Sprite}  rect The rect
 * @return {Boolean}
 */
export function pointRectCollide (x, y, rect) {
    let hb = getBoundingBox(rect);
    return x >= hb.minX && x <= hb.maxX && y >= hb.minY && y <= hb.maxY;
};

/**
 * Detects whether two rectangles are overlapping
 * @method rectRectCollide
 * @memberOf physics
 * @param  {Sprite} rect1 [description]
 * @param  {Sprite} rect2 [description]
 * @return {Boolean}      
 */
export function rectRectCollide (rect1, rect2) {
    let rect1BB = getBoundingBox(rect1);
    let rect2BB = getBoundingBox(rect2);

    if (rect1BB.minX < rect2BB.maxX && rect1BB.maxX > rect2BB.minX &&
        rect1BB.minY < rect2BB.maxY && rect1BB.maxY > rect2BB.minY) {
        return true;
    } else {
        return false;
    }
}

/**
 * [rectContain description]
 * @method rectContain
 * @memberOf physics
 * @param  {Sprite} rect [description]
 * @param  {Viewport} viewport [description]
 * @return {Object} Overlap x,y to be added to rect to contain inside viewport
 */
export function rectContain (rect, viewport) {
    let bb = getBoundingBox(rect),
        x, y;

    if (hb.maxX > viewport.width) {
        x = viewport.width - hb.maxX;
    } else if (hb.minX < 0) {
        x = Math.abs(hb.minX);
    }

    if (hb.maxY > viewport.height) {
        y = viewport.height - hb.maxY;
    } else if (hb.minY < 0) {
        y = Math.abs(hb.minY);
    }

    return { x, y };
}
