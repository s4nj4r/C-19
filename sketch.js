 var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var spookySound;
    
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=2;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale =0.5
}


function draw(){
  background(0);
  
  if(gameState==="play"){
    
  if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY= -5; 
  }
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoors();
  
  
  drawSprites();
  }
  if(gameState==="end"){
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}
 
function spawnDoors(){
  if(frameCount % 240===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock     .height=2;
    
    door.x = Math.round(random(120,400));
    door.velocityY=2;
    
    climber.x = door.x;
    climber.velocityY=2;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY=2;
    
    ghost.depth = door.depth+1;
    
    door.lifetime = 400;
    climber.lifetime = 400;
    invisibleBlock.lifetime = 400;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
