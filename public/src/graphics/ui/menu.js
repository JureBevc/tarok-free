/*
  Menu manager and button holder
*/
// TODO: Reweite this with more consistency
var Menu = {};


Menu.login = [];
Menu.main = [];
Menu.game = [];

Menu.current = [];

//TODO: Write more comments
Menu.init = function(){
  // Create login menu
  Menu.login.push(new OutputField("Izberite ime", "#2D3142", 100, 200, 100, 30));
  Menu.login.push(new InputField("#2D3142", 100, 250, 400, 30));
  Menu.login.push(new Button("Izberi","#BFC0C0", 420, 300, 80, 30, function(){
    for(var i = 0; i < Menu.current.length; i++){
      if(Menu.current[i] instanceof InputField){
        var input = Menu.current[i].input;
        socket.emit("namecheck", input);
        socket.on("namecheck-answer", function(msg){
          for(var j = 0; j < Menu.current.length; j++)
            if(Menu.current[j] instanceof OutputField)
              Menu.current[j].text = msg;
            if(msg == "OK"){
              Game.username = input;
                //console.log(Game.username);
              Menu.current = Menu.main;
              socket.on("roomdata", Menu.setRooms);
            }
          socket.off('namecheck-answer');
        });
        break;
      }
    }
  }));

  // Create main menu
  Menu.main.push(new OutputField("Dobrodošli!", "#2D3142", 300, 50, 100, 30));
  Menu.main.push(new OutputField("Izberi sobo:", "#2D3142", 50, 100, 100, 30));
  Menu.main.push(new OutputField("Ustvari sobo:", "#2D3142", 400, 100, 100, 30));
  Menu.main.push(new OutputField("Ime", "#2D3142", 400, 150, 100, 30));
  Menu.main.push(new OutputField("Geslo", "#2D3142", 400, 200, 100, 30));
  Menu.main.push(new InputField("#2D3142", 500, 150, 200, 30));
  Menu.main.push(new InputField("#2D3142", 500, 200, 200, 30));
  Menu.main.push(new Button("Ustvari", "#BFC0C0", 550, 250, 80, 30, function(){
    socket.emit("createroom", {name: Menu.current[5].input, pass: Menu.current[6].input, players: []});
    socket.on("createroom-response", function(msg){
      Menu.current[8].text = msg;
      if(msg == "OK"){
        console.log("Pomakni v sobo");
      }
      socket.off("createroom-response");
    });
  }));
  Menu.main.push(new OutputField("", "#2D3142", 400, 300, 100, 30));

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
    if(Menu.current[i] instanceof InputField && Menu.inBounds(Input.x, Input.y, Menu.current[i]) && Input.click){
      for(var j = 0; j <  Menu.current.length; j++)
        if(Menu.current[j] instanceof InputField)
          Menu.current[j].active = false;
      Menu.current[i].active = true;
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

Menu.setRooms = function(roomdata){
  for(var i = 0; i < Game.rooms.length; i++)
      Menu.current.splice(Menu.current.length - 1, 1);
  for(var i = 0; i < roomdata.length; i++)
    Menu.current.push(new Button(roomdata[i].name + " (" + roomdata[i].players.length + " oseb)", "#BFC0C0", 100, 150 + 50 * i, 200, 30, function(){
      console.log("Clicked on room!");
    }));
  Game.rooms = roomdata;
}
