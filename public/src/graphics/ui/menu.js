/*
  Menu manager and button holder
*/
var Menu = {};

Menu.main = [];
Menu.game = [];

Menu.current = [];

Menu.init = function(){
  Menu.main.push(new Button("Test button", "#493843", 100, 100, 100, 30, function(){
    console.log("Test button")
  }));

  Menu.current = Menu.main;
}

Menu.updateCurrent = function(){
  for(var i = 0; i < Menu.current.length; i++){
    if(Menu.inBounds(Input.x, Input.y, Menu.current[i])){
      Menu.current[i].hover = true;
      if(Input.click)
        Menu.current[i].doAction();
    }else{
      Menu.current[i].hover = false;
    }
  }
}

Menu.drawCurrent = function(){
  for(var i = 0; i < Menu.current.length; i++){
    Menu.current[i].draw();
  }
}

Menu.inBounds = function(x, y, el){
  if(x > el.x && x < el.x + el.w && y > el.y && y < el.y + el.h)
    return true;
  return false;
}
