class Point {
    constructor(x, y, z, options) {
        const { colour, size, id, ignore } = options || {};
        this.valid = !isNaN(x) && !isNaN(y) && !isNaN(z);
        this.x = x;
        this.y = y;
        this.z = z;
        if (colour instanceof Array) {
            this.colour = colour[0];
            this.colourMagnitude = colour[1];
        }
        else {
            this.colour = colour || "#fff";
        }
        if (size instanceof Array) {
            this.size = size[0];
            this.sizeMagnitude = size[1];
        }
        else {
            this.size = size || 3;
        }
        !!id && (this.id = id);
        this.ignore = ignore || false;
        Object.freeze(this);
    }
    clone({ x: _x, y: _y, z: _z, options: _options, } = {}) {
        const { x, y, z, colour, size, id, ignore } = this;
        const options = {
            colour: _options?.colour || colour,
            size: _options?.size || size,
            ignore: _options?.ignore || ignore,
        };
        id && (options.id = id);
        _options?.id && (options.id = id);
        return new Point(_x ?? x, _y ?? y, _z ?? z, options);
    }
    matches({ x, y, z }) {
        return this.x === x && this.y == y && this.z === z;
    }
}

class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const getDistance3D = (a, b) => Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2), 1 / 2);
const getDistance2D = (a, b) => Math.pow(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2), 1 / 2);

class Line {
    constructor(start, end, options) {
        const { colour, thickness, id, ignore } = options || {};
        this.start = start;
        this.end = end;
        const [dX, dY, dZ] = ["x", "y", "z"].map((x) => end[x] - start[x]);
        const x = { c: start.x, t: dX };
        const y = { c: start.y, t: dY };
        const z = { c: start.z, t: dZ };
        this.parametric = { x, y, z };
        this.distance = getDistance3D(start, end);
        this.colour = colour || "#fff";
        this.thickness = thickness || 1;
        id && (this.id = id);
        this.ignore = ignore || false;
    }
}

// export const infinity = 1e15;
const infinity = 1e9;
const conditionKeys = ["Shift", "Alt"];

class Line2D {
    constructor(point1, point2) {
        let [x1, y1, x2, y2] = [point1.x, point1.y, point2.x, point2.y];
        [x1, y1, x2, y2] = [x1, y1, x2, y2].map((x) => x === Infinity ? infinity : x === -Infinity ? -infinity : x);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        {
            const gradient = (y2 - y1) / (x2 - x1);
            this.gradient =
                gradient === Infinity
                    ? infinity
                    : gradient === -Infinity
                        ? -infinity
                        : gradient;
        }
        this.intersect = y1 - this.gradient * x1;
        this.distance = getDistance2D({ x: x1, y: y1 }, { x: x2, y: y2 });
    }
}

class Polygon {
    constructor(points, options) {
        const { colour, id, attributes } = options || {};
        this.points = points;
        {
            const x = points.reduce((a, b) => a + b.x, 0) / points.length;
            const y = points.reduce((a, b) => a + b.y, 0) / points.length;
            const z = points.reduce((a, b) => a + b.z, 0) / points.length;
            this.centre = new Point(x, y, z);
        }
        this.colour = colour || "#fff";
        id && (this.id = id);
        attributes && (this.attributes = attributes);
    }
    clone({ points: _points, ...rest } = {}) {
        const { points, colour, attributes, id } = this;
        const options = {
            colour: rest?.colour || colour,
            attributes: rest?.attributes || attributes,
        };
        id && (options.id = id);
        rest?.id && (options.id = id);
        return new Polygon(_points ?? points, options);
    }
}

class Polygon2D {
    constructor(points) {
        this.points = points;
    }
}

class Direction {
    constructor(zx = 0, y = 0) {
        this.zx = zx;
        this.y = y;
    }
    clone({ zx: _zx, y: _y } = {}) {
        const { zx, y } = this;
        return new Direction(_zx ?? zx, _y ?? y);
    }
}

class Plane {
    constructor(x, y, z, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = d;
    }
}

const RADIANS = 180 / Math.PI;

var CinnamonEvents;
(function (CinnamonEvents) {
    CinnamonEvents[CinnamonEvents["MouseRotateCentre"] = 0] = "MouseRotateCentre";
    CinnamonEvents[CinnamonEvents["DirectionGrid"] = 1] = "DirectionGrid";
})(CinnamonEvents || (CinnamonEvents = {}));

class Aperture {
    constructor(zx, y) {
        this.zx = zx;
        this.y = y;
    }
}

const generateAperture = (aperture, width, height) => {
    const ratio = width / height;
    const x = ratio > 1 ? aperture : aperture * ratio;
    const y = ratio < 1 ? aperture : aperture / ratio;
    return new Aperture(x, y);
};

const getDimensions = function (point, forceResolve = false) {
    if (point.z < 0) {
        return null;
    }
    const zx_y_angle = Math.atan(point.y / point.z) * RADIANS;
    let x_z_angle = Math.atan(point.x / point.z) * RADIANS;
    if (isNaN(x_z_angle))
        x_z_angle = 0;
    // ** Check if the angles to the points is greater than the view, if so return.
    // ** Unless we know better and have sent the forceResolve flag to true.
    if (!forceResolve && (zx_y_angle < 0 ? zx_y_angle * -1 : zx_y_angle) > this.aperture.y) {
        return null;
    }
    if (!forceResolve && (x_z_angle < 0 ? x_z_angle * -1 : x_z_angle) > this.aperture.zx) {
        return null;
    }
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const width = halfWidth + (x_z_angle / this.aperture.zx) * halfWidth;
    const height = halfHeight - (zx_y_angle / this.aperture.y) * halfHeight;
    return { width, height, point };
};

const getPlaneLineIntersection = (plane, line) => {
    const { x, y, z, d } = plane;
    const para = line.parametric;
    const _c = d * -1 - (x * para.x.c + y * para.y.c + z * para.z.c);
    const _t = x * para.x.t + y * para.y.t + z * para.z.t;
    let t = _c / _t;
    if (t === Infinity) {
        t = infinity;
    }
    if (t === -Infinity) {
        t = -infinity;
    }
    return new Point(para.x.c + t * para.x.t, para.y.c + t * para.y.t, para.z.c + t * para.z.t);
};

/*
    Does not check is point completes the line equation, it assumes that it does.
    Checks if the point is between the start and end.

    --start-------POINT-------end--
    The above would return true.

    --POINT----start-------end--
    The above would return false.
*/
const isPointOnLine = (point, line) => {
    const distanceToStart = getDistance3D(point, line.start);
    const distanceToEnd = getDistance3D(point, line.end);
    return distanceToStart <= line.distance && distanceToEnd <= line.distance;
};

const getLineDimensions = function (line, topViewPlane, rightViewPlane, bottomViewPlane, leftViewPlane) {
    let startDimensions = this.getDimensions(line.start);
    let endDimensions = this.getDimensions(line.end);
    const topIntersect = getPlaneLineIntersection(topViewPlane, line);
    const rightIntersect = getPlaneLineIntersection(rightViewPlane, line);
    const bottomIntersect = getPlaneLineIntersection(bottomViewPlane, line);
    const leftIntersect = getPlaneLineIntersection(leftViewPlane, line);
    const isTopIntersectValid = topIntersect.valid &&
        isPointOnLine(topIntersect, new Line(new Point(-Math.tan(this.aperture.zx / RADIANS) * topIntersect.z, topIntersect.y, topIntersect.z), new Point(Math.tan(this.aperture.zx / RADIANS) * topIntersect.z, topIntersect.y, topIntersect.z))) &&
        isPointOnLine(topIntersect, line) &&
        topIntersect.z >= 0;
    const isRightIntersectValid = rightIntersect.valid &&
        isPointOnLine(rightIntersect, new Line(new Point(rightIntersect.x, -Math.tan(this.aperture.y / RADIANS) * rightIntersect.z, rightIntersect.z), new Point(rightIntersect.x, Math.tan(this.aperture.y / RADIANS) * rightIntersect.z, rightIntersect.z))) &&
        isPointOnLine(rightIntersect, line) &&
        rightIntersect.z >= 0;
    const isBottomIntersectValid = bottomIntersect.valid &&
        isPointOnLine(bottomIntersect, new Line(new Point(-Math.tan(this.aperture.zx / RADIANS) * bottomIntersect.z, bottomIntersect.y, bottomIntersect.z), new Point(Math.tan(this.aperture.zx / RADIANS) * bottomIntersect.z, bottomIntersect.y, bottomIntersect.z))) &&
        isPointOnLine(bottomIntersect, line) &&
        bottomIntersect.z >= 0;
    const isLeftIntersectValid = leftIntersect.valid &&
        isPointOnLine(leftIntersect, new Line(new Point(leftIntersect.x, -Math.tan(this.aperture.y / RADIANS) * leftIntersect.z, leftIntersect.z), new Point(leftIntersect.x, Math.tan(this.aperture.y / RADIANS) * leftIntersect.z, leftIntersect.z))) &&
        isPointOnLine(leftIntersect, line) &&
        leftIntersect.z >= 0;
    const { validPlaneIntersects, intersects } = [
        [topIntersect, isTopIntersectValid, "top"],
        [rightIntersect, isRightIntersectValid, "right"],
        [bottomIntersect, isBottomIntersectValid, "bottom"],
        [leftIntersect, isLeftIntersectValid, "left"],
    ].reduce((a, b) => {
        const [intersect, valid, label] = b;
        if (valid) {
            a.validPlaneIntersects.push(intersect);
            a.intersects.push(label);
        }
        return a;
    }, {
        validPlaneIntersects: [],
        intersects: [],
    });
    const metaData = {
        both: false,
        start: false,
        end: false,
    };
    if (startDimensions === null && endDimensions === null) {
        if (validPlaneIntersects.length === 2) {
            const dimensionsStart = this.getDimensions(validPlaneIntersects[0], true);
            const dimensionsEnd = this.getDimensions(validPlaneIntersects[1], true);
            startDimensions = dimensionsStart;
            endDimensions = dimensionsEnd;
            if (startDimensions === null || endDimensions === null) {
                return null;
            }
            metaData.both = true;
        }
        else {
            return null;
        }
    }
    if (startDimensions === null) {
        if (validPlaneIntersects.length === 1) {
            const dimensions = this.getDimensions(validPlaneIntersects[0], true);
            if (dimensions === null) {
                return null;
            }
            startDimensions = dimensions;
            metaData.start = true;
        }
        else {
            return null;
        }
    }
    if (endDimensions === null) {
        if (validPlaneIntersects.length === 1) {
            const dimensions = this.getDimensions(validPlaneIntersects[0], true);
            if (dimensions === null) {
                return null;
            }
            endDimensions = dimensions;
            metaData.end = true;
        }
        else {
            return null;
        }
    }
    return { startDimensions, endDimensions, metaData };
};

const addPointsAtEdgeOfView = function (points, line, planes) {
    const { topViewPlane, rightViewPlane, bottomViewPlane, leftViewPlane } = planes;
    const topIntersect = getPlaneLineIntersection(topViewPlane, line);
    const rightIntersect = getPlaneLineIntersection(rightViewPlane, line);
    const bottomIntersect = getPlaneLineIntersection(bottomViewPlane, line);
    const leftIntersect = getPlaneLineIntersection(leftViewPlane, line);
    const isTopOnLine = isPointOnLine(topIntersect, line);
    const isRightOnLine = isPointOnLine(rightIntersect, line);
    const isBottomOnLine = isPointOnLine(bottomIntersect, line);
    const isLeftOnLine = isPointOnLine(leftIntersect, line);
    const intercepts = [];
    if (isTopOnLine && topIntersect.z >= 0) {
        intercepts.push({
            point: topIntersect,
            dimensions: this.getDimensions(topIntersect),
            name: "top",
        });
    }
    if (isBottomOnLine && bottomIntersect.z >= 0) {
        intercepts.push({
            point: bottomIntersect,
            dimensions: this.getDimensions(bottomIntersect),
            name: "bottom",
        });
    }
    if (isRightOnLine) {
        if (rightIntersect.z >= 0) {
            intercepts.push({
                point: rightIntersect,
                dimensions: this.getDimensions(rightIntersect, true),
                name: "right",
            });
        }
        else {
            intercepts.push({
                point: rightIntersect,
                dimensions: {
                    width: 0,
                    height: rightIntersect.y > 0 ? 0 : this.height,
                },
                name: "right",
            });
        }
    }
    if (isLeftOnLine) {
        if (leftIntersect.z >= 0) {
            intercepts.push({
                point: leftIntersect,
                dimensions: this.getDimensions(leftIntersect, true),
                name: "left",
            });
        }
        else {
            intercepts.push({
                point: leftIntersect,
                dimensions: {
                    width: this.width,
                    height: leftIntersect.y > 0 ? 0 : this.height,
                },
                name: "left",
            });
        }
    }
    points.push(...intercepts
        .filter(({ dimensions }) => !!dimensions)
        .sort((a, b) => getDistance3D(line.start, a.point) -
        getDistance3D(line.start, b.point))
        .map(({ dimensions }) => dimensions));
};

const getAngle = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const angle = Math.atan(dx / dy) * RADIANS;
    return angle;
};
const getXY = (angle, distance, inverse = false) => {
    const x = Math.sin(angle / RADIANS) * distance;
    let y = Math.cos(angle / RADIANS) * distance;
    if (angle === 0 && inverse)
        y *= -1;
    return { x, y };
};
const manipulatePoint = (centre, direction, point) => {
    let { x, y, z } = point;
    x -= centre.x;
    y -= centre.y;
    z -= centre.z;
    {
        const point2D = { x, y: z };
        let angle = getAngle({ x: 0, y: 0 }, point2D);
        if (isNaN(angle))
            angle = 0;
        if (x < 0 && z < 0)
            angle = -180 + angle;
        if (x > 0 && z < 0)
            angle = 180 + angle;
        angle = angle - (direction.zx > 180 ? direction.zx - 360 : direction.zx);
        const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
        const { x: newX, y: newZ } = getXY(angle, distance2D);
        x = newX;
        z = newZ;
    }
    {
        const point2D = { x: z, y };
        let angle = getAngle({ x: 0, y: 0 }, point2D);
        if (isNaN(angle))
            angle = 0;
        if (z > 0 && y < 0)
            angle += 180;
        if (z < 0 && y < 0)
            angle = -180 + angle;
        angle = angle - direction.y;
        const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
        const { x: newZ, y: newY } = getXY(angle, distance2D, y < 0);
        z = newZ;
        y = newY;
    }
    return new Point(x, y, z);
};
const reverse = (centre, direction, point) => {
    let { x, y, z, ...rest } = point;
    const _zx = -direction.zx;
    const _y = -direction.y;
    {
        const point2D = { x: z, y };
        let angle = getAngle({ x: 0, y: 0 }, point2D);
        if (isNaN(angle))
            angle = 0;
        if (z > 0 && y < 0)
            angle += 180;
        if (z < 0 && y < 0)
            angle = -180 + angle;
        angle = angle - _y;
        const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
        const { x: newZ, y: newY } = getXY(angle, distance2D, y < 0);
        z = newZ;
        y = newY;
    }
    {
        const point2D = { x, y: z };
        let angle = getAngle({ x: 0, y: 0 }, point2D);
        if (isNaN(angle))
            angle = 0;
        if (x < 0 && z < 0)
            angle = -180 + angle;
        if (x > 0 && z < 0)
            angle = 180 + angle;
        angle = angle - (_zx > 180 ? _zx - 360 : _zx);
        const distance2D = getDistance2D({ x: 0, y: 0 }, point2D);
        const { x: newX, y: newZ } = getXY(angle, distance2D);
        x = newX;
        z = newZ;
    }
    x += centre.x;
    y += centre.y;
    z += centre.z;
    return new Point(x, y, z, { ...rest });
};
manipulatePoint.reverse = reverse;

const buffer = 1e-12;
const isPointInView = function (point) {
    const { x, y, z } = point;
    if (z < 0)
        return false;
    const angleZX = Math.atan(x / z) * RADIANS;
    const angleY = Math.atan(y / z) * RADIANS;
    if (angleZX <= -this.aperture.zx - buffer ||
        angleZX >= this.aperture.zx + buffer)
        return false;
    if (angleY <= -this.aperture.y - buffer || angleY >= this.aperture.y + buffer)
        return false;
    return true;
};

const getClosest = (points, point) => {
    const [closest] = points.sort((a, b) => getDistance3D(a, point) - getDistance3D(b, point));
    return closest;
};

const getIntersects = function (line) {
    const cinnamon = this;
    const intersects = {};
    const crossIntersects = {};
    for (let plane in cinnamon.planes) {
        const value = cinnamon.planes[plane];
        const intersect = getPlaneLineIntersection(value, line);
        intersects[plane] = intersect;
        if (intersect.valid) {
            const hori = plane;
            const vert = intersect.y < cinnamon.centre.y ? "bottom" : "top";
            crossIntersects[`${hori}-${vert}`] = intersect;
        }
    }
    const filteredIntersects = Object.entries(intersects)
        .map(([key, value]) => ({ key, value }))
        .filter(({ value }) => value.z >= 0 && isPointOnLine(value, line));
    return { intersects, crossIntersects, filteredIntersects };
};

const inversePlanes = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
};
const resolveLine = function (line, showResolved = false) {
    const cinnamon = this;
    let start = line.start;
    let end = line.end;
    const [startInView, endInView] = [start, end].map((x) => isPointInView.apply(cinnamon, [x]));
    if (startInView && endInView) {
        start = cinnamon.getDimensions(start, true);
        end = cinnamon.getDimensions(end, true);
        if (start === null || end === null)
            return null;
        return showResolved
            ? {
                start: { resolvedPoint: start, point: line.start, startInView },
                end: { resolvedPoint: end, point: line.end, endInView },
                inView: 2,
            }
            : { start, end, inView: 2 };
    }
    const { intersects, filteredIntersects, } = getIntersects.apply(cinnamon, [line]);
    const sortedIntersects = Object.entries(intersects)
        .map(([key, value]) => ({ key, value }))
        .filter(({ value }) => isPointOnLine(value, line))
        .sort((a, b) => getDistance3D(a.value, start) -
        getDistance3D(b.value, start))
        .map(({ key, value }) => ({
        key,
        value,
        inView: isPointInView.apply(cinnamon, [value]),
        direction: !isPointInView.apply(cinnamon, [value]) &&
            (key === "top" || key === "bottom"
                ? value.x < 0
                    ? "left"
                    : "right"
                : value.y < 0
                    ? "bottom"
                    : "top"),
    }))
        .map((x) => x.value.z >= 0
        ? x
        : {
            key: inversePlanes[x.key],
            value: x.value,
            inView: x.inView,
            direction: x.direction,
        });
    if (!startInView && !endInView) {
        if (filteredIntersects.length === 0)
            return showResolved
                ? { output: null, intersects: sortedIntersects }
                : null;
        const validIntersects = filteredIntersects.filter(({ value }) => {
            return isPointInView.apply(cinnamon, [value]);
        });
        if (validIntersects.length !== 2)
            return showResolved
                ? { output: null, intersects: sortedIntersects }
                : null;
        const [_a, _b] = validIntersects.sort((a, b) => getDistance3D(a.value, start) -
            getDistance3D(b.value, start));
        const [a, b] = [_a, _b].map(({ value }) => cinnamon.getDimensions(value, true));
        start = a;
        end = b;
        const inverse = _a !== validIntersects[0];
        return showResolved
            ? {
                start: {
                    resolvedPoint: start,
                    point: inverse ? _b : _a,
                    startInView,
                },
                end: {
                    resolvedPoint: end,
                    point: inverse ? _a : _b,
                    endInView,
                },
                inView: 0,
                intersects: sortedIntersects,
            }
            : { start, end, inView: 0 };
    }
    if (filteredIntersects.length === 0) {
        return null;
    }
    const intersectPoints = filteredIntersects.map(({ value }) => value);
    if (startInView) {
        const closest = getClosest(intersectPoints, start);
        const { key } = filteredIntersects.find(({ value }) => value === closest);
        start = cinnamon.getDimensions(start, true);
        end = cinnamon.getDimensions(closest, true);
        return showResolved
            ? {
                start: {
                    resolvedPoint: start,
                    point: line.start,
                    startInView,
                },
                end: { resolvedPoint: end, point: closest, plane: key },
                inView: 1,
                intersects: sortedIntersects,
            }
            : { start, end, inView: 1 };
    }
    else {
        const closest = getClosest(intersectPoints, end);
        const { key } = filteredIntersects.find(({ value }) => value === closest);
        start = cinnamon.getDimensions(closest, true);
        end = cinnamon.getDimensions(end, true);
        return showResolved
            ? {
                start: { resolvedPoint: start, point: closest, plane: key },
                end: { resolvedPoint: end, point: line.end, endInView },
                inView: 1,
                intersects: sortedIntersects,
            }
            : { start, end, inView: 1 };
    }
};

const findLastIndex = (arr, callBack) => {
    const index = [...arr].reverse().findIndex((x) => callBack(x));
    if (index === -1)
        return -1;
    return arr.length - 1 - index;
};

const resolveCorner = (points, corner, w, h) => {
    const [a, b] = [...corner].reverse().slice(0, 2).reverse();
    const [a1, a2] = a.split("-");
    const [b1, b2] = b.split("-");
    if (a1 === b2 && a2 === b1) {
        if ([a1, b1].includes("top") && [a1, b1].includes("right")) {
            points.push({
                resolvedPoint: { width: w, height: 0, point: new Point(0, 0, 0) },
            });
            corner.pop();
            corner.pop();
        }
        if ([a1, b1].includes("bottom") && [a1, b1].includes("right")) {
            points.push({
                resolvedPoint: { width: w, height: h, point: new Point(0, 0, 0) },
            });
            corner.pop();
            corner.pop();
        }
        if ([a1, b1].includes("bottom") && [a1, b1].includes("left")) {
            points.push({
                resolvedPoint: { width: 0, height: h, point: new Point(0, 0, 0) },
            });
            corner.pop();
            corner.pop();
        }
        if ([a1, b1].includes("top") && [a1, b1].includes("left")) {
            points.push({
                resolvedPoint: { width: 0, height: 0, point: new Point(0, 0, 0) },
            });
            corner.pop();
            corner.pop();
        }
    }
};
const polywag = function (points, journeys) {
    const _this = this;
    journeys.forEach((journey) => {
        if (!!journey.steps) {
            const corner = [];
            journey.steps.forEach((x) => {
                if (x.resolvedPoint !== undefined) {
                    points.push(x);
                    return;
                }
                if (!x.inView) {
                    const [last] = corner.slice(-1);
                    if (last === `${x.key}-${x.direction}`) ;
                    else {
                        corner.push(`${x.key}-${x.direction}`);
                    }
                    if (corner.length < 2) {
                        return;
                    }
                    resolveCorner(points, corner, _this.width, _this.height);
                    return;
                }
                const resolvedPoint = getDimensions.apply(_this, [
                    x.value,
                    true,
                ]);
                points.push({
                    resolvedPoint,
                    point: x.value,
                });
            });
        }
    });
};

const resolvePolygon = function (polygon) {
    const lines = [];
    {
        let i = 0;
        while (i < polygon.points.length) {
            const a = polygon.points[i];
            const b = polygon.points[i + 1 === polygon.points.length ? 0 : i + 1];
            lines.push(new Line(a, b));
            i++;
        }
    }
    const points = [];
    const story = [];
    lines.forEach((line) => {
        const rLine = resolveLine.apply(this, [line, true]);
        const { output, intersects } = rLine;
        if (output === null) {
            story.push({ type: "neither in view", intersects });
            return;
        }
        const { start, end, inView } = rLine;
        if (inView === 1) {
            if (start.startInView) {
                story.push({
                    type: "start in view",
                    points: { start, end },
                    plane: end.plane,
                    intersects,
                });
            }
            else {
                story.push({
                    type: "end in view",
                    points: { start, end },
                    plane: start.plane,
                    intersects,
                });
            }
        }
        else if (inView === 0) {
            const startIndex = intersects.findIndex((x) => x.inView);
            const endIndex = findLastIndex(intersects, (x) => x.inView);
            const filteredIntersects = intersects.filter((x) => x.inView);
            const [start, end] = filteredIntersects.map((x) => ({
                resolvedPoint: getDimensions.apply(this, [x.value, true]),
                point: x.value,
            }));
            const pre = intersects.slice(0, startIndex);
            const post = intersects.slice(endIndex + 1);
            story.push({
                type: "intersects view",
                points: { start, end },
                intersects: {
                    pre,
                    post,
                },
            });
        }
        else {
            story.push({ type: "both in view", points: { start, end } });
        }
    });
    /* If no valid points ignore polygon */
    if (story.filter((x) => x.type !== "neither in view").length === 0)
        return [];
    const journeys = [];
    story.forEach((part, index) => {
        if (part.type === "start in view" || part.type === "intersects view") {
            const journey = { type: part.type, steps: [], points: [] };
            let i = index + 1;
            let control = 0;
            journey.steps.push(part.points.start, part.points.end);
            if (part.type === "start in view") {
                journey.steps.push(...part.intersects);
            }
            else if (part.type === "intersects view") {
                journey.steps.push(...part.intersects.post);
            }
            let j = 0;
            while (part.type === "start in view" ? j++ < story.length : j++ <= story.length) {
                control++;
                if (control > 1000)
                    throw "Control FAIL";
                if (i === story.length) {
                    i = 0;
                    continue;
                }
                const nextPart = story[i];
                if (nextPart.type === "end in view") {
                    journey.steps.push(...nextPart.intersects);
                    journey.steps.push(nextPart.points.start, nextPart.points.end);
                    break;
                }
                if (nextPart.type === "intersects view") {
                    journey.steps.push(...nextPart.intersects.pre);
                    break;
                }
                if (nextPart.type === "neither in view") {
                    journey.steps.push(...nextPart.intersects);
                }
                i++;
            }
            journeys.push(journey);
        }
        if (part.type === "both in view") {
            journeys.push({ steps: Object.values(part.points) });
        }
    });
    polywag.apply(this, [points, journeys]);
    const output = points.map((x) => x.resolvedPoint);
    return output.filter((x) => x !== null);
};

const resolver = function (options = {}) {
    const cinnamon = this;
    const { points: _points, lines: _lines, polygons: _polygons } = options;
    const renderClosestLast = options.renderClosestLast ?? false;
    //Points
    const points = (_points || cinnamon.points)
        .map((point) => {
        const { x, y, z } = manipulatePoint(cinnamon.centre, cinnamon.direction, point);
        if (z < 0)
            return null;
        const dimensions = cinnamon.getDimensions(new Point(x, y, z), true);
        if (dimensions === null)
            return null;
        const { width, height } = dimensions;
        return { width, height, point };
    })
        .filter((point) => point !== null)
        .map((point) => {
        const absolute = getDistance3D(cinnamon.centre, point.point);
        return { ...point, absolute };
    });
    //
    // Lines
    const lines = (_lines || cinnamon.lines)
        .map(({ start, end, ...rest }) => rest.ignore
        ? new Line(start, end, { ...rest })
        : new Line(manipulatePoint(cinnamon.centre, cinnamon.direction, start), manipulatePoint(cinnamon.centre, cinnamon.direction, end), { ...rest }))
        .map((line) => {
        const resolvedLine = resolveLine.apply(cinnamon, [line]);
        if (resolvedLine === null)
            return null;
        const { start, end } = resolvedLine;
        return { line, start, end };
    })
        .filter((line) => line !== null);
    //
    // Polygons
    let polygons = (_polygons || cinnamon.polygons)
        .map(({ points, ...rest }) => new Polygon(points.map((x) => manipulatePoint(cinnamon.centre, cinnamon.direction, x)), { ...rest }))
        .map((polygon) => {
        const points = resolvePolygon.apply(cinnamon, [
            polygon,
        ]);
        return { polygon, points };
    })
        .filter((polygon) => polygon !== null);
    if (renderClosestLast) {
        polygons = polygons.sort((a, b) => {
            const distanceA = getDistance3D(a.polygon.centre, cinnamon.centre);
            const distanceB = getDistance3D(b.polygon.centre, cinnamon.centre);
            return distanceB - distanceA;
        });
    }
    //
    return { polygons, lines, points };
};

const clearSVG = (svg) => {
    Array.from(svg.children).forEach((x) => svg.removeChild(x));
};

const setAttributes = (target, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
        if (value instanceof Object) {
            const newValue = Object.entries(value)
                .map(([key, value]) => `${key}: ${value};`)
                .join(" ");
            target.setAttribute(key, newValue);
            return;
        }
        value !== undefined && target.setAttribute(key, value);
    });
};

const getMagnitude = ({ distance, maxDistance: _maxDistance }) => {
    const maxDistance = _maxDistance ?? 100;
    let delta = maxDistance - distance;
    if (delta < 0)
        return 0;
    return delta / maxDistance;
};

const addPointsCommon = (cinnamon, point) => {
    const { point: { colourMagnitude, sizeMagnitude }, } = point;
    const distance = getDistance3D(cinnamon.centre, point.point);
    let opacity = 1;
    if (colourMagnitude) {
        const mag = getMagnitude({ distance });
        opacity = mag * colourMagnitude;
    }
    let { size } = point.point;
    if (sizeMagnitude) {
        const mag = getMagnitude({ distance });
        size = size + mag * sizeMagnitude;
    }
    return { opacity, size };
};

const addPointsSVG = (cinnamon, points) => {
    const { target } = cinnamon;
    for (let point of points) {
        const { width, height } = point;
        const { colour, id } = point.point;
        const { opacity, size } = addPointsCommon(cinnamon, point);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        setAttributes(circle, {
            cx: width,
            cy: height,
            r: size,
            style: { fill: colour, opacity },
            id,
        });
        target.appendChild(circle);
    }
};

const addLinesSVG = (svg, lines) => {
    lines.forEach((line) => {
        const { start, end } = line;
        const { colour, thickness, id } = line.line;
        const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        setAttributes(svgLine, {
            x1: start.width,
            y1: start.height,
            x2: end.width,
            y2: end.height,
            style: {
                stroke: colour,
                "stroke-width": thickness + "px",
            },
            id,
        });
        svg.appendChild(svgLine);
    });
};

const addPolygonsSVG = (svg, polygons) => {
    polygons.forEach((polygon) => {
        const { colour, id } = polygon.polygon;
        const polygonSVG = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const points = polygon.points.map(({ width, height }) => `${width},${height}`).join(" ");
        setAttributes(polygonSVG, {
            points,
            style: `fill: ${colour};`,
            id,
        });
        svg.appendChild(polygonSVG);
    });
};

const clearCanvas = (target) => {
    const context = target.getContext("2d");
    if (context === null)
        return;
    target.style.backgroundColor = "transparent";
    context.clearRect(0, 0, target.width, target.height);
};

const addPointCanvas = (cinnamon, point) => {
    const target = cinnamon.target;
    const context = target.getContext("2d");
    if (context === null)
        return;
    const { width, height, point: { colour }, } = point;
    const { opacity, size } = addPointsCommon(cinnamon, point);
    context.fillStyle = colour;
    context.globalAlpha = opacity;
    context.beginPath();
    context.arc(width, height, size, 0, 2 * Math.PI);
    context.fill();
};
const addPointsCanvas = (cinnamon, points) => {
    for (let point of points) {
        addPointCanvas(cinnamon, point);
    }
};

const addLinesCanvas = (target, lines) => {
    for (let line of lines) {
        const context = target.getContext("2d");
        if (context === null)
            return;
        const { start: { width: x1, height: y1 }, end: { width: x2, height: y2 }, } = line;
        context.strokeStyle = line.line.colour;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
};

const addPolygonsCanvas = (target, polygons) => {
    for (let polygon of polygons) {
        const context = target.getContext("2d");
        if (context === null || polygon.points.length === 0)
            return;
        const { colour } = polygon.polygon;
        context.fillStyle = colour;
        // ** Translucency
        // context.globalAlpha = itemOpacity;
        context.beginPath();
        // ** The first point, where we should start drawing the polygon from.
        const [{ width, height }] = polygon.points;
        context.moveTo(width, height);
        for (let { width, height } of polygon.points.slice(1)) {
            context.lineTo(width, height);
        }
        context.closePath();
        context.fill();
    }
};

const render = function (options = {}) {
    const cinnamon = this;
    const { points, lines, polygons } = cinnamon.resolver();
    if (cinnamon.type === "svg") {
        const target = cinnamon.target;
        clearSVG(target);
        addPolygonsSVG(target, polygons);
        addLinesSVG(target, lines);
        addPointsSVG(cinnamon, points);
    }
    if (cinnamon.type === "canvas") {
        const target = cinnamon.target;
        clearCanvas(target);
        addPolygonsCanvas(target, polygons);
        addLinesCanvas(target, lines);
        addPointsCanvas(cinnamon, points);
    }
};

const keys = {
    Shift: false,
    Alt: false,
};

const directionGrid = (cinnamon, target) => {
    target.addEventListener("keydown", (event) => {
        const { key } = event;
        const { x, y, z } = cinnamon.centre;
        const { zx, y: dirY } = cinnamon.direction;
        if (key === "ArrowRight") {
            if (keys.Shift) {
                cinnamon.direction = new Direction(zx + 15, dirY);
            }
            else {
                cinnamon.centre = new Point(x + 1, y, z);
            }
        }
        if (key === "ArrowLeft") {
            if (keys.Shift) {
                cinnamon.direction = new Direction(zx - 15, dirY);
            }
            else {
                cinnamon.centre = new Point(x - 1, y, z);
            }
        }
        if (key === "ArrowUp") {
            if (keys.Shift) {
                cinnamon.direction = new Direction(zx, dirY + 15);
            }
            else if (keys.Alt) {
                cinnamon.centre = new Point(x, y, z + 1);
            }
            else {
                cinnamon.centre = new Point(x, y + 1, z);
            }
        }
        if (key === "ArrowDown") {
            if (keys.Shift) {
                cinnamon.direction = new Direction(zx, dirY - 15);
            }
            else if (keys.Alt) {
                cinnamon.centre = new Point(x, y, z - 1);
            }
            else {
                cinnamon.centre = new Point(x, y - 1, z);
            }
        }
    });
};

class CircleView {
    constructor(centre = new Point(0, 0, 0), distance = 100) {
        this.centre = centre;
        this.distance = distance;
        this.direction = new Direction(0, 0);
    }
    getCinnamonCentre() {
        const { x, y, z } = this.centre;
        const zx = Math.cos(this.direction.y / RADIANS) * this.distance;
        return new Point(Math.sin(this.direction.zx / RADIANS) * -zx + x, Math.sin(this.direction.y / RADIANS) * this.distance + y, Math.cos(this.direction.zx / RADIANS) * -zx + z);
    }
}

const mouseRotateCentre = (cinnamon, target, options = {}) => {
    if (!!cinnamon.eventsList.get(CinnamonEvents.MouseRotateCentre)) {
        console.error(`Cannot add the same Cinnamon events twice. ${CinnamonEvents.MouseRotateCentre}`);
        return;
    }
    const mouseLeftClickDown = {
        state: false,
        location: {
            x: null,
            y: null,
        },
    };
    cinnamon.circleView = new CircleView(options.centre, options.distance);
    cinnamon.centre = cinnamon.circleView.centre.clone({ z: -cinnamon.circleView.distance });
    cinnamon.direction = cinnamon.circleView.direction;
    cinnamon.render();
    const mousedown = (event) => {
        const { button } = event;
        if (button !== 0)
            return;
        mouseLeftClickDown.state = true;
        mouseLeftClickDown.location.x = event.clientX;
        mouseLeftClickDown.location.y = event.clientY;
    };
    const mouseup = (event) => {
        const { button } = event;
        if (button !== 0)
            return;
        mouseLeftClickDown.state = false;
        mouseLeftClickDown.location.x = null;
        mouseLeftClickDown.location.y = null;
    };
    const mousemove = (event) => {
        const { button } = event;
        if (button !== 0)
            return;
        if (!mouseLeftClickDown.state)
            return;
        const deltaX = mouseLeftClickDown.location.x - event.clientX;
        const deltaY = mouseLeftClickDown.location.y - event.clientY;
        cinnamon.circleView.direction.zx += deltaX;
        const { zx } = cinnamon.circleView.direction;
        if (zx < 0) {
            cinnamon.circleView.direction.zx = 360 + zx;
        }
        if (zx > 360) {
            cinnamon.circleView.direction.zx = zx - 360;
        }
        cinnamon.circleView.direction.y += deltaY;
        const { y } = cinnamon.circleView.direction;
        if (y > 90) {
            cinnamon.circleView.direction.y = 90;
        }
        if (y < -90) {
            cinnamon.circleView.direction.y = -90;
        }
        cinnamon.centre = cinnamon.circleView.getCinnamonCentre();
        cinnamon.direction = cinnamon.circleView.direction;
        cinnamon.render();
        mouseLeftClickDown.location.x = event.clientX;
        mouseLeftClickDown.location.y = event.clientY;
    };
    const mousewheel = (event) => {
        const { deltaY } = event;
        if (deltaY > 0) {
            cinnamon.circleView.distance += 10;
        }
        else if (deltaY < 0) {
            cinnamon.circleView.distance -= 10;
        }
        cinnamon.centre = cinnamon.circleView.getCinnamonCentre();
        cinnamon.render();
    };
    target.addEventListener("mousedown", mousedown);
    target.addEventListener("mouseup", mouseup);
    target.addEventListener("mousemove", mousemove);
    target.addEventListener("wheel", mousewheel, { passive: true });
    cinnamon.eventsList.set(CinnamonEvents.MouseRotateCentre, () => {
        cinnamon.eventsList.delete(CinnamonEvents.MouseRotateCentre);
        target.removeEventListener("mousedown", mousedown);
        target.removeEventListener("mouseup", mouseup);
        target.removeEventListener("mousemove", mousemove);
        target.removeEventListener("wheel", mousewheel);
    });
};

const addEvents = function ({ type, target, options }) {
    const cinnamon = this;
    target = target ?? cinnamon.target;
    target.addEventListener("keydown", (event) => {
        const { key } = event;
        if (!conditionKeys.includes(key))
            return;
        keys[key] = true;
    });
    target.addEventListener("keyup", (event) => {
        const { key } = event;
        if (!conditionKeys.includes(key))
            return;
        keys[key] = false;
    });
    if (type === CinnamonEvents.DirectionGrid) {
        directionGrid(cinnamon, target);
    }
    if (type === CinnamonEvents.MouseRotateCentre) {
        mouseRotateCentre(cinnamon, target, options);
    }
};

const getPlaneFromThreePoints = (A, B, C) => {
    const a = (B.y - A.y) * (C.z - A.z) - (C.y - A.y) * (B.z - A.z);
    const b = (B.z - A.z) * (C.x - A.x) - (C.z - A.z) * (B.x - A.x);
    const c = (B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y);
    const d = -(a * A.x + b * A.y + c * A.z);
    return new Plane(a, b, c, d);
};

const generatePlains = (cinnamon) => {
    cinnamon.zeroZPlane = getPlaneFromThreePoints(new Point(0, 0, 0), new Point(10, 0, 0), new Point(10, 10, 0));
    const [x, y, z] = [
        Math.sin(cinnamon.aperture.zx / RADIANS),
        Math.tan(cinnamon.aperture.y / RADIANS),
        Math.cos(cinnamon.aperture.zx / RADIANS),
    ];
    cinnamon.planes = {
        top: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-1, y, 1), new Point(1, y, 1)),
        right: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(x, -1, z), new Point(x, 1, z)),
        bottom: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-1, -y, 1), new Point(1, -y, 1)),
        left: getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-x, -1, z), new Point(-x, 1, z)),
    };
    cinnamon.plainers = {
        "top-right": getPlaneFromThreePoints(new Point(0, 0, 0), new Point(x, y, z), new Point(-x, -y, z)),
        "top-left": getPlaneFromThreePoints(new Point(0, 0, 0), new Point(-x, y, z), new Point(x, -y, z)),
    };
};

const reset = function () {
    const cinnamon = this;
    // ** Remove all render items.
    cinnamon.points.length = 0;
    cinnamon.lines.length = 0;
    cinnamon.polygons.length = 0;
    // ** Remove the events that have been added.
    for (let [, item] of cinnamon.eventsList) {
        item();
    }
};

class Setup {
    constructor(centre = new Point(0, 0, 0), direction = new Direction(), baseAperture = 30) {
        this.centre = centre;
        this.direction = direction;
        this.baseAperture = baseAperture;
    }
}

const resize = function () {
    const cinnamon = this;
    const { target } = cinnamon;
    cinnamon.width = target.clientWidth;
    cinnamon.height = target.clientHeight;
    if (cinnamon.width === 0 || cinnamon.height === 0) {
        console.warn("Cinnamon: The width and or height for the element provided is 0.");
    }
    /* CANVAS Element */
    if (cinnamon.type === "canvas") {
        const target = cinnamon.target;
        target.width = target.clientWidth;
        target.height = target.clientHeight;
    }
    cinnamon.aperture = generateAperture(cinnamon.baseAperture, cinnamon.width, cinnamon.height);
};
class CinnamonBase {
    constructor() {
        this.resize = resize;
        this.resolver = resolver;
        this.render = render;
        this.addEvents = addEvents;
        this.reset = reset;
        this.getDimensions = getDimensions;
        this.getLineDimensions = getLineDimensions;
        this.addPointsAtEdgeOfView = addPointsAtEdgeOfView;
    }
}
class Cinnamon extends CinnamonBase {
    constructor(target, setup = new Setup()) {
        super();
        this.target = target;
        const { nodeName } = target;
        if (nodeName !== "svg" && nodeName !== "CANVAS") {
            throw new Error("Element must be either SVG or CANVAS.");
        }
        if (nodeName === "svg") {
            this.type = "svg";
        }
        if (nodeName === "CANVAS") {
            this.type = "canvas";
        }
        this.eventsList = new Map();
        this.baseAperture = setup.baseAperture;
        this.resize();
        this.centre = setup.centre;
        this.direction = setup.direction;
        generatePlains(this);
        this.points = [];
        this.lines = [];
        this.polygons = [];
    }
}

export { Cinnamon, CinnamonEvents, Direction, Line, Line2D, Plane, Point, Point2D, Polygon, Polygon2D, RADIANS };
