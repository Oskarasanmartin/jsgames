var firstCard;

function positionCards() {
	var width = cards.offsetWidth, 
		left = 0, 
		top = 0,
		cardSpacing = 20;

	for (var i=0; i<cards.children.length; i++) {
		var card = cards.children[i];
		card.style.left = left + "px";
		card.style.top = top + "px";
		left += card.offsetWidth + cardSpacing;
		if (left + card.offsetWidth > cards.offsetWidth) {
			left = 0;
			top += card.offsetHeight + cardSpacing;
		}
		card.classList.add("placed");
	}	
}

function cardClick(e) {
	var card = e.target;
	if (card != firstCard ) {
		if (!firstCard) {
			selectFirstCard(card);
		}
		else if(firstCard.dataset.value === card.dataset.value) {
			matchCards(firstCard, card);
		}
		else {
			failedMatch(card);
		}
	}
}

function similar(card1, card2) {
	return card1.dataset.value === card2.dataset.value
}

function selectFirstCard(card) {
	firstCard = card;
	card.classList.add("selected");
}

function failedMatch(card) {
	firstCard.classList.remove("selected");
	firstCard = null;
}

function matchCards(card1, card2) {
	firstCard = null;

	card1.classList.remove("selected");
	matchSound.currentTime = 0;
	matchSound.play();

	removeCard(card1);
	removeCard(card2);
}

function removeCard(card) {
	matchedCards.appendChild(card);

	setTimeout(function() {
		card.classList.add("removed");
	}, 300)

	if (cards.children.length === 0) {
		gameOver();
	}
}

function gameOver() {
	setTimeout(function() {
		congrats.innerHTML = "You did it!";
	}, 500);
}

function start() {
	cards.shuffleChildren();
	positionCards();
	cards.addEventListener("click", cardClick);	
}

start();
