function Cantar(){

  var backButton = new Button(40, 38, btnBack);
  var continuarButton = new Button(498, 587, btnGradient, 'CONTINUAR');
  var timbre = loadImage('assets/cantar/timbre.png');
  var comment = loadImage('assets/cantar/comment.png');
  var explicacao = loadImage('assets/cantar/explicacao.png');
  var myText = "Para esse exercício, você terá que cantar a nota pedida. Para lhe ajudar, escute a nota clicando no botão abaixo.";
  var myText2 = "Quando você atingir a frequência da nota, você terá que manter o som de sua voz por pelo menos 2 segundos.";
  this.draw = function(){
    clear();
    background(bgNoise);

    backButton.draw();
    // image(timbre, 160, 143);
    // image(comment, 160, 233);
    //image(iconSound, width/2+30, height/3+40);
    textFont(boldFont);
    textSize(40);
    text("TIMBRE", width/7, 150);
    textFont(regularFont);
    textSize(30);
    drawText(myText, width/7, 180);
    image(explicacao, 600, 290);
    drawText(myText2, width/7, 400);
    textSize(20);
    fill(255, 92, 92);
    text("Este exercício ainda está em desenvolvimento. Mas, por enquanto, você pode testá-lo com um oscilador de frequência para P5.js.", width/7, 500, 920, 80);
    continuarButton.draw();

    checkPress();

  };

  var checkPress = function(){

    if (buttonPressed(backButton)){
      state.currentScreen = 'menu';
    }
    if (buttonPressed(continuarButton)){
      state.currentScreen = 'cantarJogo';
    }

  };

  var drawText = function(myText, x, y) {
    text(myText, x, y, 915, 150);
  };
}
