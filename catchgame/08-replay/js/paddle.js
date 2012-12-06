var animationId,
	stageBottom,
	stageRight,
	ball,
	ballStart,
	ballSpeed = 15,
	ballWidth,
	fps = 40,
	keyPressed = false,
	paddleSpeed = 10,
	paddleWidth,
	scoreBoard,
	score = 0,
	lifeCounter = 3,
	gameOver; 

function pageReady(){
	// Stage dimensions
	stageBottom = window.innerHeight;
	stageRight = window.innerWidth;

	// Setup ball
	ball = document.getElementById("ball");
	ballWidth = ball.offsetWidth;
	ballStart = -ballWidth + "px";
	ball.style.top = ballStart;
	ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";
	
	// Setup paddle
	paddle = document.getElementById("paddle");	
	paddleWidth = paddle.offsetWidth;	
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
	setInterval(movePaddle, 5);

	// Setup scoreboard
	scoreBoard = document.getElementById("scoreBoard");
	updateScoreBoard();

	// Setup game over screen
	gameOver = document.getElementById("gameOver");
	gameOver.style.left = stageRight/2 - gameOver.offsetWidth/2 + "px";
	document.getElementById("replay").addEventListener("click", replay);

	// Animate the ball
	animationId = setInterval(animateBall, 1000/fps);

	// Start background music
	document.getElementById("bgSound").play();	
}

function animateBall(){	
	if(ball.offsetTop > stageBottom){
		// Return to top
		ball.style.top = ballStart;	
		ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";

		// Remove a life
		document.getElementById("life" + lifeCounter).style.display = "none";
		document.getElementById("missSound").play();
		lifeCounter--;
		if(lifeCounter == 0){
			// Gameover
			clearInterval(animationId);
			gameOver.style.top = "200px";
			document.getElementById("bgSound").pause();
			document.getElementById("gameOverSound").play();
		}
	}
	else{
		if(collisionTest(ball, paddle)){
			// if collision between ball and paddle: return to top
			ball.style.top = ballStart;	
			ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";
			score++;
			updateScoreBoard();
			document.getElementById("hitSound").play();
		}
		else{
			// Move ball
			ball.style.top = ball.offsetTop + ballSpeed + "px";
		}
	}
}

function updateScoreBoard(){
	scoreBoard.innerHTML = score;
}

function keyDown(e){
	// Grab the keyCode from the keydown event
	keyPressed = e.keyCode;
}

function keyUp(e){
	// Reset the global variable
	keyPressed = false;
}

function movePaddle(){
	if(keyPressed){
		// We only go here when a key is pressed
		var paddleLeft = paddle.offsetLeft;
		if(keyPressed == 39){
			// Go right
			if(paddleLeft + paddleWidth < stageRight){
				paddle.style.left = paddleLeft + paddleSpeed + "px";		
			}
		}
		else if(keyPressed == 37){
			// Go left
			if(paddleLeft > 0){
				paddle.style.left = paddle.offsetLeft - paddleSpeed + "px";		
			}
		}
	}
}

function replay(){
	// Slide game over screen up
	gameOver.style.top = "-250px";

	setTimeout(function(){

		// Reset life
		lifeCounter = 3;
		var lifemarkers = document.getElementsByClassName("lifemarker"),
			lifemarkersLength = lifemarkers.length,
			i;
		for(i=0; i<lifemarkersLength; i++){
			var lifemarker = lifemarkers[i];
			lifemarker.style.display = "inline";
		}

		// Reset score
		score = 0;
		updateScoreBoard();

		// Animate ball again
		ball.style.top = ballStart;	
		ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";
		animationId = setInterval(animateBall, 1000/fps);

		document.getElementById("bgSound").play();
	}, 2500);
}

function randomRange(min, max){
	// Return a random decimal number in an interval
	return(Math.random()*(max-min)+min);
}

