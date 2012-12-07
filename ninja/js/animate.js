 // Declare global variables
var frameWidth 		=	200, 		// width of frame in sprite sheet 
	frameHeight 	=	300, 		// height of frame in sprite sheet 
	frame 			=	0, 			// current frame (1 - maxFrames)
	maxFrames 		= 	6, 			// max number of frames
	character, 						// the container for the animation
	speed, 							// the number of pixels the character moves each frame
	counter			=	1,			// incrementor that keeps track of counting the frames
	direction		=	"right",	// the direction the animation should be facing 
	hide			=	false,		// whether the ninja is hiding 
	aniNinja		=	null,		// holds the ninja animation
	aniBackground	=	null,		// holds the background animation
	aniItems		=	null,		// holds the items animation
	itemsList,						// array for the items that appears in the animation
	aniInitiated	=	false,		// Whether the animation items have been initiated
	stageFrame		=	1;			// Counts the number of frames walked across the "stage"

function initiate(){
	character = document.getElementById("ninja"); // get the character
	// start animation
	document.addEventListener('keydown', startAnimation, false);
	document.addEventListener('keyup', stopAnimation, false);
	
	// Set the opacity of the #animation div so that it will fade in
	document.getElementById('animation').style.opacity = 1;
	// set the background position on all div elements so that they can be accessed through js later on
	var divs = document.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++) {
		divs[i].style.backgroundPosition = '0px 0px';
	}
	/*
	console.groupCollapsed('Initiation');
		console.info('animation initiated');
		console.info('event listener for "keydown" added');
		console.info('event listener for "keyup" added');
		console.info('Divs array: ', divs);
	console.groupEnd();
	*/
	// Initiate items, so that they are placed according to their data-x html attributes before being animated
	itemsList = document.getElementsByClassName('item'); // Populate the array with html elements that have the class "item"
	if (aniInitiated == false) { // only do this if not initiated before
		for(var i=0; i<itemsList.length; i++) { // run through all the elements
			var animent = itemsList[i]; // get individual element out
			animent.style.backgroundPositionX = animent.getAttribute('data-x')+"px"; // Set the background position to the value in the data-x attribute
			console.log(animent.getAttribute('data-x')+"px");
		}
		aniInitiated = true; // set to true to prevent code from executing again
	}

}	

function startAnimation(e) {
 	var keyCode = e.keyCode;
	//console.log(keyCode);
	// Animate Right
	if (keyCode == 39 && aniNinja == null) {
		runAnimation();
		direction = "right";
		character.style.backgroundPositionY = "0px";
	}
	// Animate Left
	if (keyCode == 37 && aniNinja == null) {
		runAnimation();	
		direction = "left";
		character.style.backgroundPositionY = frameHeight+"px";
	}
	// Animate hide (use arrow up or down to toggle hide ninja
	if (keyCode == 38 || keyCode == 40 && aniNinja == null) {
		if (hide==false) {
			character.style.top = "400px"; // default + 100
			hide = true;
		} 
		else {
			character.style.top = "300px"; // default position as set in css
			hide = false;
		}
	}
}

function runAnimation() {
	aniNinja = setInterval(animateCharacter, 1000 / 10); // Animate the ninja
	aniBackground = setInterval(   // Animate the background
		function(){ // Anomynous function that performs the calls for animating the background
			animateBackground('clouds1',6); // Define which element to move and at which speed (pixels moved)
			animateBackground('clouds2',3);
			animateBackground('ground-level1',8);
			animateBackground('ground-level2',5);
			animateBackground('ground-level3',12);
			animateBackground('ground-level4',15);
		}, 1000 / 10);
	aniItems = setInterval(animateItems, 1000/10); // Animate the items that appear
}

function stopAnimation() {
	clearInterval(aniNinja);
	clearInterval(aniBackground);
	clearInterval(aniItems);
	aniNinja = null; // Set to null to signal that there is no longer an animation set for the ninja
}	

function animateCharacter() {
	character.style.backgroundPositionX = (frameWidth * frame)+"px"; // Change the background-position-x css property to animate the background
	frame += counter; // Keep track of which frame is displayed
	//console.log('Frame: '+ frame);
	if (frame == maxFrames) { // if at the last frame
		counter = -1;
	}
	if (frame == 1) { // if at the first frame
		counter = 1;
	}
	// Count the total of frames walked across the stage
	if (direction == "right") {
		stageFrame++;
	}
	else {
		stageFrame--;
	}
	console.log('StageFrame: '+stageFrame);
}

function animateBackground(element, speed) {
	//console.log('element: '+ element);
	var aniObject = document.getElementById(element); // Create a variable to hold the reference to the element
	//console.log('aniObject: '+ aniObject);
	var pos = aniObject.style.backgroundPositionX; // Assign the current position of the background x-value to pos
	//console.log('pos: '+ pos);
	pos = pos.replace("px",""); // Remove px from value of pos, e.g. "20px" -> "20"
	pos = parseInt(pos); // Make pos a number variable instead of a text string, i.e. "20" -> 20
	if (direction == "right") {
		pos = pos - speed; // the background has to move towards left, hence the negative x-value
	}
	else {
		pos = pos + speed; // move background to right, i.e. increase distance to left side
	}
	aniObject.style.backgroundPositionX = pos + "px"; // turn pos back into a text string with the added "px" and assign to element x-value
	
}

function animateItems() {
	for(var i=0; i<itemsList.length; i++) { // run through the list of animated elements
		animent = itemsList[i]; // Get the individual element
		var pos = stageFrame*(-parseInt(animent.getAttribute('data-speed'))); // Get speed, use negative modifier to move opposite direction of character
		pos = pos + parseInt(animent.getAttribute('data-x')); // Add the x-position offset
		animent.style.backgroundPositionX = pos+"px";
		console.log(pos+"px");
		//itemsList[i].style.backgroundPosition = '0px 0px';
	}

}