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
    console.log('user disconnected ' + socket.id);
    for(var i = 0; i < names.length; i++){
      if(names[i].id == socket.id){
        names.splice(i, 1);
        break;
      }
    }
  });
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
    console.log(answer)
    socket.emit('namecheck-answer', answer);
  });
});

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
