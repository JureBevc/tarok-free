/*
  Button class
*/
var Button = function(text,color, x, y, w, h, action){
  this.text = text;
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.action = action;

  this.hover = false;

  // Perform button action
  this.doAction = function(){
    this.action();
  }

  // Draw button
  this.draw = function(){
    //Draw.rect(this.x, this.y, this.w, this.h, this.color);
    Draw.text(this.text, this.x, this.y + this.h - 3, 20, "#000000");
    if(this.hover)
      Draw.rect(this.x, this.y, this.w, this.h, "#61988E", 2);
  }
};
