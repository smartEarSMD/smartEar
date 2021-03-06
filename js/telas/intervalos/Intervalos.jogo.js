function IntervalosJogo(){

  var box = [];

  //Posicoes que as notas deverao ser encaixadas
  box[0] = {
    centerX: width/5,
    centerY: height/2.9 + 70
  };

  box[1] = {
    centerX: width/2,
    centerY: height/2.9 + 70
  };

  box[2] = {
    centerX: width - width/5,
    centerY: height/2.9 + 70
  };

  var firstDraw = true;

  //Notas
  var note = [];

  //Label dos intervalos que sera mostrado na tela
  var notesGap = '';

  var exercise = new IntervalosExercicios();
  var exerciseList = [];

  var currentExercise = 0;

  var points = {
    right: 0,
    wrong: 0
  };

  var check = false;

  var pause = false;
  var posPause = 0;
  var estadoPause = false;
  var continuar = new Button(23, 125, pauseContinuar);
  var reiniciar = new Button(23, 294, pauseReiniciar);
  var sair = new Button(23, 463, pauseSair);
  var imgContinuar = loadImage('assets/pause/continuar.png');
  var imgReiniciar = loadImage('assets/pause/reiniciar.png');
  var imgSair = loadImage('assets/pause/sair.png');

  var backButton = new Button(50, 50, btnBack);
  var continueButton = new Button(width/2-286/2, height-height/6, btnGradient, 'CONTINUAR');

  this.draw = function(){

    //Se for o primeiro draw de uma sessao, novos exercicios sera carregados
    if (firstDraw){
      for(var i = 0; i < 5; i++){
         exerciseList.push(exercise.getExercicio());
       }
       setNewExercise();
       console.log('hue');
       firstDraw = false;
    }

    clear();
    background(bgNoise);
    backButton.draw();

    textSize(30);
    text("Intervalo:", 10+width/5-175/2, height/4.5); //175/2 é o raio da primeira elipse
    fill(111, 193, 62);
    text(notesGap, 150+10+width/5-175/2, height/4.5);
    fill(255);
    textAlign(CENTER);
    text("Ordene as notas em ordem crescente", width/2, height-height/3);
    drawBoard(2, 35, 175);

    if(pause)
      showPause();

    //Desenha todas as notas na tela
    note.forEach(function(item){
      item.draw();
    });

    //Ajusta a posicao das notas se elas estiverem dentro de algum box
    note.forEach(function(item){
      item.adjustPosition(box);
    });

    checkPress();

    //Verifica se todas as notas estao dentro de alguma caixa
    var checkInsideBox = note.reduce(function(res, item){
      return item.insideBox && res;
    }, true);

    if (checkInsideBox) {
      //Verifica se todas as notas estao dentro da caixa correta
      var checkInsideCorretBox = note.reduce(function(res, item){
        return item.insideCorrectBox && res;
      }, true);

      //Desenha o feedback de acordo com o valor de checkInsideCorretBox
      drawFeedback(checkInsideCorretBox);
    }

  }; // End of this.draw();

  var drawBoard = function(lineWeight, spacing, ellipseSize) {
    stroke(240);
    drawStrings(lineWeight, spacing);
    drawEllipses(ellipseSize, spacing*2);
    noStroke();
  }

  var drawStrings = function(weight, spacing) {
    strokeWeight(weight);
    for (i = 0; i < 5; i++) {
      line(0, height/2.9+spacing*i, width, height/2.9+spacing*i);
    }
  }

  var drawEllipses = function(size, hSpacing) {
    fill("#2A2A2A");
    ellipse(width/5, height/2.9+hSpacing, size, size);
    ellipse(width/2, height/2.9+hSpacing, size, size);
    ellipse(width-width/5, height/2.9+hSpacing, size, size);

    fill("#7F7F7F");
    noStroke();
    ellipse(width/5, height/2.9+hSpacing, size-size/5, size-size/5);
    ellipse(width/2, height/2.9+hSpacing, size-size/5, size-size/5);
    ellipse(width-width/5, height/2.9+hSpacing, size-size/5, size-size/5);

    stroke(255);
  }

  var drawFeedback = function(correct){

    // filter(BLUR, 3);
    fill(0, 0, 0, 230);
    rect(0,0,1280, 720);

    if (correct) {
      noStroke();
      fill(111, 193, 62);
      textFont(boldFont);
      textAlign(CENTER);
      textSize(42);
      text('VOCÊ ACERTOU!', width/2, 88);

      fill(255);
      textFont(regularFont);
      textSize(32);
      textAlign(CENTER);
      text('Parabéns! As notas foram ordenadas corretamente.', width/2, height/4);
    } else {
      noStroke();
      fill(255, 92, 92);
      textFont(boldFont);
      textAlign(CENTER);
      textSize(42);
      text('VOCÊ ERROU', width/2, 88);

      fill(255);
      textFont(regularFont);
      textAlign(CENTER);
      textSize(32);
      text('Parece que você ordenou as notas de forma errada.', width/2, height/4);
      text('O intervalo correto era', width/2, height/2-35);
      textSize(36);
      textFont(boldFont);
      text(exerciseList[currentExercise].notesGap[0]+'  -  '+exerciseList[currentExercise].notesGap[1]+'  -  '+exerciseList[currentExercise].notesGap[2], width/2, height/2+20);
      textFont(regularFont);
    }

    textFont(boldFont);
    continueButton.draw();
    textFont(regularFont);

    if (buttonPressed(continueButton)){
      check = false;

      //Operador ternario de condicao
      correct ? points.right++ : points.wrong++;

      currentExercise++;

      //Se 5 exercicios estiverem sido feitos, passara para a proxima tela e resetara o estado da tela
      if (currentExercise > 4) {
        usuarios[idUsuario].pontos.intervalos.push(points);
        localStorage.vec = JSON.stringify(usuarios);
        state.currentScreen = 'intervalosResultado';
        firstDraw = true;
        currentExercise = 0;
        note = [];
        points = {
          right: 0,
          wrong: 0
        };
      } else {
        setNewExercise();
      }
    }
  }

  var checkPress = function(){
    if (buttonPressed(backButton)){
      pause = true;
    }

    if (buttonPressed(sair)){
      state.currentScreen = 'menu';
      pause = false;
      estadoPause = false;
      posPause = 0;
      check = false;
      firstDraw = true;
      currentExercise = 0;
      note = [];
      points = {
        right: 0,
        wrong: 0
      };
    }

    if (buttonPressed(reiniciar)){
      state.currentScreen = 'intervalos';
      pause = false;
      estadoPause = false;
      posPause = 0;
      check = false;
      firstDraw = true;
      currentExercise = 0;
      note = [];
      points = {
        right: 0,
        wrong: 0
      };
    }
    if (buttonPressed(continuar)){
      estadoPause = true;
    }
    if (buttonPressed(backButton)) {
      state.currentScreen = 'intervalos';
      check = false;
      firstDraw = true;
      currentExercise = 0;
      note = [];
    }

    //Verifica se alguma nota esta sendo arrastada
    var dragging = note.reduce(function(res, item){
      return item.draggable || res;
    }, false);

    if(mouseIsPressed && !pause && !dragging){

      /*Se nenhuma nota esta sendo arrastada e o jogo nao esta pausado
      uma nota podera ser arrastada pelo mouse*/

      note.forEach(function(item){
        /*Se a ditancia entre o mouse e a nota atual for menor que 50 pixels
        enquanto o usuario estiver clicando no mouse, essa nota sera arrastada pelo mouse*/
        var d = dist(mouseX, mouseY, item.x + item.imagemW/2, item.y + item.imagemH/2);
        if (d < 50) {
          if (!item.draggable){
            item.playNota();
          }
          item.draggable = true;
        }
      });

    } else if (!mouseIsPressed || pause) {
      //Se o mouse nao estiver sendo pressionado, nenhuma nota sera arrastada
      note.forEach(function(item){
        item.draggable = false;
      });
    }
};

//Seta um novo exercicio e coloca as notas em ordem aleatoria na tela
  var setNewExercise = function(){
    var posX = [];

    posX[0] = getRandomIntInclusive(1, 3);
    posX[1] = 0;
    posX[2] = 0;

    switch (posX[0]) {
      case 1:
        posX[0] = width/2-65-250;

        posX[1] = getRandomIntInclusive(2, 3);

        if (posX[1] == 2) {
          posX[1] = width/2-65;
          posX[2] = width/2-65+250;
        } else {
          posX[1] = width/2-65+250;
          posX[2] = width/2-65;
        }
        break;

      case 2:
        posX[0] = width/2-65;

        posX[1] = getRandomIntInclusive(1, 2);
        if (posX[1] <= 1.5) {
          posX[1] = width/2-65-250;
          posX[2] = width/2-65+250;
        } else {
          posX[1] = width/2-65+250;
          posX[2] = width/2-65-250;
        }
        break;

      case 3:
        posX[0] = width/2-65+250;

        posX[1] = getRandomIntInclusive(1, 2);

        if (posX[1] == 1) {
          posX[1] = width/2-65-250;
          posX[2] = width/2-65;
        } else {
          posX[1] = width/2-65;
          posX[2] = width/2-65-250;
        }
        break;
      default: console.log('Erro');
    }

    note[0] = new Note(posX[0], height-height/4, intervaloNoteIcon, box[0], box, exerciseList[currentExercise].nota[0]);
    note[1] = new Note(posX[1], height-height/4, intervaloNoteIcon, box[1], box, exerciseList[currentExercise].nota[1]);
    note[2] = new Note(posX[2], height-height/4, intervaloNoteIcon, box[2], box, exerciseList[currentExercise].nota[2]);
    notesGap = exerciseList[currentExercise].notesGap[0] + ' - ' + exerciseList[currentExercise].notesGap[2];
  };

  var getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

}
