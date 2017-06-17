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
    if(this.action != null)
      this.action();
  }

  // Draw button
  this.draw = function(){
    if(this.action)
      Draw.rect(this.x, this.y, this.w, this.h, this.color);
    Draw.text(this.text, this.x + 10, this.y + this.h - 3, 20, "#2D3142");
    if(this.hover && this.action)
      Draw.rect(this.x, this.y, this.w, this.h, "#61988E", 2);
    else if(this.action)
      Draw.rect(this.x, this.y, this.w, this.h, "#2D3142", 1);
  }
};
