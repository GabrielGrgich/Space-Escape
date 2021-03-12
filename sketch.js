const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var backgroundIMG,meteorImg;
var ship1,shipImg;
var ship2;
var health = 100;
var meteorGroup;
var gameState = 1;

function preload () {

backgroundIMG = loadImage("sprites/space.jpg");

meteorImg = loadImage("sprites/meteor.png");

shipImg = loadImage("sprites/spaceShip.png");

}

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);
    engine = Engine.create();
    world = engine.world;
    ship1 = Bodies.rectangle(500,500,50,50,{isStatic:true});
    World.add(world,ship1);
    //shipSprite = createSprite(displayWidth/2,displayHeight/2,50,50);
    //ship2 = createSprite(displayWidth/2,displayHeight/2,50,50);
    ship2 = createSprite(500,500,50,50);
    ship2.addImage(shipImg);
    ship2.scale = 0.2;

    meteorGroup = new Group();

}

function draw(){
    background(backgroundIMG);
    Engine.update(engine);
    ship1.position.x = ship2.x;
    ship1.position.y = ship2.y;

    if (keyDown("w")) {
        ship2.y = ship2.y -= 10;
    }
    if (keyDown("s")) {
        ship2.y = ship2.y += 10;
    }
    if (keyDown("d")) {
        ship2.x = ship2.x += 10;
    }
    if (keyDown("a")) {
        ship2.x = ship2.x -= 10;
    }

    if(meteorGroup.isTouching(ship2)) {
        health +=-10;
        meteorGroup.destroyEach();
    }

    if (health<1) {
        gameState = 0;
        ship2.y = ship2.y += 10.5;
    }

 //ship1.display();
 fill("red");
textSize(24);
 text("Health: " +health,50,50);
 spawnMeteor1();
    drawSprites();
}

function spawnMeteor1 () {
if(frameCount%10 === 0){
var ran1 = Math.round(random(100,1300));
var ran2 = Math.round(random(0.2,0.6));
var meteor1 = createSprite(ran1,-50,50,50);
meteor1.addImage(meteorImg);
meteor1.velocityY = 8;
meteor1.scale = ran2;
meteor1.lifetime = displayHeight/7;
 meteorGroup.add(meteor1);
}
}
