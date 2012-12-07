var firstElement;

function elementClick(e) {
	var element = e.target;
	if (element != firstElement ) {
		if (!firstElement) {
			selectFirstElement(element);
		}
		else if(similar(firstElement, element)) {
			matchElements(firstElement, element);
		}
		else {
			failedMatch(element);
		}
	}
}

function similar(element1, element2) {
	return element1.dataset.value === element2.dataset.value
}

function selectFirstElement(element) {
	firstElement = element;
}

function failedMatch(element) {
	firstElement = null;
}

function matchElements(element1, element2) {
	firstElement = null;
	removeElement(element1);
	removeElement(element2);
}

function removeElement(element) {
	matchedElements.appendChild(element);

	if (elements.children.length === 0) {
		gameOver();
	}
}

function gameOver() {
	congrats.innerHTML = "You did it!";
}

function start() {
	elements.shuffleChildren();
	elements.addEventListener("click", elementClick);	
}

start();
