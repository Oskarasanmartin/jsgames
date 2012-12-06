var highscoreList;

function loadHighscore(storageId){
	var storedHighscore = JSON.parse(localStorage.getItem(storageId));	
	if(supports_html5_storage()){
		if(!storedHighscore){
			highscoreList = [];
		}
		else{
			highscoreList = storedHighscore;
			if(highscoreList.length){
				var highscoreArray = new Array,
					i,
					highscoreListLength = highscoreList.length;
				for(i=0;i<highscoreListLength;i++){
					highscoreArray.push(highscoreList[i].points);
				}
			}
		}
	}
}

function sortHighscoreList(){
	highscoreList.sort(sortHighscore);
}

function showHighscore(highscoreElement){
	sortHighscoreList();
	var i,
		highscoreListLength = highscoreList.length,
		s = "<h4>Highscore</h4><table><tr><th>Player</th><th>Score</th></tr>";
	for(i=highscoreListLength-1;i>=0;i--){
		s += "<tr><td>" + highscoreList[i].player + "</td><td>" + highscoreList[i].score + "</td></tr>";
	}
	s += "</table>";
	highscoreElement.innerHTML = s;
}

function sortHighscore(a, b) {
	return a[ 'score' ] > b[ 'score' ];
}

function saveHighscore(playerName, storageId, score){
	if(!supports_html5_storage()){
		return(false);
	}
	highscoreList.push({"player": playerName, "score": score});
	sortHighscoreList();
	localStorage.setItem(storageId, JSON.stringify(highscoreList));
	console.log(localStorage.getItem(storageId));
}

function clearHighscore(storageId){
	localStorage.removeItem(storageId);
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}