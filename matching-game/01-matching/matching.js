var firstElement;

function elementClick(e) {
	var element = e.target;
	if (element != firstElement ) {
		if (!firstElement) {
			firstElement = element;
		}
		else if(firstElement.dataset.value === element.dataset.value) {
			matchedElements.appendChild(firstElement);
			matchedElements.appendChild(element);
			firstElement = null;
			if (elements.children.length === 0) {
				congrats.innerHTML = "You did it!";
			}
		}
		else {
			firstElement = null;
		}
	}
}

elements.addEventListener("click", elementClick);	
