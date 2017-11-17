//Componente de botao que podera ser reusado em diversas telas

function Button(x, y, img, texto = ''){
  //Atributos que serao usados para desenhar o botao
  this.x = x;
  this.y = y;
  this.width = img.width;
  this.height = img.height;
  this.image = loadImage(img.url);
  this.texto = texto;
  this.tamanho = 171;
  this.tamanho2 = 171;
  this.opcd = 150;
  this.gradIntervalo = loadImage('assets/menu/gradIntervalo.png');
  this.gradOuvido = loadImage('assets/menu/gradOuvido.png');
  this.gradRitmo = loadImage('assets/menu/gradRitmo.png');
  this.gradTimbre = loadImage('assets/menu/gradTimbre.png');
  //var font = loadFont('assets/fonts/watchwordDot-Bold.otf');

  this.draw = function(){
    if(this.width == 171 && this.height == 171){
      if ((mouseX >= this.x) && (mouseX <= this.x + this.width) && (mouseY >= this.y) && (mouseY <= this.y + this.height)){
        switch(this.x){
          case 166:
            fill(82,255,255, this.opcd);
            image(this.gradIntervalo, this.x+9, this.y+9);
          break;
          case 425:
            fill(255,82,200, this.opcd);
            image(this.gradOuvido, this.x+9, this.y+9);
          break;
          case 684:
            fill(255,206,82, this.opcd);
            image(this.gradRitmo, this.x+9, this.y+9);
          break;
          case 943:
            fill(177,255,82, this.opcd);
            image(this.gradTimbre, this.x+9, this.y+9);
          break;
        }
        ellipse(this.x+85.5, this.y+85.5, this.tamanho, this.tamanho);
        ellipse(this.x+85.5, this.y+85.5, this.tamanho2, this.tamanho2);
        if(this.tamanho<220){
          this.tamanho++;
        }
        if(this.tamanho == 220 && this.tamanho2<190){
          this.tamanho2+=0.8;
        }
        if(this.tamanho2 > 190){
          this.opcd-=4;
          if(this.opcd<0){
            this.opcd = 150;
            this.tamanho = 171;
            this.tamanho2 = 171;
          }
        }
    }else{
      this.tamanho = 171;
      this.tamanho2 = 171;
      this.opcd = 150;

    }
  }
  if(this.width == 59 && this.height == 58){
      if ((mouseX >= this.x) && (mouseX <= this.x + this.width) && (mouseY >= this.y) && (mouseY <= this.y + this.height)){
        stroke(167, 0, 255, this.opcd);
        fill(255,255,255,0);
        ellipse(this.x+29.5, this.y+29, this.tamanho, this.tamanho);
        ellipse(this.x+29.5, this.y+29, this.tamanho2, this.tamanho2);
        if(this.tamanho<96){
          this.tamanho++;
        }
        if(this.tamanho >= 96 && this.tamanho2<80){
          this.tamanho2+=0.8;
        }
        if(this.tamanho2 >= 80){
          this.opcd-=4;
          if(this.opcd<0){
            this.opcd = 300;
            this.tamanho = 58;
            this.tamanho2 = 58;
          }
        }
    }else{
      this.tamanho = 58;
      this.tamanho2 = 58;
      this.opcd = 300;

      switch(this.x){
              case 93:
                stroke(82,255,255, this.opcd);
              break;
              case 394:
                stroke(255,82,200, this.opcd);
              break;
              case 689:
                stroke(255,206,82, this.opcd);
              break;
              case 984:
                stroke(177,255,82, this.opcd);
              break;
      }
      fill(255,255,255,0);
      ellipse(this.x+98.5, this.y+98.5, 266, 266);
      ellipse(this.x+98.5, this.y+98.5, 230, 230);

    }
  }
  image(this.image, this.x, this.y, this.width, this.height);
  noStroke();
  fill(255);
  //textFont(font);
  textSize(20);
  textAlign(CENTER);
  text(this.texto, this.x + this.width/2, this.y + this.height/2 + 5);
  if ((mouseX >= this.x) && (mouseX <= this.x + this.width)){
    if ((mouseY >= this.y) && (mouseY <= this.y + this.height)){
      noStroke();

      if(this.width != 171 && this.height != 171){
        fill(255,255,255,30);
      	rect(this.x, this.y, this.width, this.height, 120);
      }
      fill(255);
	  }
  }
    textAlign(LEFT);
  }

}
