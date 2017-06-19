var OutputField = function(tag, text, color, x, y, w, h){
  this.text = text;
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

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

  this.update = function(){
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].update();
  }

  // Draw button
  this.draw = function(){
    //Draw.rect(this.x, this.y, this.w, this.h, this.color, 2);
    Draw.text(this.text, this.x + 10, this.y + this.h - 3, 20, "#2D3142");

    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].draw();
  }
};
