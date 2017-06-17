var OutputField = function(text, color, x, y, w, h){
  this.text = text;
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  // Draw button
  this.draw = function(){
    //Draw.rect(this.x, this.y, this.w, this.h, this.color, 2);
    Draw.text(this.text, this.x + 10, this.y + this.h - 3, 20, "#2D3142");
  }
};
