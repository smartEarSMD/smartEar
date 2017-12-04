function Cadastrar(){

  var firstTime = true;

  var backButton = new Button(38, 38, btnBack);
  var continuarButton = new Button(856, 325, btnGradient, 'CONTINUAR');

  var cadastrarNome = new Input(137, 205, 'Nome');
  var cadastrarEmail = new Input(137, 325, 'Email');
  var cadastrarSenha = new Input(137, 445, 'Senha');

  var inputNome, inputSenha, inputEmail;

  this.draw = function(){
    clear();
    background(bg);
    backButton.draw();

    if (firstTime){ //Gambiarra pra evitar que varios elementos HTML sejam desenhados
    	inputs();
    	inputNome.show();
    	inputSenha.show();
    	inputEmail.show();
      /*cadastrarNome.draw();
      cadastrarSenha.draw();
      cadastrarEmail.draw();*/
      firstTime = false;
    }
    continuarButton.draw();

    checkPress();

  };

  var checkPress = function(){

    if (buttonPressed(backButton)){
      firstTime = true;
      state.currentScreen = 'telaInicial';
      removeElements(); //Remover todos os elementos HTML da pagina
    } else if (buttonPressed(continuarButton)){
      /*firstTime = true;
      state.currentScreen = 'menu';
      removeElements();*/
      var exist = false;
      	if(inputNome.value() != "" && inputSenha.value() != "" && inputEmail.value() != ""){
      		for(let i = 0; i < usuarios.length; i++)
      			if(usuarios[i].email == inputEmail.value())
      				exist = true;
      		if(!exist){
		      	var pessoa = {nome:inputNome.value(), senha: inputSenha.value(), email: inputEmail.value()};
    				usuarios.push(pessoa);
    				localStorage.vec = JSON.stringify(usuarios);
    				firstTime = true;
            idUsuario = usuarios.length-1;
  			    state.currentScreen = 'menu';
  			    removeElements();
			}else
				alert("Email já existente!");
		}
		else
			alert("Preencha todos os campos!");
    }

  };

  var inputs = function(){
  	inputNome = createInput();
  	inputNome.position(cadastrarNome.x, cadastrarNome.y);
  	inputNome.attribute("type", "text");
  	inputNome.attribute("placeholder", cadastrarNome.texto);
  	inputNome.hide();

  	inputSenha = createInput();
  	inputSenha.position(cadastrarSenha.x, cadastrarSenha.y);
  	inputSenha.attribute("type", "text");
  	inputSenha.attribute("placeholder", cadastrarSenha.texto);
  	inputSenha.hide();

  	inputEmail = createInput();
  	inputEmail.position(cadastrarEmail.x, cadastrarEmail.y);
  	inputEmail.attribute("type", "text");
  	inputEmail.attribute("placeholder", cadastrarEmail.texto);
  	inputEmail.hide();
  }
};
