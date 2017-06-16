/*
    Mouse and keyboard input class
*/

var Input = {
  a:65,
  b:66,
  c:67,
  d:68,
  e:69,
  f:70,
  g:71,
  h:72,
  i:73,
  j:74,
  k:75,
  l:76,
  m:77,
  n:78,
  o:79,
  p:80,
  q:81,
  r:82,
  s:83,
  t:84,
  u:85,
  v:86,
  w:87,
  x:88,
  y:89,
  z:90,
  space: 32
};

Input.x = 0;
Input.y = 0;
Input.down = false;
Input.key = [];


// Mouse events
Input.mousemove = function(evt){
  // Set mouse position relative to canvas border
  // and not the window (client) border
  var rect = canvas.getBoundingClientRect();
  Input.x = evt.clientX - rect.left;
  Input.y = evt.clientY - rect.top;
}

Input.mousedown = function(){
  Input.down = true;
}

Input.mouseup = function(){
  Input.down = false;
}

// Key events
Input.keydown = function(evt){
  Input.key[evt.keyCode] = true;
}

Input.keyup = function(evt){
  Input.key[evt.keyCode] = false;
}

// Mouse event listeners
canvas.addEventListener("mousemove", Input.mousemove);
canvas.addEventListener("mousedown", Input.mousedown);
canvas.addEventListener("mouseup", Input.mouseup);

// keyboard event listeners
window.addEventListener('keydown',Input.keydown);
window.addEventListener('keyup',Input.keyup);
