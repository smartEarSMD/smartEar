/* Arquivo principal que será responsável por toda
renderização do app */
var telas = [];

var state;
var sound;

var exercicios;

var iconSong, iconSound;
var bg;

function preload() {

	iconSong = loadImage('assets/icons/iconSong.png');
	iconSound = loadImage('assets/icons/iconSound.png');

	bg = loadImage('assets/background.png');

	state = new StateControl('telaInicial');
	sound = new Sounds();

	//exercicios = new Exercicios();

}

function setup(){

  createCanvas(1280, 720);

	//Criar um array com as telas que serao usadas no app
	telas['treinarOuvido'] = new TreinarOuvido();
	telas['treinarOuvidoJogo'] = new TreinarOuvidoJogo();
	telas['treinarOuvidoResultado'] = new TreinarOuvidoResultado();
	telas['telaInicial'] = new TelaInicial();
	telas['login'] = new Login();
	telas['cadastrar'] = new Cadastrar();
	telas['menu'] = new Menu();

}

function draw(){

	telas[state.currentScreen].draw();

}

function mouseReleased(){
  /* Gambiarra feita para fazer com que apenas um clique seja registrado
  pelos botões. Essa variável é usada junto com mouseIsPressed para registrar
  os cliques. Quando o mouse e pressionado, esse variável estará como o true e junto com
  mouseIsPressed irá registar os cliques. Nos próximos frames, caso o mouse ainda esteja apertado,
  os cliques não serão registrados pois esta variável estará como false. Ela apenas voltará para
  true quando o usuário soltar o botão do mouse */
  state.canPress = true;
}

/* Essa função recebe um componente(objeto) como paramentro e verifica
se o mouse clicou nesse componente */
var buttonPressed = function(botao){

  if(mouseIsPressed && state.canPress){
    //console.log(botao.width);
    if ((mouseX >= botao.x) && (mouseX <= (botao.x + botao.width))){
      if ((mouseY >= botao.y) && (mouseY <= (botao.y + botao.height))){
        state.canPress = false;
        return true;
      }
    }
  }

};
