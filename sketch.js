var PLAY = 1;
var END = 0;
var estadoJogo = PLAY;

var trex, trex_correndo, trex_colidiu;
var solo, soloInvisivel, imagemSolo, nuvem;

var grupoNuvens, imagemNuvem;
var grupoCactos, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;

var pontos;


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
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground", imagemSolo);
  solo.x = solo.width /2;
  
  
  soloInvisivel = createSprite(200,190,400,10);
  soloInvisivel.visible = false;
  
  //crie Grupos de Obstáculos e Nuvens
  grupoCactos = createGroup();
  grupoNuvens = createGroup();
  
  console.log("Hello" + 5);
  
  pontos = 0;
}

function draw() {
  background(180);
  //exibindo pontuacãO
  text("Score: "+ pontos, 500,50);
  
  
  
  if(estadoJogo === PLAY){
    //mover o solo
    solo.velocityX = -4;
    //pontuação
    pontos = pontos + Math.round(frameCount/60);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //pular quando a tecla de espaço for pressionada
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //adicione gravidade
    trex.velocityY = trex.velocityY + 0.8
  
    //gere as nuvens
    criarNuvens();
  
    //gere obstáculos no solo
    criarCactos();
    
    if(grupoCactos.isTouching(trex)){
        estadoJogo = END;
    }
  }
   else if (estadoJogo === END) {
      solo.velocityX = 0;
     
     grupoCactos.setVelocityXEach(0);
     grupoNuvens.setVelocityXEach(0);
   }
  
 
  //impedir que o trex caia
  trex.collide(soloInvisivel);
  
  
  
  drawSprites();
}

function criarCactos(){
 if (frameCount % 60 === 0){
   var cacto = createSprite(620,165,10,40);
   cacto.velocityX = -6;
   
    //gerar obstáculos aleatórios
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
   
    //atribuir escala e vida útil ao obstáculo       
    cacto.scale = 0.5;
    cacto.lifetime = 300;
   
   //adicione cada obstáculo ao grupo
    grupoCactos.add(cacto);
 }
}

function criarNuvens() {
  //escreva o código aqui para gerar as nuvens
   if (frameCount % 60 === 0) {
        nuvem = createSprite(610,100,40,10);
        nuvem.y = Math.round(random(10,60));
        nuvem.addImage(imagemNuvem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;
        
        //atribuir vida útil à variável
        nuvem.lifetime = 210;
        
        //ajustar a profundidade
        nuvem.depth = trex.depth;
        trex.depth = trex.depth + 1;
        
        //adicionando nuvem ao grupo
      grupoNuvens.add(nuvem);
    }
}

