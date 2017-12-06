
let startHeart;
let full;
let followButton;
let followingButton;
let fbLikeEmpty;
let fbLikeFull;
let followerGameSprites;
let followGameCount = 0;
let followGameThreshold = 2;
let scoreSprites;
let usernames = ["boo","fanchi","kim","sexygirl7","sexyboi91","jumbo","chillboi99","dumbotheclown","myLifeIsDopeX1000","mai","imbored","myLittleFinsta","knobknobknob"];
let currentUsername;

let gameStartTime;

function followerGameSetup() { 
  followerGameSprites = new Group();
  scoreSprites = new Group();

  startHeart = loadImage("likeEmpty.svg")
  fullHeart = loadImage("likeFull.svg")
  followButton = loadImage("follow.png")
  followingButton = loadImage("following.png")
  fbLikeEmpty = loadImage("fbLikeEmpty.svg")
  fbLikeFull = loadImage("fbLikeFull.svg")
} 

function followGame(){
  if(followGameActive){
  noStroke();
  fill(0);
  if(frameCount - gameStartTime > 1000) {
    followGameActive = false;
    likeGameEnable();

    deleteFollowerGameSprites();
  } else followGamePlay();
} else if(mouseIsPressed && mouseY < 100 && !likeGameActive){
    likeGameDisable();
    followGameActive = true;
    gameStartTime = frameCount;

  }  
}

function followGamePlay() { 
	fill(255);
	rect(0,32,width,height);
  if(frameCount % 20 == 0) createRandomSprites();
  followGameCollisionCheck();
  drawSprites(); //necessary?
  updateFollowScore();
}

function updateFollowScore(){
	if(followGameCount >= followGameThreshold ){
		let score = createSprite(width/2,51)
		currentUsername = random(usernames);
		score.draw = function(){
			fill(81,213,154);
			rectMode(RADIUS);
			rect(0,0,width,20);
			fill(255);
			textSize(20);
			textAlign(CENTER);
			text("@"+currentUsername+" followed you!",0,textDescent());
		}
		score.life = 100; 
		scoreSprites.add(score);
		followers++;

		followGameCount = 0;
		followGameThreshold = floor(random(10))+1;
		console.log(followGameThreshold);
	}
}

function createRandomSprites(){
	let l = createSprite(random(width),random(height/5,height));
	let whichImage = random(["like","follow","fb"])
	if(whichImage == "like"){
	l.addImage("start", startHeart);
	l.addImage("pressed", fullHeart);
}else if(whichImage == "follow"){
	l.addImage("start",followButton);
	l.addImage("pressed",followingButton);

}else{
	l.addImage("start", fbLikeEmpty);
	l.addImage("pressed",fbLikeFull)
}

	l.life = 100;
	followerGameSprites.add(l);

}

function followGameCollisionCheck(){
	for(let i = 0; i < followerGameSprites.size(); i++){
		let thisSprite = followerGameSprites[i];
		if(mouseIsPressed && thisSprite.overlapPoint(mouseX, mouseY) && thisSprite.getAnimationLabel() == "start"){
			thisSprite.changeImage("pressed");
			thisSprite.life = 10;
			followGameCount++;
		}
	}
}

function deleteFollowerGameSprites(){
	followerGameSprites.removeSprites();
	scoreSprites.removeSprites();
}