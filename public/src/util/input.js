/*
    Mouse and keyboard input class
*/

var Input = {};

Input.x = 0;
Input.y = 0;
Input.down = false;
Input.click = false;
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
  Input.click = true;
}

// Key events
Input.keydown = function(evt){
  // Parse typed input to current input field
    if(evt.keyCode >= 65 && evt.keyCode <= 90 || evt.keyCode == 8){
      if(evt.keyCode == 8){
        evt.preventDefault();
        evt.stopPropagation();
        Menu.current.typed("back");
        return true;
      }else
        Menu.current.typed(String.fromCharCode(evt.keyCode));
  }
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
window.addEventListener('keydown',Input.keydown, true);
window.addEventListener('keyup',Input.keyup);
