// Main Variables
var database;
var form;

// Dog
var dog,sadDog,happyDog;

// Food
var foodObj;
var foodStock = 0;
var tempMilk;
var milkImage;

// Feed time and last fed (To keep track on the feed time)
var feedTime;
var lastFed;

function preload(){
  
  sadDog = loadImage("Images/Dog.png");

  happyDog = loadImage("Images/happy dog.png");

  milkImage = loadImage("Images/Milk.png");

}

function setup() {
  
  var canvas = createCanvas(1000,400);
  
  database = firebase.database();

  foodObj = new Food();
  foodObj.display();
  
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feedTime = database.ref("feedTime");
  feedTime.on("value", function(data) {

    lastFed = data.val();

  })

  // Buttons
  var addFood;
  var feedYourPet;
  var displayPetName;

  var heading = createElement("h1");
  heading.html("Welcome to Virtual Pet");
  heading.position(470, 100);

  var petHeading = createElement("h3");
  petHeading.html("Enter the name of your pet");
  petHeading.position(890, 340); 

  var petName = createInput("Name");
  petName.position(920, 400);

  var submit = createButton("Submit");
  submit.position(970, 440);

  submit.mousePressed(function() {

    heading.hide();
    petName.hide();
    submit.hide();
    petHeading.hide();

    var name = petName.value();
  
    database.ref("pet").set({

      name : name

    });

    displayPetName = createElement("h3");
    displayPetName.html(name);
    displayPetName.position(973, 330);

    addFood = createButton("Add food");
    addFood.position(650, 100);
    addFood.mousePressed(function() {

      foodObj.foodStock += 1;
      foodObj.update(foodObj.foodStock);

    });

    feedYourPet = createButton("Feed your pet");
    feedYourPet.position(633, 130);
    feedYourPet.mousePressed(function() {

      dog.addImage(happyDog);

      foodObj.deductFood();
      foodObj.foodStock -= 0.1;
      foodObj.update(foodObj.foodStock);

      tempMilk = createSprite(700, 210, 70, 70);
      tempMilk.addImage(milkImage);
      tempMilk.scale = 0.1;

      database.ref("/").update({

        feedTime : hour()

      });

    });

  });

}

function draw() {

  background(46,139,87);

  foodObj.display();

  textSize(23);
  textFont("Jetbrains Mono")
  fill("black");

  if(lastFed > 12) {

    text("Last time fed : " + lastFed % 12 + "PM", 340, 380);

  }
  else if(lastFed === 12) {

    text("Last time fed : " + lastFed + "PM", 340, 380);

  }
  else if(lastFed > 0) {

    text("Last time fed : " + lastFed + "AM", 340, 380);

  }
  else if(lastFed === 0) {

    text("Last time fed : 12 AM", 340, 380);

  }
  else if(lastFed <= 0){

    text("Last time fed : " + lastFed + " AM", 340, 380)

  }

  drawSprites();

}

