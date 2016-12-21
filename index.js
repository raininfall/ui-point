var Offset = require('ui-offset');

function Point(x ,y) {
  if (!(this instanceof Point)) return new Point(x,y);

  this._x = x;
  this._y = y;
}

Point.isPoint = function(p) {
  return p instanceof Point;
};

Point.offsetTo = function(p1, p2) {
  return Offset(p2.x()-p1.x(), p2.y()-p1.y());
};

Point.offsetFrom = function(p1, p2) {
  return Offset(p1.x()-p2.x(), p1.y()-p2.y());
};

Point.prototype.offsetTo = function(another) {
  return Point.offsetTo(this, another);
};

Point.prototype.offsetFrom = function(another) {
  return Point.offsetFrom(this, another);
}

Point.prototype.distanceSrq = function(another) {
  return this.offsetTo(another).distanceSrq();
};

Point.prototype.distance = function(another) {
  return this.offsetTo(another).distance();
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

Point.prototype.x = function() {
  return this._x;
};

Point.prototype.y = function() {
  return this._y;
};

Point.prototype.clone = function() {
  return new Point(this._x, this._y);
};

Point.equals = function(p1, p2) {
  return p1.x() == p2.x() && p1.y() == p2.y();
};

Point.prototype.equals = function(another) {
  return Point.equals(this, another);
};

module.exports = Point;
