var PLAY = 1;
var END = 0;
var estadoJogo = PLAY;

var trex, trex_correndo, trex_colidiu;
var solo, soloInvisivel, imagemSolo;

var grupoNuvens, imagemNuvem;
var grupoCactos, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;

var pontos;

var gameOver, restart;
var imgGameOver, imgRestart;
var somSalto, somPontos, somColisao;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemSolo = loadImage("ground2.png");
  
  imagemNuvem = loadImage("cloud.png");
  
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  
  imgRestart = loadImage("restart.png");
  imgGameOver = loadImage("gameOver.png");
  
  // 01. carregar sons do jogo
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" ,trex_colidiu);
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemSolo);
  solo.x = solo.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(imgGameOver);
  
  restart = createSprite(300,140);
  restart.addImage(imgRestart);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  soloInvisivel = createSprite(200,190,400,10);
  soloInvisivel.visible = false;
  
  grupoCactos = createGroup();
  grupoNuvens = createGroup();
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true;
  
  pontos = 0;
  
}

function draw() {
  
  background(180);
  text("Pontuação: "+ pontos, 500,50);
  
  console.log("O estado de jogo é ", estadoJogo)
  
  
  if(estadoJogo === PLAY){
    gameOver.visible = false
    restart.visible = false
   
    solo.velocityX = -6;
    
    pontos = pontos + Math.round(frameCount/60);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    if(keyDown("space")&& trex.y >= 145) {
        trex.velocityY = -12;
    }
   
    trex.velocityY = trex.velocityY + 0.8
 
    gerarNuvens();
    gerarCactos();
    
    if(grupoCactos.isTouching(trex)){
        estadoJogo = END;
    }
  }
   else if (estadoJogo === END) {
      // 02. mudar visibilidade do restart e gameover
     
      solo.velocityX = 0;
      trex.velocityY = 0
     
      trex.changeAnimation("collided", trex_colidiu);

      grupoCactos.setLifetimeEach(-1);
      grupoNuvens.setLifetimeEach(-1);
      
     
     // 03. mudar velocidade dos cactos e nuvens
      grupoCactos.setVelocityXEach(    );
      grupoNuvens.setVelocityXEach(    );
   }

  trex.collide(soloInvisivel);
  drawSprites();
}

function gerarCactos(){
 if (frameCount % 60 === 0){
   var cacto = createSprite(610,165,10,40);
   cacto.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cacto.addImage(cacto1);
              break;
      case 2: cacto.addImage(cacto2);
              break;
      case 3: cacto.addImage(cacto3);
              break;
      case 4: cacto.addImage(cacto4);
              break;
      case 5: cacto.addImage(cacto5);
              break;
      case 6: cacto.addImage(cacto6);
              break;
      default: break;
    }
             
    cacto.scale = 0.5;
    cacto.lifetime = 300;

    grupoCactos.add(cacto);
 }
}

function gerarNuvens() {

  if (frameCount % 60 === 0) {
    var nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(70,150));
    nuvem.addImage(imagemNuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
    nuvem.lifetime = 210;
    
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    grupoNuvens.add(nuvem);
    }
}
