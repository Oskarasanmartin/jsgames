var animationId,
	stageBottom,
	stageRight,
	ball,
	ballStart,
	ballSpeed = 5,
	ballWidth,
	fps = 40,
	keyPressed = false,
	paddleSpeed = 10,
	paddleWidth,
	scoreBoard,
	score = 0; 

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
	
	// Animate the ball
	animateBall();	

	// Setup paddle
	paddle = document.getElementById("paddle");	
	paddleWidth = paddle.offsetWidth;	
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
	setInterval(movePaddle, 5);

	// Setup scoreboard
	scoreBoard = document.getElementById("scoreBoard");
	updateScoreBoard();
}

function animateBall(){	
	// Start animation and wait for next frame
	setTimeout(function(){
		// Tell the browser to animate continiously
		window.requestAnimationFrame(animateBall);
		if(ball.offsetTop > stageBottom){
			// Return to top
			ball.style.top = ballStart;	
			ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";
		}
		else{
			if(collisionTest(ball, paddle)){
				// if collision between ball and paddle: return to top
				ball.style.top = ballStart;	
				ball.style.left = randomRange(ballWidth/2, stageRight-ballWidth) + "px";
				score++;
				updateScoreBoard();
			}
			else{
				// Move ball
				ball.style.top = ball.offsetTop + ballSpeed + "px";
			}
		}
	}, 1000/fps)
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

function randomRange(min, max){
	// Return a random decimal number in an interval
	return(Math.random()*(max-min)+min);
}

