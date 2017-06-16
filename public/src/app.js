/*
      Application begins here
*/

// Get canvas and context for drawing
var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");

// Initialize socket.io
// var socket = io();

// Create main class
var Main = {};

// Initialize main
Main.init = function(){
  Img.loadCards();
}

// Main update funciton
Main.update = function(){
}

// Main draw funciton
Main.draw = function(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#D6D1B1";
  c.fillRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < Img.kara.length; i++){
    c.drawImage(Img.kara[i], i * 50, 0);
    c.drawImage(Img.kriz[i], i * 50, 100);
    c.drawImage(Img.pik[i], i * 50, 200);
    c.drawImage(Img.srce[i], i * 50, 300);
  }
  for(var i = 0; i < Img.tarok.length; i++)
    c.drawImage(Img.tarok[i], i * 25, 400);
}

// Main game loop
Main.loop = function(){
  Main.update();
  Main.draw();
}

// Initialize
Main.init();
// Draw ~30fps
//TODO: Could be lower for better performance on crapy machines
setInterval(Main.loop, 1000/30);
