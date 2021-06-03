
var START = 1;
var LEVEL1 = 2;
var LEVEL2 = 3;
var END  = 0;
var gameState = START;

var gun,Gunimg;
var bullet,bulletImg;
var bg,bgImg;
var alien,alienImg;
var human,humanImg;
var score =  0;
var lifetime = 100;
var gameOver,gameOverImg;
var tryAgain,tryAgainImg;
var gunSound,youwinSound;

function preload(){

  bgImg = loadImage("back Ground.jpg");
  bulletImg = loadImage("bullet.png");
   Gunimg = loadImage("Gun.png");
   alienImg = loadImage("alien.png");
   gameOverImg = loadImage("gameover.jpg");
   tryAgainImg = loadImage("tryagain.png");
   gunSound = loadSound ("GunShot.mp3");

}





function setup() {
  createCanvas(1000,500);

  bg = createSprite(500,200);
  bg.addImage("backGround",bgImg);
  bg.scale = 1;
 bg.velocityX = -2;
 bg.x = bg.width/2;



  gun = createSprite(130,250,40,40);
  gun.addImage("Gun",Gunimg);
  gun.scale = 0.4;

  gameOver = createSprite(500,250,20,20);
 tryAgain = createSprite(300,350,20,20);

 gameOver.addImage("gameover",gameOverImg);
  tryAgain.addImage("tryagain",tryAgainImg);
  
  gameOver.scale = 0.6;
  tryAgain.scale = 0.6;

  BulletsGroup = new Group();
  aliensGroup = new Group();
  humansGroup = new Group();

  score = 0;

}

function draw() {
  background("#D75D5B");  

  if(gameState ===   START){
   
    textSize(60);
   stroke("#7549A8")
   fill("#3B0151");
  // textStyle(BOLD);
   textFont('Algerian');
   text("ALIEN INVASION",300,50);
   
    textSize(55);
   stroke("#5E950C");
    fill("#07482C");
   textStyle(BOLD);
   textFont('Microsoft Himalaya');
   text("Instructions:-",100,120);
   
   textSize(38);
   stroke("#839BCA")
   fill("#02128A");
   textFont('Vijaya');
   text("1.Press 'Space' to shoot the alien. ",240,160);
   
   textSize(38);
   stroke("#839BCA")
   fill("#02128A");
   textFont('Vijaya');
   text("2.Do not shoot the Humans. ",240,200);
   
   textSize(38);
   stroke("#839BCA")
   fill("#02128A");
   textFont('Vijaya');
   text("3.If your score is 1000.You can move to level2. ",240,240);
   
   textSize(38);
   stroke("#839BCA")
   fill("#02128A");
   textFont('Vijaya');
   text("4.If your lifetime is 0 then the game is over.  ",240,280);
   
   
   textSize(38);
   stroke("#839BCA")
   fill("#02128A");
   textFont('Vijaya');
   text("5.Press 'Enter' to start the game. ",240,320);
   
        if(keyDown("ENTER")){
          gameState = LEVEL1;
        }
    }

if(gameState ===  LEVEL1){

  gameOver.visible = false;
 tryAgain.visible = false; 
  
  if(bg.x < 0){
    bg.x = bg.width/2;
       }
   
     gun.y = World.mouseY;

     if(keyDown("space")){
       createBullet();
       gunSound.play();
    
     }

  if(BulletsGroup.isTouching(aliensGroup)){
    aliensGroup.destroyEach();
    BulletsGroup.destroyEach() ;
    score = score + 50
  }

  if(BulletsGroup.isTouching(humansGroup)){
    humansGroup.destroyEach();
    BulletsGroup.destroyEach() ;
  lifetime = lifetime - 5;
  }

 
     aliens();
     Humans();
   drawSprites ();

     if(score === 1000) {
       background(0);
     textSize(60);
      textFont("Monotype Corsiva");
      fill("#DB193E");
      text("You Win",400,250);
     textSize(40);
     textStyle(BOLD);
      textFont("Monotype Corsiva");
     fill("#DB193E");
     textStyle(BOLD);
      text("Press 'Enter' to start Level2",300,300);
   if(keyDown("Enter")){
     score = 0;
    gameState = LEVEL2;
    }
   }

     textSize(40);
     textFont("Microsoft Himalaya");
     fill("#F3E51E");
   text("Score:"+score,800,30)

   textSize(40);
   textFont("Microsoft Himalaya");
   fill("#ED8B38");
   text("LifeTime:"+lifetime,800,60)

   if(lifetime === 90){
    gameState = END;
     }
}

 if(gameState === LEVEL2){
 
  
  if(bg.x < 0){
    bg.x = bg.width/2;
  }

  gun.y = World.mouseY;

  
     if(keyDown("space")){
       createBullet();
     }

  if(BulletsGroup.isTouching(aliensGroup)){
    aliensGroup.destroyEach();
    BulletsGroup.destroyEach() ;
    score = score + 50
  }

  if(BulletsGroup.isTouching(humansGroup)){
    humansGroup.destroyEach();
    BulletsGroup.destroyEach() ;
  lifetime = lifetime - 5;
  }

  aliens();
  Humans();
  drawSprites();

  textSize(40);
  textFont("Microsoft Himalaya");
  fill("#4A2C00");
text("Score:"+score,800,30)

textSize(40);
textFont("Microsoft Himalaya");
fill("#02204D");
text("LifeTime:"+lifetime,800,60);


if(lifetime === 0){
  gameState = END;
   }
}

if(gameState === END){
  background(0);
  console.log("Game Over");
  
  
  gameOver.visible = true;
  tryAgain.visible = true; 
  }


}



function createBullet(){
  bullet = createSprite(280,150,3,13); 
  bullet.scale = 0.06;
   bullet.addImage("bullet",bulletImg);
  bullet.velocityX = 10;
  bullet.y = gun.y;
  bullet.lifetime = 65;
  BulletsGroup.add(bullet);
      }


function aliens(){
  if(frameCount % 50 === 0){
    alien = createSprite(1000,random(50,400),40,40);
    alien.addImage("alien",alienImg);
    alien.scale = 0.3;
    alien.y = Math.round(random(20,400));
    alien.lifetime = 60;  
      alien.velocityX = -10;
      aliensGroup.add(alien);
       }
}


function Humans(){
  if(frameCount % 80 === 0){
    human = createSprite(1000,random(50,400),60,60);
    //human.addImage("",);
   // human.scale = 0.3;
    human.y = Math.round(random(20,400));
    human.lifetime = 65;  
    human.velocityX = -10;
    humansGroup.add(human);
       }
}



