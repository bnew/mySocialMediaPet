//wanderer scene

function deleteWandererSprites(){
  bgSprites.removeSprites();
}

let bed;
function loadWandererCharacters(){
  bed = loadImage("/gabe/Artboard 5 copy 2.png")
  

  

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

    let guy = createSprite(boxWidth/2+x0, boxHeight/2+y0);
    guy.addImage(bed)
    bgSprites.add(guy);
      pop();
    }
  }
}