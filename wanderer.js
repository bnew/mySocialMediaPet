//wanderer scene
let bgSprites;
let boxes;
let boxWidth;
let boxHeight;
let characterImages = [];
let hunched = [];
let bedImg = [];
let walking = [];
let butt = [];
let food = [];
function deleteWandererSprites(){
  bgSprites.removeSprites();
  boxes.removeSprites();
}

function loadWandererCharacters(){
  bgSprites = new Group();
  boxes = new Group();

  for(let i = 1; i < 12; i++){
    characterImages.push(loadImage("gabe/img"+i+".png"));
  }
  for(let i = 1; i <4; i++) hunched.push(loadImage("gabe/hunched"+i+".png"));
  for(let i = 1; i <3; i++) bedImg.push(loadImage("gabe/bed"+i+".png"));
  for(let i = 1; i <3; i++) walking.push(loadImage("gabe/walking"+i+".png"));
  for(let i = 1; i <3; i++) butt.push(loadImage("gabe/butt"+i+".png"));
  for(let i = 1; i <3; i++) food.push(loadImage("gabe/food"+i+".png"));

}

function createSpritesForWanderingScene(){
  // let boxWidth = height;
  // let boxHeight = width;
  let boxStrokeWidth = 40;
  let boxColor = color(0,205,0)
  for(let y = 0; y < 4; y++){
    for(let x = 0; x < 4; x++){
      push();

      // let x0 = height*(x)*2;
      // let y0 = -width*2/3+(y*width*2);
      let x0 = width + boxWidth*2*x
      let y0 = -boxHeight*.5 + boxHeight*1.5*y 
      var boxLeft = createSprite(x0,y0,boxStrokeWidth,boxHeight);
      boxLeft.draw = function(){
        noStroke();
        fill(boxColor);
        rectMode(CORNER);
        rect(0,0,boxStrokeWidth,boxHeight);
      }
      boxLeft.setCollider("rectangle",boxStrokeWidth*.5,boxLeft.height*.5,boxLeft.width,boxLeft.height);
      boxLeft.immovable = true;
      boxes.add(boxLeft);
      
      var boxRight = createSprite(x0+boxWidth,y0,boxStrokeWidth,boxHeight);
      boxRight.draw = function(){
        noStroke();
        fill(boxColor);
        rectMode(CORNER);
        rect(0,0,boxStrokeWidth,boxHeight);
      }
      boxRight.setCollider("rectangle",boxStrokeWidth*.5,boxRight.height*.5,boxRight.width,boxRight.height);
      boxRight.immovable = true;
      boxes.add(boxRight);
      
      var boxTop = createSprite(x0,y0,boxWidth+boxStrokeWidth, boxStrokeWidth);
      boxTop.draw = function(){
        noStroke();
        fill(boxColor);
        rectMode(CORNER)
        rect(0,0, boxWidth+boxStrokeWidth, boxStrokeWidth);
      }
      boxTop.setCollider("rectangle",boxTop.width*.5,boxStrokeWidth*.5,boxTop.width,boxTop.height);
      boxTop.immovable = true;
      boxes.add(boxTop);
      
      var boxBottom = createSprite(x0,y0+boxHeight,boxWidth+boxStrokeWidth, boxStrokeWidth);
      boxBottom.draw = function(){
        noStroke();
        fill(boxColor);
        rectMode(CORNER)
        rect(0,0, boxWidth+boxStrokeWidth, boxStrokeWidth);
      }
      boxBottom.setCollider("rectangle",boxTop.width*.5,boxStrokeWidth*.5,boxBottom.width,boxBottom.height);
      boxBottom.immovable = true;
      boxes.add(boxBottom);
  
        addACharacter(x0,y0);
      pop();
    }
  }
}


let charIndex = 0;
let charImageIndex = 0;
function addACharacter(startX,startY){
  let character = createSprite(boxWidth/2+startX, boxHeight/2+startY);
  //iterate through a list of characters
  //create a sprite
  //add an image or an animation

  
  createSprite
  if(charIndex == 0) character.addAnimation("hunched", hunched[0],hunched[1],hunched[2]);
  else if (charIndex == 5) character.addAnimation("food", food[0],food[1]);
  else if (charIndex == 8) character.addAnimation("bed", bedImg[0],bedImg[1]);
  else if(charIndex == 13) character.addAnimation("walking",walking[0],walking[1]);
  else if(charIndex == 15) character.addAnimation("butt", butt[0],butt[1]);
  else {
    character.addImage(characterImages[charImageIndex]);
    charImageIndex++;
  }
  charIndex++
  if(character.animation) character.animation.frameDelay = 15;
  bgSprites.add(character);

}