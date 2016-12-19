var is = require('is');

function Point(x ,y) {
  if (!(this instanceof Point)) return new Point(x,y);

  this.x = x;
  this.y = y;
}

Point.isPoint = function(p) {
  return p instanceof Point;
};

Point.distance = function(p1, p2) {
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
};

Point.prototype.distance = function(another) {
  return Point.distance(this, another);
};

Point.nearest = function(centerPoint, points) {
  if (!Point.isPoint(centerPoint)) {
    return null;
  }

  return points.reduce(function(minPoint, currentPoint){
    var currentDistance = centerPoint.distance(currentPoint);
    if (currentDistance < minPoint.distance ) {
      return {point: currentPoint, distance: currentDistance};
    }
    return minPoint;
  }, {point: null, distance: Infinity}).point;
};

Point.prototype.nearest = function(points) {
  return Point.nearest(this, points);
};

module.exports = Point;