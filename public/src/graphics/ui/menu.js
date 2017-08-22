/*
  Menu manager and button holder
*/

//TODO: Comments!!!
var Menu = function(){
  this.elements = [];

  this.add = function(element){
    this.elements.push(element);
  }

  this.get = function(tag){
    var r = null;
    for(var i = 0; i < this.elements.length; i++){
      r = this.elements[i].get(tag);
      if(r != null) return r;
    }
    return r;
  }

  this.typed = function(char){
    for(var i = 0; i <  this.elements.length; i++)
      if(this.elements[i] instanceof InputField)
        this.elements[i].inputTyped(char);
  }

  this.update = function(){
    for(var i = 0; i < this.elements.length; i++){
      this.elements[i].update();

      // Input field focus
      // TODO: Move into InputField ???
      if(this.elements[i] instanceof InputField && Menu.inBounds(Input.x, Input.y, this.elements[i]) && Input.click){
        for(var j = 0; j <  this.elements.length; j++)
          if(this.elements[j] instanceof InputField)
            this.elements[j].active = false;
        this.elements[i].active = true;
      }
    }
  };

  this.draw = function(){
    for(var i = 0; i < this.elements.length; i++)
      this.elements[i].draw();
  };
};

Menu.login = new Menu();
Menu.main = new Menu();
Menu.room = new Menu();
Menu.game = new Menu();

Menu.current = new Menu();

//TODO: Write more comments
Menu.init = function(){
  // Create login menu
  Menu.login.add(new OutputField("Login message", "Izberite ime", "#2D3142", 100, 200, 100, 30));
  Menu.login.add(new InputField("Login input", "#2D3142", 100, 250, 400, 30));
  Menu.login.add(new Button("Name submit button", "Izberi","#BFC0C0", 420, 300, 80, 30, function(){
        var input = Menu.current.get("Login input").input;
        socket.emit("namecheck", input);
        socket.on("namecheck-answer", function(msg){
            Menu.current.get("Login message").text = msg;
            if(msg == "OK"){
              Game.username = input;
              Menu.current = Menu.main;
              socket.on("roomdata", Menu.setRooms);
            }
          socket.off('namecheck-answer');
        });
  }));

  // Create main menu
  Menu.main.add(new OutputField("Welcome text", "Dobrodošli!", "#2D3142", 300, 50, 100, 30));
  Menu.main.add(new OutputField("Select room text", "Izberi sobo:", "#2D3142", 50, 100, 100, 30));
  Menu.main.add(new OutputField("Create room text", "Ustvari sobo:", "#2D3142", 400, 100, 100, 30));
  Menu.main.add(new OutputField("Name text", "Ime", "#2D3142", 400, 150, 100, 30));
  Menu.main.add(new OutputField("Password text", "Geslo", "#2D3142", 400, 200, 100, 30));
  Menu.main.add(new InputField("Name input", "#2D3142", 500, 150, 200, 30));
  Menu.main.add(new InputField("Password input", "#2D3142", 500, 200, 200, 30));
  Menu.main.add(new Button("Create button", "Ustvari", "#BFC0C0", 550, 250, 80, 30, function(){
    var roomname = Menu.current.get("Name input").input;
    var password = Menu.current.get("Password input").input;
    socket.emit("createroom", {name: roomname, pass: password, players: [], owner: socket.id});
    socket.on("createroom-response", function(msg){
      Menu.current.get("Info text").text = msg;
      if(msg == "OK"){
        Menu.joinRoom(roomname, password, true);
      }
      socket.off("createroom-response");
    });
  }));
  Menu.main.add(new OutputField("Info text", "", "#2D3142", 400, 300, 100, 30));
  Menu.main.add(new OutputField("Room join info text", "", "#2D3142", 400, 400, 100, 30));

  // Create room menu
  Menu.room.add(new OutputField("Room name text", "Soba:", "#2D3142", 50, 50, 100, 30));
  Menu.room.add(new OutputField("Players in room text", "Igralci v sobi:", "#2D3142", 50, 100, 100, 30));
  Menu.room.add(new OutputField("Room response text", "", "#FF0000", 200, 0, 100, 30));

  // Set initial current menu
  Menu.current = Menu.login;
}

// Updates current menu
Menu.updateCurrent = function(){
  Menu.current.update();
}

// Draws current menu
Menu.drawCurrent = function(){
  Menu.current.draw();
}

// Checks if x and y are in bounds of element
Menu.inBounds = function(x, y, el){
  if(x > el.x && x < el.x + el.w && y > el.y && y < el.y + el.h)
    return true;
  return false;
}

Menu.setRooms = function(roomdata){
  if(!Menu.current.get("Select room text")) return;
  Menu.current.get("Select room text").elements = [];
  for(var i = 0; i < roomdata.length; i++)
    Menu.current.get("Select room text").elements.push(new Button(roomdata[i].name,roomdata[i].name + " (" + roomdata[i].players.length + " oseb)", "#BFC0C0", 50, 150 + 50 * i, 250, 30, function(obj){
      var password = prompt("Vnesite geslo sobe:");
      var roomname = obj.tag;
      Menu.joinRoom(roomname, password);
    }));
}

Menu.joinRoom = function(roomname, password, isOwner){
  socket.emit("joinroom", {name: roomname, pass: password});
  socket.on("joinroom-response", function(msg){
    if(msg == "OK"){
      socket.on(roomname, Menu.getRoomInfo);
      Menu.current = Menu.room;
      Game.roomname = roomname;
      Menu.current.get("Room name text").text = "Soba: " + roomname;
      if(isOwner)
        Menu.current.add(new Button("Start game button", "Začni igro", "#BFC0C0", 500, 50, 120, 30, function(){
          console.log("Začetek igre!");
          socket.emit("begin-game", roomname);
          socket.on("begin-game-" + roomname, function(msg){
            Game.playResponse(msg);
            socket.off("begin-game-"+roomname);
          });
        }));
    }else{
      Menu.current.get("Room join info text").text = msg;
    }
    socket.off("joinroom-response");
  });
}

Menu.getRoomInfo = function(msg){
  if(msg){
    var players = "";
    for(var i = 0; i < msg.players.length; i++)
      players += msg.players[i].name + ((i + 1 == msg.players.length)? "": ", ");
    Menu.current.get("Players in room text").text = "Igralci v sobi: " + players;
  }
}
