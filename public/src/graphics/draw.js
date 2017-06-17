/*
    Drawing class
*/
var Draw = {};

// For drawing images
Draw.image = function(img, x, y){
  c.drawImage(img, x, y);
};

// For drawing a filled or empty rectangle
Draw.rect = function(x, y, w, h, color, strokeWidth){
  if(strokeWidth){
    c.lineWidth = strokeWidth;
    c.strokeStyle = color;
    c.strokeRect(x,y,w,h);
  }else{
    c.fillStyle = color;
    c.fillRect(x,y,w,h);
  }
};

// For drawing text
Draw.text = function(text, x, y, size, color){
  c.fillStyle = color;
  c.font =  size + "px Arial";
  c.fillText(text, x, y);
}
