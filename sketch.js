//Trilha Sonora
let ponto; 
let raquetada;
let trilha;

//Placar do Jogo
let meusPontos = 0;
let pontosDoBot = 0;

//variáveis raquete bot
let xRaqueteBot = 780;
let yRaqueteBot = 150;
let velocidadeYBot;
let chanceDeError = 0;


//variáveis raquete player 1
let xRaquete = 5;
let yRaquete = 150;

//sistema biblioteca
let colidiu = false;



//variáveis da Bolinha
let xBolinha = 380;
let yBolinha = 180;
let dBolinha = 15 ;
let raio = dBolinha / 2;

//velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//desenvolvimento do Jogo
function setup() {
  createCanvas(800, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  velocidadeBolinha();
  raquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  colisaoRaquetesBiblioteca(xRaquete,yRaquete);
  colisaoRaquetesBiblioteca(xRaqueteBot,yRaqueteBot);
  raquete(xRaqueteBot, yRaqueteBot);
  movimentaBot();
  mostrarPlacar();
  pontosPlacar();
  bolinhaNãoFicarPresa();
}

function mostrarBolinha(){
  circle(xBolinha,yBolinha,dBolinha)
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function velocidadeBolinha(){
  if (xBolinha + raio> width||
      xBolinha - raio <0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height||
      yBolinha - raio <0){
    velocidadeYBolinha *= -1;
  }
}

function raquete(x,y){
  rect(x, y,raqueteComprimento,raqueteAltura)
  
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaquetesBiblioteca(x,y){
  colidiu = 
  collideRectCircle(x,y,raqueteComprimento,raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaBot(){
  velocidadeYBot = yBolinha - yRaqueteBot - 
    raqueteComprimento /2 - 65;
  yRaqueteBot += velocidadeYBot + chanceDeError
  calcularChanceDeError()
}
function calcularChanceDeError(){
  if(pontosDoBot >= meusPontos){
    chanceDeError += 1
    if(chanceDeError >= 39){
      chanceDeError = 40
    }
  } else {
    chanceDeError -= 1
    if (chanceDeError <= 35){
      chanceDeError = 35
    }
  }
}

function mostrarPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,69,0));
  rect(150,9,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,69,0));
  rect(550,9,40,20);
  fill(255);
  text(pontosDoBot, 570,26);
}

function pontosPlacar(){
  if(xBolinha > 790){
    meusPontos += 1;
    ponto.play();
 }
  if(xBolinha < 8){
    pontosDoBot += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//Resolução de Bug Bolinha presa

function bolinhaNãoFicarPresa(){
  if(xBolinha - raio < 0){
    xBolinha = 23
  }
}















