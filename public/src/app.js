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

}

// Main update funciton
Main.update = function(){
  console.log(Input.x + " " + Input.y + " " + Input.down);
}

// Main draw funciton
Main.draw = function(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#D6D1B1";
  c.fillRect(0, 0, canvas.width, canvas.height);
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
