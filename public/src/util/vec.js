/*
    Standard vector class
*/
var Vec = function(x, y){
  this.x = x;
  this.y = y;

  // Length
  this.len = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Add vectors
  this.add = function(v){
    return new Vec(this.x + v.x, this.y + v.x);
  }

  // Subtract vectors
  this.sub = function(v){
    return new Vec(this.x - v.x, this.y - v.x);
  }

  // Scalar multiplication
  this.mul = function(m){
    return new Vec(this.x * m, this.y * m);
  }

}
