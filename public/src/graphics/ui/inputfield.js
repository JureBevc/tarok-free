var InputField = function(tag, color, x, y, w, h){
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.tag = tag;

  this.input = "";
  this.active = false;

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

  this.inputTyped = function(char){
    if(this.active){
      if(char == "back"){
        if(this.input.length > 0)
          this.input = this.input.substr(0, this.input.length - 1);
      }else if(this.input.length < 20 && this.input.length * 15 < this.w){
        this.input += char;
      }
    }
  }

  this.update = function(){
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].update();
  }

  // Draw button
  this.draw = function(){
    Draw.rect(this.x, this.y, this.w, this.h, this.color, 2);
    Draw.text(this.input, this.x + 10, this.y + this.h - 3, 20, "#2D3142");
    if(this.active)
        Draw.rect(this.x, this.y, this.w, this.h, "#990000", 2);
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].draw();
  }
};
