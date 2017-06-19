/*
  Button class
*/
var Button = function(tag, text, color, x, y, w, h, action){
  this.text = text;
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.action = action;

  this.hover = false;

  this.tag = tag;

  this.elements = [];

  this.get = function(tag){
    if(this.tag  == tag)
     return this;
    var r = null;
    for(var i = 0; i < this.elements.length; i++){
     r = this.elements[i].get(tag);
     if(r != null) return r;
    }
    return r;
  }

  // Perform button action
  this.doAction = function(){
    if(this.action != null)
      this.action();
  }

  this.update = function(){
    // Button hover and click
    if(Menu.inBounds(Input.x, Input.y, this)){
      this.hover = true;
      if(Input.click)
        this.doAction();
    }else{
      this.hover = false;
    }
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].update();
  }

  // Draw button
  this.draw = function(){
    if(this.action)
      Draw.rect(this.x, this.y, this.w, this.h, this.color);
    Draw.text(this.text, this.x + 10, this.y + this.h - 6, 20, "#2D3142");
    if(this.hover && this.action)
      Draw.rect(this.x, this.y, this.w, this.h, "#61988E", 2);
    else if(this.action)
      Draw.rect(this.x, this.y, this.w, this.h, "#2D3142", 1);
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].draw();
  }
};
