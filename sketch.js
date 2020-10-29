var dog,happyDog;
var dogSprite;
var database;
var foodS,foodStock;
var count;
var thing,thing2;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup()
 {
  createCanvas(500, 500);
  count = 1;
  thing = 0;
  thing2 = 0;
   database = firebase.database();
   dogSprite = createSprite(250,250,50,50);
   dogSprite.addImage("dogImage",dog);
   dogSprite.scale = 0.2;
   foodStock = database.ref('Food');
   foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  
  if(count <= 0)
  {
  if(keyWentDown(UP_ARROW))
  {
    foodS = foodS - 1;
    writeStock(foodS);
    dogSprite.addImage("dogImage",happyDog);
    thing2 = 1;
    if(thing2 == 1)
    {
      textSize(30);
      fill("blue");
      text("Food Feeded!",150,50);
      thing2 = 0;
    }
  }
  if(keyWentDown(DOWN_ARROW))
  {
    foodS = foodS + 1;
    writeStock(foodS);
    dogSprite.addImage("dogImage",dog);
    
  thing = 1;
  if(thing == 1)
  {
    textSize(30);
    fill("blue");
    text("Food Bought!",150,50);
    thing = 0;
  }
  
  }
}
  if(frameCount % 30 == 0)
  {
    count = count - 1;
  }
  if(count <= 0)
  {
  textSize(30);
  fill("red");
  text("Food = " + foodS,180,100)
  }
   




  textSize(30);
  fill("red");
  text("Note : Press UP  to feed food",50,400);
  text("Note : Press DOWN  to buy food",50,450);
  drawSprites();
  
  
}

function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  database.ref('/').update({
  Food: x
  })
}



