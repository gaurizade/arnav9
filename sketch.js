
var soldiersaluting, soldiersalutingimg;
var batman, batmanimg;
var background1, background1img;
var dialouge1, dialouge1img;
var invisibleGround;
var dialouge2, dialouge2img;
var dialouge3, dialouge3img;
var pressStart, pressStartimg;
var newSoldier, newSoldierimg;
var Junglebackground, Junglebackgroundimg;
var enemies, enemiesimg;
var Enemiesbulletimg
var Soldierbullet, Soldierbulletimg;
var enemydestroy, enemydestroyimg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var secretBunker, secretBunkerimg;
var missile, missileimg
var knife, knifeimg;
var pressz, presszimg;
var destroyedscene, destroyedsceneimg
var newBatman, newBatmanimg;
var ending1, ending1img;
var ending2, ending2img;
var gameOver;
var life = 3;
var gunshotSound;
var secretBunker;
var gameWon,gameWonimg;

function preload() {
  soldiersaluting = loadImage("Soldiersaluting.png")
  batman = loadImage("Batman.png");
  background1 = loadImage("Background.png");
  dialouge1 = loadImage("Dialouges/batdialouge.png");
  dialouge2 = loadImage("Dialouges/batdialouge1.png");
  dialouge3 = loadImage("Dialouges/Soldierdialouge.png");
  pressStart = loadImage("Pressspace.png");
  Junglebackground = loadImage("newJungle.jpg");
  newSoldier = loadImage("Soldier.png");
  enemies = loadImage("enemies.png");
  Soldierbullet = loadImage("soldierBullet.png");
  enemydestroy = loadImage("enemydestroy1.png");
  Enemiesbulletimg = loadImage("enemiesbullet.png");
  secretBunkerimg = loadImage("secretbunker.jpg");
  missileimg = loadImage("missile1.png");
  knife = loadImage("knife.jpg");
  pressz = loadImage("z.png");
  destroyedsceneimg = loadImage("ending4.jpg")
  newBatmanimg = loadImage("newBatman.png");
  ending1img = loadImage("edited1.png");
  ending2img = loadImage("ending2.png");
  gameOver1img = loadImage("gameOver1.png");
  gunshotSound = loadSound("gunshot.mp3");
  zSoldierimg = loadImage("Soldier.png");
  gameWonimg=loadImage("youWin.png");
  civilSound=loadSound("Civil.mp3")
}



function setup() {
  createCanvas(2000, 2000);
  // engine=Engine.create();
  // world=engine.world;

  secretBunker = createSprite(500, 400);
  secretBunker.addImage(secretBunkerimg)
  secretBunker.visible=false;
  invisibleGround = createSprite(500, 620, 1000, 10);
  invisibleGround.visible = true;


  background1img = createSprite(500, 400);
  background1img.addImage(background1);
  background1img.scale = 2;


  soldiersalutingimg = createSprite(300, 300);
  soldiersalutingimg.addImage(soldiersaluting);
  soldiersalutingimg.scale = 0.3;

  batmanimg = createSprite(550, 300);
  batmanimg.addImage(batman);
  batmanimg.scale = 0.2;


  dialouge1img = createSprite(600, 150);
  dialouge1img.addImage(dialouge1);
  dialouge1img.scale = 0.25;
  //dialouge1img.lifetime=200;
  dialouge1img.visible = false



  dialouge2img = createSprite(600, 150);
  dialouge2img.addImage(dialouge2);
  dialouge2img.scale = 0.25;
  //dialouge2img.lifetime=90;
  dialouge2img.visible = false



  dialouge3img = createSprite(340, 130);
  dialouge3img.addImage(dialouge3);
  dialouge3img.scale = 0.25;
  dialouge3img.visible = false


  /*pressStartimg=createSprite(400,700);
  pressStartimg.addImage(pressStart);
  pressStartimg.scale=1;*/


  Junglebackgroundimg = createSprite(500, 700)
  Junglebackgroundimg.addImage(Junglebackground);
  Junglebackgroundimg.visible = false;

  //invisibleGround.depth=Junglebackgroundimg.depth+1;

  newSoldierimg = createSprite(100, 600);
  newSoldierimg.addImage(newSoldier);
  newSoldierimg.scale = 0.3;

  newSoldierimg.visible = false

  gameOver = createSprite(500, 500, 90, 90);

  if (keyDown("Z")) {
    missile = createSprite(500, 500, 40, 40);
    missile.addImage(missileimg);
    missile.scale = 0.2

  }

  enemiesGroup = createGroup();
  BulletGroup = createGroup();
  EnemiesbulletGroup = createGroup();
  EbulletGroup = createGroup();
  knifeGroup = createGroup();

  missile = createSprite(400,500);
        missile.addImage(missileimg);
        missile.scale = 0.1;
        missile.visible=false
}

function draw() {
  
  background("white");
  // Engine.update(engine); 

  //createEBullet();




  if (gameState === PLAY) {

    gameOver.visible = false;
    //restart.visible = false;
    

    if (frameCount >= 190) {
      dialouge1img.visible = true
      //civilSound.play();
    }

    if (frameCount >= 290) {
      dialouge2img.visible = true
    }

    if (frameCount >= 390) {
      dialouge1img.destroy();
      dialouge2img.destroy();
      dialouge3img.visible = true;


    }

    if (frameCount >= 490) {
      dialouge3img.destroy();
      batmanimg.destroy();
      background1img.destroy();
      soldiersalutingimg.destroy();
      //civilSound.destroy();
    

      Junglebackgroundimg.visible = true;
      Junglebackgroundimg.velocityX = -7;


      if (Junglebackgroundimg.x < 0) {
        Junglebackgroundimg.x = Junglebackgroundimg.width / 4;
      }

   
      newSoldierimg.visible = true;

      spawnenemiesimg();


      if (keyDown("S")) {
        createBullet();
        gunshotSound.play();
      }

      if (EbulletGroup.isTouching(newSoldierimg)) {
        EbulletGroup.destroyEach();
        life = life - 1;
      }

      if (enemiesimg && BulletGroup.isTouching(enemiesimg)) {
        enemiesGroup.destroyEach();
        BulletGroup.destroyEach();
        score = score + 3;
        // enemiesimg.addImage("enemydestroyimg", enemydestroyimg);
      }



      if (keyDown("J") && newSoldierimg.y >= 50) {
        newSoldierimg.velocityY = -10;
      }
      newSoldierimg.velocityY = newSoldierimg.velocityY + 0.8
       

      if (score === 3) {
        console.log('score30')
        enemiesGroup.destroyEach();
        BulletGroup.destroyEach();
        EbulletGroup.destroyEach();
        Junglebackgroundimg.destroy();
        // this will cause performance issue as sprite will be created in every frame..
        secretBunker.visible=true;
        invisibleGround.visible=false;
       
         missile.visible=true
        secretBunker.scale = 3;
        //newSoldierimg.depth=secretBunker.depth+1;
       // newSoldierimg.depth=secretBunker.depth
     //   newSoldierimg.depth=secretBunker.depth+1;

        //if(keyDown("Z")){
      //  zSoldier = createSprite(100, 600);
       // zSoldier.addImage(zSoldierimg);
       // zSoldier.scale = 0.3;

        
        
       // missile.depth = secretBunkerimg.depth;
      //  missile.depth = secretBunkerimg + 1;
        
      

        if (keyDown("R")) {
          console.log("R pressed")
         
          newSoldierimg.velocityX += 2  ;
        }
          if(missile.isTouching(newSoldierimg)){
      
            
          
            gameWon=createSprite(700,450,400,400);
            gameWon.addImage(gameWonimg);
            gameWon.scale=3;

          destroyedscene=createSprite(800,450,400,400);
          destroyedscene.addImage(destroyedsceneimg);
          destroyedscene.scale=5;
          
        //  destroyedscene.depth=missile.depth+1;
          destroyedscene.lifetime=9;

         
         destroyedscene.depth=gameWon.depth+1;
          gameWon.depth=missile.depth;
         gameWon.depth=missile.depth+1;
        
       
       //  enemiesGroup.destroyEach();
        // BulletGroup.destroyEach();
        

          newBatman=createSprite(650,500);
          newBatman.addImage(newBatmanimg);
          newBatman.scale=0.3;
          newBatman.lifetime=5;
          
          ending1=createSprite(800,340,200,100);
          ending1.addImage(ending1img);
          ending1.scale=0.2;
          ending1.lifetime=5;
          invisibleGround.visible=false;
          missile.destroy();
          secretBunker.destroy();
          newSoldierimg.visible=false;
          }
        

        /*if(missile.isTouching(secretBunker)){
        destroyedscene=createSprite(500,400,400,400);
        destroyedscene.addImage(destroyedsceneimg);
          destroyedscene.scale=3;
          
         enemiesGroup.destroyEach();
       
          newBatman=createSprite(650,500);
          newBatman.addImage(newBatmanimg);
          newBatman.scale=0.3;
          
          ending1=createSprite(710,320,200,100);
          ending1.addImage(ending1img);
          ending1.scale=0.5;
          ending1.lifetime=200;
        }*/
      }




      //score = score + Math.round(getFrameRate()/60);


    }

    // if(enemiesGroup.isTouching(Soldierbulletimg)){

    //  enemiesimg.changeImage("enemydestroyimg", enemydestroyimg);
    //}



    //}


    //else if (gameState === END) {
    //gameOver.visible = true;
    //restart.visible = true;

    //change the trex animation

    //ground.velocityX = 0;
    //trex.velocityY = 0


    //set lifetime of the game objects so that they are never destroyed
    //obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);

    //obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);    
    //}


    if (life === 0) {
      newSoldierimg.destroy();
      Junglebackgroundimg.destroy();
      EnemiesbulletGroup.destroyEach();
      enemiesGroup.destroyEach();
      invisibleGround.destroy();
      gameOver1 = createSprite(700, 400, 100, 100);
      gameOver1.addImage(gameOver1img);
      gameOver1.depth = Enemiesbulletimg.depth + 1;
    }





    /* dialouge2img.destroy();
     pressStartimg.destroy();
     dialouge3img.destroy();
     dialouge1img.destroy();
     batmanimg.destroy();
    background1img.destroy();
   soldiersalutingimg.destroy();*/








    newSoldierimg.collide(invisibleGround);
    drawSprites();
    fill("blue");
    textSize(35);
    text("Score: " + score, 800, 50);

    textSize(35);
    text("LIFE: " + life, 100, 50);
  }
}
function createBullet() {
  var Sbullet = createSprite(newSoldierimg.x + 95, newSoldierimg.y - 45);
  Sbullet.addImage(Soldierbullet);
  Sbullet.scale = 0.05;
  Sbullet.velocityX = 8;


  BulletGroup.add(Sbullet);
}

function spawnenemiesimg() {

  if (frameCount % 260 === 0) {
    enemiesimg = createSprite(600, 100, 40, 10);
    enemiesimg.y = Math.round(random(100, 600));
    enemiesimg.addImage(enemies);
    enemiesimg.scale = 0.25;
    enemiesimg.velocityX = -3;
    enemiesimg.depth = Junglebackgroundimg.depth;
    enemiesimg.depth = enemiesimg.depth + 1;
    enemies.lifetime = 1000;
    var Ebullet = createSprite(600, 200);
    Ebullet.x = enemiesimg.x - 70;
    Ebullet.y = enemiesimg.y + 16;
    Ebullet.addImage(Enemiesbulletimg);
    Ebullet.scale = 0.05;
    Ebullet.velocityX = -8;
    //Ebullet.depth=Junglebackgroundimg.depth
    //Ebullet.depth=Ebullet.depth+1
    Ebullet.lifetime = 100;

    EbulletGroup.add(Ebullet);
    enemiesGroup.add(enemiesimg);

  }
}


//function spawnknife() {

  //if (frameCount % 10 === 0) {
    // knife= createSprite(600,200,40,10);
    // knife.y = Math.round(random(100,600));
    // knifeimg.addImage(knife);
    // knife.scale = 0.1;
    // knife.velocityX =-3;
    // knife.depth=Junglebackgroundimg.depth
    // knife.depth=knife.depth+1
    // knifeimg.lifetime = 1000;

    // knifeGroup.add(knife);
  //}







/*function createEBullet() {
  var  Ebullet=createSprite(600,200);
  Ebullet.x= Math.round(random(50,800));
  Ebullet.y= Math.round(random(50,800));
   Ebullet.addImage(Enemiesbulletimg);
   Ebullet.scale=0.05;
   Ebullet.velocityX=-4;
   //Ebullet.depth=Junglebackgroundimg.depth
   //Ebullet.depth=Ebullet.depth+1
   Ebullet.lifetime = 1000;

   EnemiesbulletGroup.add(Ebullet);
 }*/
