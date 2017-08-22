/*
    Game class
*/
var Game = {};

Game.username = "";
Game.roomname;
Game.playing = false;

Game.playResponse = function(msg){
  if(msg == "OK"){
    socket.on("game-info-" + Game.roomname, Game.playerMoves);
  }else{
    Menu.current.get("Room response text").text = msg;
  }
}

// Get player moves from server
Game.playerMoves = function(msg){

}

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
