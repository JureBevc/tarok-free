var InputField = function(color, x, y, w, h){
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.input = "";
  this.active = false;

  this.inputTyped = function(char){
    if(this.active){
      if(char == "back"){
        if(this.input.length > 0)
          this.input = this.input.substr(0, this.input.length - 1);
      }else if(this.input.length < 20){
        this.input += char;
      }
    }
  }

  // Draw button
  this.draw = function(){
    Draw.rect(this.x, this.y, this.w, this.h, this.color, 2);
    Draw.text(this.input, this.x + 10, this.y + this.h - 3, 20, "#2D3142");
    if(this.active)
        Draw.rect(this.x, this.y, this.w, this.h, "#990000", 2);
  }
};
