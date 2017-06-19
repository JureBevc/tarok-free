/*
  Menu manager and button holder
*/

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
    socket.emit("createroom", {name: Menu.current.get("Name input").input, pass: Menu.current.get("Password input").input, players: []});
    console.log(Menu.current.get("Name input").input);
    socket.on("createroom-response", function(msg){
      console.log(msg);
      Menu.current.get("Info text").text = msg;
      socket.off("createroom-response");
    });
  }));
  Menu.main.add(new OutputField("Info text", "", "#2D3142", 400, 300, 100, 30));

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
  Menu.current.get("Select room text").elements = [];
  for(var i = 0; i < roomdata.length; i++)
    Menu.current.get("Select room text").elements.push(new Button("room " + i,roomdata[i].name + " (" + roomdata[i].players.length + " oseb)", "#BFC0C0", 50, 150 + 50 * i, 250, 30, function(){
      var pass = prompt("Vnesite geslo sobe:");
    }));
  //Menu.current.get("Select room text").elements = buttons;
  Game.rooms = roomdata;
}
