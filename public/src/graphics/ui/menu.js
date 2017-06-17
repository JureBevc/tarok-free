/*
  Menu manager and button holder
*/
var Menu = {};

Menu.login = [];
Menu.main = [];
Menu.game = [];

Menu.current = [];

Menu.init = function(){
  // Create login menu
  Menu.login.push(new OutputField("Izberite ime", "#2D3142", 100, 200, 100, 30));
  Menu.login.push(new InputField("#2D3142", 100, 250, 400, 30));
  Menu.login.push(new Button("Izbriši","#BFC0C0", 100, 300, 80, 30, function(){
    for(var i = 0; i < Menu.current.length; i++){
      if(Menu.current[i] instanceof InputField){
        Menu.current[i].input = "";
      }
    }
  }));
  Menu.login.push(new Button("Izberi","#BFC0C0", 420, 300, 80, 30, function(){
    for(var i = 0; i < Menu.current.length; i++){
      if(Menu.current[i] instanceof InputField){
        console.log("Checking name...");
        socket.emit("namecheck", Menu.current[i].input);
        socket.on("namecheck-answer", function(msg){
          for(var j = 0; j < Menu.current.length; j++)
            if(Menu.current[j] instanceof OutputField)
              Menu.current[j].text = msg;
            if(msg == "OK")
              Menu.current = Menu.main;
          socket.off('namecheck-answer');
        });
        break;
      }
    }
  }));


  // Set initial current menu
  Menu.current = Menu.login;
}

// Updates current menu
Menu.updateCurrent = function(){
  for(var i = 0; i < Menu.current.length; i++){
    // Check for button hovering and do action on click
    if(Menu.current[i] instanceof Button
      && Menu.inBounds(Input.x, Input.y, Menu.current[i])){
      Menu.current[i].hover = true;
      if(Input.click)
        Menu.current[i].doAction();
    }else{
      Menu.current[i].hover = false;
    }
  }
}

// Draws current menu
Menu.drawCurrent = function(){
  for(var i = 0; i < Menu.current.length; i++){
    Menu.current[i].draw();
  }
}

// Checks if x and y are in bounds of element
Menu.inBounds = function(x, y, el){
  if(x > el.x && x < el.x + el.w && y > el.y && y < el.y + el.h)
    return true;
  return false;
}
