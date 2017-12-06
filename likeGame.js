//like game
let photoLike;
let previewImg;
let p5img;
let emojis =["😅","😍","🤘","🌈","💥","🍒","❤️","💲","✨"];
let stickers = [];
let waitingString = "waiting for likes";
let photoLabel;
let likeGameSprites;
let likeCount = 0;
let randomFrameCount = 20;
//let fullHeart;
let photoButton;

let likeGameScenes = [];
let likeGameCurrentScene = 0;
let headerHeight = 40;

function likeGameSetup(){
  likeGameSprites = new Group();
  // fullHeart = loadImage("likeFull.png");
  likeGameScenes.push(createScene("start", function(){
  	if(!this.isActive){
  		likeGameReset();
  		this.isActive = true;
  	}
  },function(){
  	return p5img != undefined;
  }))


  likeGameScenes.push(createScene("stickers",function(){
  	background(255);
  	let asp = p5img.height/p5img.width;
    if(!this.isActive){
      stretchy.visible = false;
      removeElements();
      this.isActive = true;
    }
    stroke(0);
    fill(255);
    rect(0,0,width, headerHeight);
    textAlign(CENTER);
    textSize(24);
    noStroke();
    if(stickers.length > 1)fill(0,0,200);
    else fill(200);

    text("Next", width*.9,(headerHeight+textAscent())/2);
    fill(20);
    textAlign(LEFT);
    text("Tap to make it pretty",width*.1,(headerHeight+textAscent())/2)
    image(p5img,0,headerHeight+1, width, width*asp);
    drawStickers();
  },function(){
    return mouseIsPressed && mouseY < 40 && mouseX > width*.7 && stickers.length >1;
  }, function(){
  	if(mouseY > headerHeight) stickers.push([random(emojis),mouseX,mouseY]);
  }))


  likeGameScenes.push(createScene("are you sure?",function(){

    background(255);
    textAlign(CENTER);
    textFont("Courier");
    text("Are you sure you wanna post this???\nYour followers will judge you.",width/2,height/2);
    stroke(0);
    fill(255);
    rect(0,0,width, headerHeight);
    textAlign(CENTER);
    fill(0,0,200);
    textSize(24);
    noStroke();
    textFont("Arial");

    text("Yes", width*.9,(headerHeight+textAscent())/2);    
    //add a dom button
  }, function(){
    //TODO UPDATE THIS AND ADD DOM BUTTON!!!
    return false;
  },function(){
  	if(mouseY < headerHeight && mouseX > width*.7 && stickers.length >1)
  		likeGameCurrentScene++;

  }))


	likeGameScenes.push(createScene("waiting for likes",function(){
		if(!this.isActive){
			this.frameStart = frameCount;
			this.isActive = true;
			likeGameSprites.removeSprites();
		}
	    background(255);
	    if(frameCount%20 == 0){
	      waitingString += ".";
	      if(waitingString == "waiting for likes....")
	        waitingString = "waiting for likes"
	    }
	    textAlign(CENTER);
	    text(waitingString,width/2,height/2);
	    text(likeCount,width/2,height/2+40);
	    generateLikes();
	    drawSprites();
	},function(){
	  return frameCount - this.frameStart > 500;
	}))

	likeGameScenes.push(createScene("you gots many likes",function(){
		 background(255);

		if(!this.isActive){
			this.frameStart = frameCount;
			this.isActive = true;
		}
		if(frameCount % 4 == 0 )fill(255)
		else fill(0);
		text(likeCount + " likes!",width/2,height/2);
	},function(){
		if(frameCount - this.frameStart > 100){
			likes += likeCount;
			stretchy.visible = true;

			return true;
		}else return false;
	}))

}



function likeGameReset(){
	p5img = undefined;
  photoLabel = createElement("label", "");
  photoLabel.id("photo");
  
  photoButton = createImg("photoButton.svg");
  photoButton.parent("photo");

  photoLabel.position(width/2-photoButton.width/2,height*4/5);

  photoLike = createInput('',"file");
  photoLike.attribute("onchange", "readURL(this);");
  photoLike.parent("photo");
  photoLike.hide();
  previewImg = createImg('');
  previewImg.hide();

  likeCount = 0;
  randomFrameCount = 20;
  stickers = [];
}

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
            	console.log("hello!");
              previewImg.attribute('src', e.target.result);
              photoLike.hide();
              p5img = loadImage(previewImg.elt.src)
            }
            reader.readAsDataURL(input.files[0]);
        }
}

function likeGamePlay(){
	textReset();
  likeGameScenes[likeGameCurrentScene].draw();
  if(likeGameScenes[likeGameCurrentScene].change()){
  likeGameScenes[likeGameCurrentScene].isActive = false;
  likeGameCurrentScene++;
  if(likeGameCurrentScene >= likeGameScenes.length){
  	likeGameCurrentScene = 0;
  }
}
}

function generateLikes(){
  if(frameCount % randomFrameCount == 0){
    likeCount++;
    randomFrameCount = floor(random(50));
    let l = createSprite(width/2,height/2);
    l.velocity.x = random(-10,10);
    l.velocity.y = random(-10,10);
    l.addImage("like",fullHeart);
    l.life = 200;
    likeGameSprites.add(l);  
    }
  }

function drawStickers(){
  textSize(90);
  for(let i = 0; i < stickers.length; i++)
    text(stickers[i][0],stickers[i][1],stickers[i][2]);
}

function likeGameDisable(){
	try{
	photoLabel.hide();
	}catch(e){
		console.log('like game not set up yet')
	}}

function likeGameEnable(){
	try{
	photoLabel.show();
	}catch(e){
		console.log('like game not set up yet')
		//likeGameReset();

	}
}