var stretchy;
var face;
var online = navigator.onLine;
var scenes = [];
let boxStroke = 40;

//let orientation;

let currentScene = 0;

let wifiBad;

let likes = 0;
let followers = 0;

let movementEnabled = true;

let likeGameActive = false;
let followGameActive = false;

let gravity = true;


let battery;
let phoneInfoHeight;
let photoIcon;

var usernameInput;
let daUsername = "username";

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2); //for now this seems the best way to get decent rendering on mobile
  likeGameSetup();
  photoIcon = loadImage("photoButton.svg");


  battery = loadImage("battery.png");
  phoneInfoHeight = battery.height+20*3;

  followerGameSetup()

  boxWidth = height;
  boxHeight = width;


  face = loadImage('face.png');
  wifiBad = loadImage("wifiBad.png");

  //Sometimes image sequences are not enough and you may want to
  //use p5's drawing function while retaining the built-in features of the
  //sprite class
  stretchy = createSprite(400, 200, 10, 10);
  stretchy.velocity.y = 14;
  stretchy.velocity.x = 10;
  stretchy.visible = false;

  //To do so you can override (overwrite) the draw() function of the sprite
  //and make it display anything you want in its current position.
  //In javascript function and methods can be assigned like variables

  stretchy.draw = function() {
    //stretchy code and design taken from p5 play library example http://p5play.molleindustria.org/examples/index.html?fileName=sprite9.js

    //the center of the sprite will be point 0,0
    //"this" in this function will reference the sprite itself
    fill(237, 205, 0);

    //make the ellipse stretch in the sprite direction
    //proportionally to its speed
    push();
    rotate(radians(this.getDirection()));
    ellipse(0, 0, 100+this.getSpeed(), 100-this.getSpeed());
    pop();

    //this.deltaX and this.deltaY are the position increment
    //since the last frame, move the face image toward the direction
    image(face, this.deltaX*2, this.deltaY*2);
  }

  stretchy.maxSpeed = 14;
  textFont("sans-serif")

  scenes.push(createScene("welcome",function(){
    textFont("Courier")
    textAlign(CENTER);
    textSize(30);
    text("My Social Media Pet", width/2,height*0.3)
    textSize(16);
    text("(a game)\ntap to continue",width/2,height/2);
  },function(){
    return mouseIsPressed;
  }))

  scenes.push(createScene("create profile",function(){
    if(!this.isActive){
      background(255,245,245);

      var d = select('#stuff');
      d.style("margin-top", height/5+"px")
      var head = createElement("h1", "Create Your Profile");
      head.parent(d);
      var sub = createElement("h3", "give birth to your pet")
      sub.parent(d);
      //var sub2 = createElement("h3", "create your avatar today")
      //sub2.parent(d);

      usernameInput = createInput('')
      usernameInput.attribute("placeholder", "username");
      usernameInput.style("text-size","16px");
      usernameInput.parent(d);

      var submit = createButton("submit");
      submit.style("text-size","16px");

      submit.mousePressed(function() { 
        if(usernameInput.value() != "")
          daUsername = usernameInput.value()
        removeElements()
        d.remove();
        currentScene++;
      });
      submit.parent(d);
      this.isActive = true;
    }

  },function(){
    return false;
  }))


  scenes.push(createScene("tutorial - tapping",function(){
    if(!this.isActive){
      this.frameStart = frameCount;
      this.isActive = true;
      stretchy.visible = true;

    }
    drawBox(); 
    setSpriteBounds(0,phoneInfoHeight,width,height);
    let duration = frameCount - this.frameStart;
    textAlign(CENTER);
    textSize(18);
    textFont("Courier");
    text("this is your pet\n\nit goes towards your finger\nwhen you tap the screen.",width/2,height/3)
    if(frameCount-this.frameStart > 300 ){  //hides next button for n frames
      try{
      (select("#b")).position(width/2,height*.75);
    }catch(e){    
        var b = createButton("next");
        b.id("b");
        b.mousePressed(advancedFromDOM);
      }
    }


  },function(){
    return false;
  }))

  scenes.push(createScene("tutorial - feeding",function(){
    if(!this.isActive){
      this.frameStart = frameCount;
      this.isActive = true;
      stretchy.visible = true;
    }

    drawBox(); 
    setSpriteBounds(0,phoneInfoHeight,width,height);
    textAlign(CENTER);
    textSize(18);
    textFont("Courier")
    text("your pet needs followers and likes\nto survive",width/2,height/2);
    try{
      (select("#b")).position(width/2,height*.7);
    }catch(e){    
        var b = createButton("next");
        b.id("b");
        b.mousePressed(advancedFromDOM);
        console.log(b);
      }  
    },function(){
    return false;
  }))
  scenes.push(createScene("tutorial - get followers",function(){
    if(!this.isActive){
      this.frameStart = frameCount;
      this.isActive = true;
      stretchy.visible = true;

    }

    drawBox(); 
    setSpriteBounds(0,phoneInfoHeight,width,height);
    drawFollowCount();
    followGame();

    if(followers > 0 && !followGameActive){
      try{
        (select("#b")).position(width/2,height/2);
      }catch(e){    
        var b = createButton("next");
        b.id("b");
        b.mousePressed(advancedFromDOM);
        console.log(b);
      }    
    }
    else if(!followGameActive){
      textReset();
      textFont("Courier")
      text("tap 'get followers'\nto feed your pet's need\nfor attention",width/2,height/4)
    }

    
  },function(){
    return false;
  }))
  scenes.push(createScene("tutorial - get likes",function(){
    if(!this.isActive){
      this.frameStart = frameCount;
      this.isActive = true;
    }

    drawBox(); 
    setSpriteBounds(0,phoneInfoHeight,width,height);    
    
    drawLikeCount();
    likeGame();

    textReset();
    textFont("Courier")
    if(likes > 0 && !likeGameActive){
      try{
        (select("#c")).position(width/3,height*.5);
      }catch(e){
      var c = createButton("ok game starts now good luck!");
      c.id("c");
      c.mousePressed(advancedFromDOM);
      }
      drawFollowCount();
    }else if(!likeGameActive){
      text("post a photo\nyou do it for the likes",width/2,height/4)
      textSize(12);
      text("(and your pet will die if you don't)",width/2,height/3)
    }

    
  },function(){
    return false;
  }))

  scenes.push(createScene("hit the like/follow threshold", function(){
    if(!this.isActive){
      likeGameReset();
      this.isActive = true;
      this.frameStart = frameCount;
    }
      drawBox(); 
      setSpriteBounds(0,phoneInfoHeight,width,height);
      drawFollowCount(0);
      drawLikeCount(0);
      followGame();
      likeGame();
    push();
    translate(stretchy.position.x ,stretchy.position.y-stretchy.height*10)
      //rotate(.1*PI)
      textReset();
      if((frameCount-this.frameStart)%1000 > 500 && !likeGameActive && !followGameActive)text("i'm hungry for attention\nfeed me!",0,0);
      //else if(frameCount% 120 <= 60) image(wifiBad,0,0,20,20);
    pop();
  },function(){
    return false;
  }));
}

function getOrientation(){
  if(width > height){
    return "LANDSCAPE";
  }else return "PORTRAIT";
}

function createScene(name, drawCallback,changeCriteria){
  let s = {
    "draw": drawCallback,
    "isActive":false,
    "name":name,
    "change":changeCriteria,
    "frameStart":0,
    "mousePressed": undefined
  }
  return s;
}

function createScene(name, drawCallback,changeCriteria, mousePressedFunction){
  let s = {
    "draw": drawCallback,
    "isActive":false,
    "name":name,
    "change":changeCriteria,
    "frameStart":0,
    "mousePressed": mousePressedFunction
  }
  return s;
}
function mousePressed(){
  //fullscreen(true);
  if(scenes[currentScene].mousePressed != undefined)
  scenes[currentScene].mousePressed() ;

  if(likeGameScenes[likeGameCurrentScene].mousePressed != undefined)
    likeGameScenes[likeGameCurrentScene].mousePressed();
}

function draw() {
  background(255, 255, 255);
  online = navigator.onLine;
    //mouse trailer, the speed is inversely proportional to the mouse distance
    if(mouseIsPressed){
      stretchy.velocity.x = (camera.mouseX-stretchy.position.x)/10;
      stretchy.velocity.y = (camera.mouseY-stretchy.position.y)/10;
    }    
  
  
    
      //gravity
      if(gravity)stretchy.addSpeed(0.07, 90);
  
      drawSprites();
      
      scenes[currentScene].draw()
      if(scenes[currentScene].change()){
        scenes[currentScene].isActive = false;
        currentScene++;
    }



}

function setSpriteBounds(x1,y1, x2, y2){
   if (stretchy.position.y >= y2) {
    stretchy.velocity.y *= -1;
    stretchy.position.y = y2;
  }else if(stretchy.position.y <= y1) {
    stretchy.velocity.y *= -1;
    stretchy.position.y = y1;
  }
  if (stretchy.position.x >= x2){
      stretchy.velocity.x *= -1;
    stretchy.position.x = x2;  
  } else if(stretchy.position.x <= x1){
          stretchy.velocity.x *= -1;
    stretchy.position.x = x1; 
  }
}



function deviceTurned(){
  resizeCanvas(windowWidth, windowHeight);
  console.log("turned!");

}

function windowResized() {
  cameraSave();
  resizeCanvas(windowWidth, windowHeight);
  cameraRestore();
  if(photoLabel != undefined)  photoLabel.position(width/2-photoButton.width/2,height*4/5);
  //cameraReset();
  
}
let percentX;
let percentY;

function cameraSave(){
    percentX = camera.position.x/width;
    percentY = camera.position.y/height;
}
    
function cameraRestore(){
    camera.position.x = percentX * width;
    camera.position.y = percentY * height;
}


function cameraReset(){
  this.camera.position.x = width/2;
  this.camera.position.y = height/2;
}

function drawBox(){
  fill(249,248,249);
  stroke(220,220,220);
  rect(0,0,width,31);
  textAlign(CENTER);
  textFont("Arial")

  noStroke();
  fill(0);
  text(daUsername,width/2,10+battery.height);
}

function drawLikeCount(redOrNot){
    let textPos = {
    "x": width/2,
    "y": height*.94,
    "y2": height*.94
  }
  textAlign(CENTER);
  noStroke();
  textSize(24);
  textFont("Arial")
  if(redOrNot > 0) fill(255,0,0);
  else fill(0);
  text(likes, textPos.x,textPos.y)
  textPos.y2 += textDescent();
  textSize(12);
  textPos.y2 += textAscent();
  fill(160,160,160);
  text("likes",textPos.x,textPos.y2);
}


function likeGame(){
  textReset();

  likeGamePlay();
  if(likeGameCurrentScene !=0) likeGameActive = true;
  else likeGameActive = false;
}

function drawFollowCount(redOrNot){
  //hack for doing paired lines of texts @ different sizes
  let textPos = {
    "x": 45,
    "y": 70,
    "y2": 70
  }
  textReset();
  textAlign(CENTER);
  noStroke();
  textSize(24);
  if(redOrNot > 0) fill(255,0,0);
  else fill(0);
  text(followers , textPos.x,textPos.y)
  textPos.y2 += textDescent();
  textSize(12);
  textPos.y2 += textAscent();
  fill(160,160,160);
  text("followers",textPos.x,textPos.y2);
  fill(255)
  stroke(219,219,219);
  let buttonStart = 100;
  rectMode(CORNER);
  rect(buttonStart,55,width-120,30)
  noStroke();
  fill(0);
  textAlign(CENTER);
  text("Get Followers",(width-120)/2+buttonStart,70+textDescent())

}

//help prevent accidental refreshes
window.onbeforeunload = function(event){
    return confirm("Confirm refresh");
};



function textReset(){
  textFont("Arial")
  textSize(18);
  textAlign(CENTER);
  fill(0);
  noStroke();
}


function advancedFromDOM(){
  scenes[currentScene].isActive = false;
  removeElements();
  currentScene++;
}

function forceLandscape(){
    if(getOrientation() == "PORTRAIT"){
      forceLandscapeFlag = true;
    }

}
