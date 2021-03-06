function TreinarOuvidoJogo(){

  var exercicios = new TreinarOuvidoExercicios();
  var exerciciosList = [];
  var exercicioAtual = 0;

  var noteChoosen;

  var pontos = {
    right: 0,
    wrong: 0
  };

  var check = false;
  var pause = false;
  var posPause = 0;
  var estadoPause = false;

  //Instanciando os elementos da interface
  var soundButton = new Button(523, 385, btnSound);
  var songButton = new Button(523, 255, btnSong);
  var backButton = new Button(50, 50, btnBack);
  var continuarButton = new Button(width/2-286/2, height-height/7, btnGradient, 'CONTINUAR');

  var opButton1 = new Button(832, 197, btnGradient);
  var opButton2 = new Button(832, 327, btnGradient);
  var opButton3 = new Button(832, 455, btnGradient);

  var continuar = new Button(23, 125, pauseContinuar);
  var reiniciar = new Button(23, 294, pauseReiniciar);
  var sair = new Button(23, 463, pauseSair);

  //Imagens que sao usadas na tela
  var txtSom = loadImage('assets/treinarOuvido/som.png');
  var imgContinuar = loadImage('assets/pause/continuar.png');
  var imgReiniciar = loadImage('assets/pause/reiniciar.png');
  var imgSair = loadImage('assets/pause/sair.png');


  this.draw = function(){

    if (exercicioAtual == 0){
      for(var i = 0; i < 5; i++){
        exerciciosList.push(exercicios.getExercicio());
      }
    }

    if (check == false || pause == false){
      clear();
    }

    //Coloca o nome das notas dentro do botoes de opcoes
    opButton1.texto = exerciciosList[exercicioAtual].op1;
    opButton2.texto= exerciciosList[exercicioAtual].op2;
    opButton3.texto = exerciciosList[exercicioAtual].op3;

    background(bgNoise);

    backButton.draw();

    textSize(32);
    textFont(regularFont);
    text("Que nota é esta?", width/7, 300);
    text("Som de referência:", width/7, 430);
    textSize(22);
    text("Nota", width/7, 460);
    fill(111, 193, 62);
    text("Lá", width/7+60, 460);
    fill(255, 255, 255);

    soundButton.draw();
    songButton.draw();

    textFont(boldFont);
    opButton1.draw();
    opButton2.draw();
    opButton3.draw();
    textFont(regularFont);

    //Verifica quais elementos estao sendo pressionados nesse frame
    checkPress();

    /*Se o usuario estiver escolhido alguma opcao, o feedback sera mostrado de acordo
    com o comparativo entre a nota certa e a nota escolhida*/
    if (check == true){
      showFeedback(exerciciosList[exercicioAtual].right, noteChoosen);
    }

    if(pause)
      showPause();

    if (exercicioAtual == 5){
      usuarios[idUsuario].pontos.treinarOuvido.push(pontos);
      localStorage.vec = JSON.stringify(usuarios);
      state.currentScreen = 'treinarOuvidoResultado';
      exercicioAtual = 0;
      pontos = {
        right: 0,
        wrong: 0
      };
    }

  };

  var checkPress = function(){

    if (buttonPressed(backButton)){
      pause = true;
    }

    if (buttonPressed(sair)){
      state.currentScreen = 'menu';
      resetVariables();
    }

    if (buttonPressed(reiniciar)){
      state.currentScreen = 'treinarOuvido';
      resetVariables();
    }

    if (buttonPressed(continuar)){
      estadoPause = true;
    }

    if (buttonPressed(soundButton)){
      exerciciosList[exercicioAtual].notaReferencia.play();
    }

    if (buttonPressed(songButton)){
      exerciciosList[exercicioAtual].notaObjetivo.play();
    }

    if (buttonPressed(opButton1)){
      check = true;
      noteChoosen = exerciciosList[exercicioAtual].op1;
    }

    if (buttonPressed(opButton2)){
      check = true;
      noteChoosen = exerciciosList[exercicioAtual].op2;
    }

    if (buttonPressed(opButton3)){
      check = true;
      noteChoosen = exerciciosList[exercicioAtual].op3;
    }

    if (buttonPressed(continuarButton)){

      if (exerciciosList[exercicioAtual].right === noteChoosen) {
        pontos.right++;
      } else {
        pontos.wrong++;
      }

      check = false;
      exercicioAtual++;
    }

  };

  var showFeedback = function(right, chose){

    if (right == chose){
      background(0, 0, 0, 230);
      textSize(40);

      fill(111, 193, 62);
      textAlign(CENTER);
      textFont(boldFont);
      textSize(42);
      text("VOCÊ ACERTOU!", width/2-20, 90);

      textSize(32);
      textFont(regularFont);
      textAlign(CENTER);
      fill(255);
      text("Parabéns! A nota correta era ", width/2-40, 154);
      fill(111, 193, 62);
      text(right, width/2+215, 155);

    } else {
      background(0, 0, 0, 230);
      fill(255, 92, 92);
      textSize(42);
      textFont(boldFont);
      textAlign(CENTER);
      text("VOCÊ ERROU!", width/2, 90);

      fill(255);
      textSize(32);
      textFont(regularFont);
      text("A nota correta era ", width/2-20, 154);
      fill(255, 92, 92);
      text(right, width/2+155, 155);
    }

    textFont(boldFont);
    continuarButton.draw();
    textFont(regularFont);

    textAlign(LEFT);

  };

  var showPause = function(){
      background(35, 38, 37, 70);
      fill(68, 72, 71);
      noStroke();
      rect(0, 0, posPause, 720);
      textFont(regularFont);
      fill(255);

      if(posPause<128){
        image(imgContinuar, posPause-105, 125);
        image(imgReiniciar, posPause-105, 294);
        image(imgSair, posPause-105, 463);
        text("CONTINUAR", posPause-120, 235);
        text("REINICIAR", posPause-108, 403);
        text("SAIR", posPause-85, 570);
        if(!estadoPause)
          posPause+=10;
      }
      if(estadoPause)
        posPause-=10;
      if(posPause>=128 && !estadoPause){
        continuar.draw();
        text("CONTINUAR", 8, 235);
        reiniciar.draw();
        text("REINICIAR", 20, 403);
        sair.draw();
        text("SAIR", 43, 570);
      }

      if(estadoPause && posPause<=0){
        estadoPause = false;
        pause = false;
      }

      checkPress();
  };

  var resetVariables = function(){
    exercicios = new TreinarOuvidoExercicios();
    exerciciosList = [];
    exercicioAtual = 0;

    noteChoosen = '';

    pontos = {
      acertos: 0,
      erros: 0
    };

    check = false;
    pause = false;
    posPause = 0;
    estadoPause = false;
  };


}
