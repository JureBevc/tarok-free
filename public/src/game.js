/*
    Game class
*/
var Game = {};

Game.username = "";
Game.rooms = [];

Game.init = function(){
  Img.loadCards();
  Menu.init();
}

Game.update = function(){
  Menu.updateCurrent();
}

Game.draw = function(){
  Menu.drawCurrent();
}
