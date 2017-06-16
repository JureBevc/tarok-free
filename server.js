var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve all static files in public folder
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
