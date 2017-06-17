/*
      Application begins here
*/

// Get canvas and context for drawing
var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");

// Initialize socket.io
var socket = io();

// Create main class
var Main = {};

// Initialize main
Main.init = function(){
  Game.init();
}

// Main update funciton
Main.update = function(){
  Game.update();
  Input.click = false;
}

// Main draw funciton
Main.draw = function(){
  // Clear screen and draw colored background
  c.clearRect(0, 0, canvas.width, canvas.height);
  Draw.rect(0,0,canvas.width, canvas.height, "#D6D1B1");
  Game.draw();
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
