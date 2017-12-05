function RitmoResultado(){

  var novamenteButton = new Button(327, 586, btnTransparent, 'NOVAMENTE');
  var menuButton = new Button(667, 586, btnGradient, 'MENU');

  this.draw = function(){
    clear();
    background(bgNoise);

    var l = usuarios[idUsuario].pontos.ritmo.length;
    var r = usuarios[idUsuario].pontos.ritmo[l-1].right;
    var w = usuarios[idUsuario].pontos.ritmo[l-1].wrong;

    fill(255);
    textFont(boldFont);
    textSize(42);
    textAlign(CENTER);
    text('RESULTADO', width/2, 143);

    if (w >= 3) {
      text('Parece que você não foi muito bem. Tente novamente.', width/2, 233);
    } else {
      text('Parece que você se saiu muito bem. Parabéns!', width/2, 233);
    }

    textFont(regularFont);
    textSize(32);
    text('Acertos', 548, 347);
    text('Erros', 548, 412);

    fill(111, 193, 62);
    text(r, 777, 347);
    fill(255, 92, 92);
    text(w, 777, 412);

    novamenteButton.draw();
    menuButton.draw();

    checkPress();

  };

  var checkPress = function(){

    if (buttonPressed(novamenteButton)){
      state.currentScreen = 'ritmo';
    }

    if (buttonPressed(menuButton)){
      state.currentScreen = 'menu';
    }

  };
}
