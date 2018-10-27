//Variáveis Globais
var game = document.getElementById("game");
var money = 100.00;
var cavalo_aposta = '';		//Cavalo Selecionado
var valor_aposta = '';	//Valor da Aposta

//Função de iniciação
function setup(){

}

function atualizar_balanco(){
	document.getElementById("balance").innerHTML = "R$ "+parseFloat(money);
	document.getElementById("balance_aposta").innerHTML = "R$ "+parseFloat(money);
}

function aposta(){
	//Deixa a tela de inicio invisível
	var home_screen = document.getElementById("home_screen");
	home_screen.style = "display:none;";

	//Coloca a primeira tela do jogo
	var aposta_screen = document.getElementById("aposta_screen");
	aposta_screen.style = "";
	atualizar_balanco();
}

function selecionar_cav(cavalo){
	cavalo_aposta = cavalo;
	valor_aposta = 25;

	comecar_corrida();
}

//Variáveis dos cavalos
var ganhador = 0;
var segundo = 0;
var terceiro = 0;
var quarto = 0;
var intervalo = '';

function comecar_corrida(){
	ganhador = 0;
	segundo = 0;
	terceiro = 0;
	quarto = 0;
	intervalo = '';

	//Deixa a tela de seleção invisivel
	var aposta_screen = document.getElementById("aposta_screen");
	aposta_screen.style = "display:none;";

	//Coloca a primeira tela do jogo
	var race_screen = document.getElementById("race_screen");
	race_screen.style = "";

	document.getElementById("cavalo_aposta").innerHTML = "O seu cavalo é o "+cavalo_aposta;

	//Pega aleatoriamente cada posição
	var c = 0;
	while(ganhador == 0){

		ganhador = "c"+Math.floor(Math.random() * 4 + 1);

	}
	while(segundo == 0){
		c = "c"+Math.floor(Math.random() * 4 + 1);
		if(c != ganhador){
			segundo = c;
		}
	}
	while(terceiro == 0){
		c = "c"+Math.floor(Math.random() * 4 + 1);
		if(c != ganhador && c != segundo){
			terceiro = c;
		}
	}
	while(quarto == 0){
		c = "c"+Math.floor(Math.random() * 4 + 1);
		if(c != ganhador && c != segundo && c != terceiro){
			quarto = c;
		}
	}

	//Coloca os elementos no corpo
	document.querySelector(".pista").innerHTML = '<div class="cavalo cavalo-verde" id="c1">1</div><div class="cavalo cavalo-azul" id="c2">2</div><div class="cavalo cavalo-pink" id="c3">3</div><div class="cavalo cavalo-laranja" id="c4">4</div>';

	//Define o passo de cada cavalo
	document.getElementById(ganhador).setAttribute("passo",5);
	document.getElementById(ganhador).setAttribute("total",0);
	document.getElementById(segundo).setAttribute("passo",3);
	document.getElementById(segundo).setAttribute("total",0);
	document.getElementById(terceiro).setAttribute("passo",2);
	document.getElementById(terceiro).setAttribute("total",0);
	document.getElementById(quarto).setAttribute("passo",1);
	document.getElementById(quarto).setAttribute("total",0);

	//Coloca o intervalo da função
	intervalo = setInterval(atualizar_frames_cavalos,500);

	//Termina a função após 10 segundos
	setTimeout(function(){
		clearInterval(intervalo);
		terminar_corrida();
	},10000);
}

function atualizar_frames_cavalos(){

	for(var o = 1; o <= 4; o++){
		if(o == 1){
			div = document.getElementById(ganhador);
		}else if(o == 2){
			div = document.getElementById(segundo);
		}else if(o == 3){
			div = document.getElementById(terceiro);
		}else if(o == 4){
			div = document.getElementById(quarto);
		}
		
		var passo = div.getAttribute("passo");
		var total = div.getAttribute("total");
		div.style = "margin-left: calc("+(parseInt(total) + parseInt(passo))+"% - 20px)";
		//console.log((parseInt(total) + parseInt(passo)));
		div.setAttribute("total",(parseInt(total) + parseInt(passo)));
	}

}

function terminar_corrida(){
	//Verifica se o jogador perdeu ou ganhou
	if(cavalo_aposta == parseInt(ganhador.split('c')[1])){
		money += 2*valor_aposta;
	}else{
		money -= valor_aposta;
	}
	atualizar_balanco();

	//Deixa a tela de corrida invisivel
	var race_screen = document.getElementById("race_screen");
	race_screen.style = "display:none;";

	//Coloca a tela do vencedor
	var winner = document.getElementById("winner");
	winner.style = "";

	//Exibe quem foi o ganhador
	var cavalo_ganhador = document.querySelector(".cavalo_ganhador");
	cavalo_ganhador.innerHTML = "O ganhador é o cavalo "+document.getElementById(ganhador).innerHTML;

	//Mosta o cavalo vencedor
	var cav_win = document.querySelector(".cavalo_ganhador");
	var class_cav = '';
	var winner = document.getElementById(ganhador).innerHTML;
	if(winner == 1){
		class_cav = "cavalo-verde";
	}else if(winner == 2){
		class_cav = "cavalo-azul";
	}else if(winner == 3){
		class_cav = "cavalo-pink";
	}else if(winner == 4){
		class_cav = "cavalo-laranja";
	}
	cav_win.innerHTML += '<div class="horse" id="h3"><img src="css/horse.png" class="'+class_cav+'"><div class="btn_bot"></div></div>';

}

function voltar_home(){
	//Deixa a tela do vencedor invisivel
	var winner_screen = document.getElementById("winner");
	winner_screen.style = "display:none;";

	//Deixa a tela de home visivel
	var home_screen = document.getElementById("home_screen");
	home_screen.style = "";
}

function start_game(){
	//Deixa a tela de inicio invisível
	var start_screen = document.getElementById("start_screen");
	start_screen.style = "display:none;";

	//Coloca a primeira tela do jogo
	var home_screen = document.getElementById("home_screen");
	home_screen.style = "";
	atualizar_balanco('home');
}

//Função de atualização
function rodar(){

}

//Roda quando o arquivo carrega
window.onload = function(){
	setup();
}