var Img = {};

Img.kara = [];
Img.kriz = [];
Img.pik = [];
Img.srce = [];
Img.tarok = [];

Img.names = ["1", "2", "3", "4", "C", "D", "J", "K"];

Img.loadCards = function(){
  // Load normal suits
  for(var i = 0; i < Img.names.length; i++){
      var img = new Image();
      img.src = "cards/Ka" + Img.names[i] + ".png";
      Img.kara.push(img);
  }
  for(var i = 0; i < Img.names.length; i++){
      var img = new Image();
      img.src = "cards/Kr" + Img.names[i] + ".png";
      Img.kriz.push(img);
  }
  for(var i = 0; i < Img.names.length; i++){
      var img = new Image();
      img.src = "cards/Pi" + Img.names[i] + ".png";
      Img.pik.push(img);
  }
  for(var i = 0; i < Img.names.length; i++){
      var img = new Image();
      img.src = "cards/Sr" + Img.names[i] + ".png";
      Img.srce.push(img);
  }
  // Load taroks
  for(var i = 1; i <= 22; i++){
      var img = new Image();
      img.src = "cards/T" + i + ".png";
      Img.tarok.push(img);
  }
}
