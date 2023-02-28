
// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;
// velocidade
let velocidadeXBolinha = 9;
let velocidadeYBolinha = 7;

// variaveis raquete
let xRaquete = 5;
let yRaquete = 155;
let larguraRaquete = 10;
let alturaRaquete = 90;
// velocidade
let velocidadeYRaquete = 10;
let tocaRaquete = false;

// variavei raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 155;

// Pontos
let pontosP1 = 0;
let pontosP2 = 0;


// Carregar audios
function preload() {
  soundFormats("mp3");
  somRaquete = loadSound("Audios/raquetada");
  somPonto = loadSound("Audios/ponto");
  somTrilha = loadSound("Audios/trilha");
}

function setup() {
  createCanvas(600, 400);
//  somTrilha.loop();
}

function draw() {
  background(0);  
  mostrarBolinha();
  movimentoBolinha();
  colisaoBolinhaParede();
  mostrarRaquete(xRaquete, yRaquete);
  controleRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  controleRaqueteOponente();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  marcaPonto();
  telaVitoria();
  placar();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinhaParede() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    somPonto.play()
  }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x, y) {
  rect(x, y, larguraRaquete, alturaRaquete);
}

function controleRaquete() {
  if (keyIsDown(87) && yRaquete > 0) {
    yRaquete -= velocidadeYRaquete;
  }
    if (keyIsDown(83) && yRaquete + alturaRaquete < height) {
    yRaquete += velocidadeYRaquete;
  }
}

function colisaoRaquete(x, y) {
  tocaRaquete = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  if (tocaRaquete) {
    velocidadeXBolinha *= -1;
    //Evitar que a bola fique presa na raquete esquerda
    if (xBolinha < 200) {
        xBolinha = xRaquete + larguraRaquete + raio;
        }
    //Evitar que a bola fique presa na raquete direita    
    else if (xBolinha > 200) {
        xBolinha = xRaqueteOponente - larguraRaquete - raio;
        }
    somRaquete.play();
  }
}

function controleRaqueteOponente() {
  if (keyIsDown(UP_ARROW) && yRaqueteOponente > 0) {
    yRaqueteOponente -= velocidadeYRaquete;
  }
  if (keyIsDown(DOWN_ARROW) && yRaqueteOponente + alturaRaquete < height) {
    yRaqueteOponente += velocidadeYRaquete;
  }

}


function placar() {
  stroke(255);
  fill("grey");
  rect(133, 25, 50, 50, 5);
  rect(407, 25, 50, 50, 5);
  noStroke();
  textSize(30);
  fill("white");
  text(pontosP1, 157, 54);
  text(pontosP2, 433, 54);
  textAlign(CENTER, CENTER);
}

function marcaPonto() {
  if (xBolinha + raio > width) {
    pontosP1 += 1;
  }
  else if (xBolinha - raio < 0) {
    pontosP2 += 1;
  }
}

function telaVitoria() {
  if (pontosP1 >= 5){
    textSize(30);
    fill("white");
    textAlign(CENTER, CENTER);
    text("PLAYER 1 WINS!!!", 300, 200);
    textSize(20);
    text("Click on screen to restart", 300, 250); 
    noLoop();
  }
  else if (pontosP2 >= 5) {
    textSize(30);
    fill("white");
    textAlign(CENTER, CENTER);
    text("PLAYER 2 WINS!!!", 300, 200);
    textSize(20);
    text("Click on screen to restart", 300, 250); 
    noLoop();
  }
}

function mousePressed() {
  if (pontosP1 >= 5 || pontosP2 >= 5) {
  pontosP1 = 0;
  pontosP2 = 0;
  loop();
  }
}

