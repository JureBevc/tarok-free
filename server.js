var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve all static files in public folder
app.use(express.static('public'));


io.on('connection', function(socket){
  //console.log('a user connected');
  socket.on('disconnect', function(){
    //console.log('user disconnected');
    for(var i = 0; i < names.length; i++){
      if(names[i].id == socket.id){
        names.splice(i, 1);
        break;
      }
    }
    for(var i = 0; i < rooms.length; i++)
      for(var j = 0; j < rooms[i].players.length; j++){
        if(rooms[i].players[j].id == socket.id)
          rooms[i].players.splice(j, 1);
        }
  });

  // Handle names
  socket.on("namecheck", function(msg){
    var answer = "OK";
    if(msg.length < 3)
      answer = "Ime je prekratko! (najmanj 3 znake)";
    if(msg.length > 16)
      answer = "Ime je predolgo! (največ 16 znakov)";
    for(var i = 0; i < names.length; i++){
      if(names[i].name == msg){
        answer = "Ime je zasedeno!";
        break;
      }
    }
    if(answer == "OK"){
      names.push({name: msg, id: socket.id});
    }
    //console.log(answer)
    socket.emit('namecheck-answer', answer);
  });

  // Handle room creation
  socket.on("createroom", function(msg){
    var success = true;
    for(var i = 0; i < rooms.length; i++){
      if(msg.name.length < 3){
        socket.emit("createroom-response", "Ime mora biti dolgo vsaj 3 črke");
        success = false;
        break;
      }else if(rooms[i].name == msg.name){
        socket.emit("createroom-response", "Soba s tem imenom že obstaja");
        success = false;
        break;
      }
    }
    if(success){
      socket.emit("createroom-response", "OK");
      rooms.push({name: msg.name, pass: msg.pass, owner: socket.id, players: [], playing: false});
    }
  });

  // Handle joining rooms
  socket.on("joinroom", function(msg){
    console.log("Joining room " + msg);
    var answer = "Soba ne obstaja.";
    for(var i = 0; i < rooms.length; i++){
      if(rooms[i].name == msg.name){
        if(rooms[i].pass.toUpperCase() == msg.pass.toUpperCase()){
          if(rooms[i].players.length < 4){
            rooms[i].players.push(getPlayer(socket.id));
            answer = "OK";
          }else{
            answer = "Soba je polna."
          }
        }else{
          answer = "Napačno geslo.";
        }
      }
    }
    socket.emit("joinroom-response", answer);
  });

  socket.on("begin-game", function(msg){
    var answer = "Soba ne obstaja";
    for(var i = 0; i < rooms.length; i++){
      if(rooms[i].name == msg){
        if(rooms[i].players.length == 3 || rooms[i].players.length == 4){
          answer = "OK";
          rooms[i].playing = true;
        }else
          answer = "Soba mora imeti 3 ali štiri igralce";
      }
    }
    socket.emit("begin-game-" + msg, answer);
  });

});

var names = [];

function getPlayer(id){
  for(var i = 0; i < names.length; i++){
    if(names[i].id == id)
      return names[i];
  }
}

var rooms = [];

function sendRoomData(){
  io.sockets.emit("roomdata", rooms);
  for(var i = 0; i < rooms.length; i++){
    io.sockets.emit(rooms[i].name, rooms[i]);
  }
}

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
  // Send room data to all clients every second
  setInterval(sendRoomData, 1000);
});
