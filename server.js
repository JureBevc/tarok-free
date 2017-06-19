var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var names = [];

// Serve all static files in public folder
app.use(express.static('public'));


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    for(var i = 0; i < names.length; i++){
      if(names[i].id == socket.id){
        names.splice(i, 1);
        break;
      }
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

  // Handle rooms
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
    if(success)
      rooms.push(msg);
  });

});

var rooms = [];

function sendRoomData(){
  io.sockets.emit("roomdata", rooms);
}

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
  // Send room data to all clients every second
  setInterval(sendRoomData, 1000);
});
