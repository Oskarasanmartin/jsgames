var paddle,
	keyPressed = false,
	paddleSpeed = 10;

function pageReady(){
	paddle = document.getElementById("paddle");		
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);
	setInterval(movePaddle, 5);
}

function keyDown(e){
	keyPressed = e.keyCode;
}

function keyUp(e){
	keyPressed = false;
}

function movePaddle(){
	if(keyPressed){
		if(keyPressed == 39){
			paddle.style.left = paddle.offsetLeft + paddleSpeed + "px";		
		}
		else if(keyPressed == 37){
			paddle.style.left = paddle.offsetLeft - paddleSpeed + "px";		
		}
	}
}

