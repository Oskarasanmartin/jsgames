var hiddenObjects,
	assets,
	assetsList = new Array(),
	assetsWidth = 50,
	stageWidth,
	stageLeft;


function pageLoaded(){
	hiddenObjects = document.getElementsByClassName("hiddenobject");
	assets = document.getElementById("assets");
	stageLeft = document.getElementById("stage").offsetLeft;
	stageWidth = window.innerWidth;
	var i;
	var max = hiddenObjects.length;
	for(i=0; i<max; i++){
		var hiddenObject = hiddenObjects[i];
		var hiddenObjectLeft = hiddenObject.offsetLeft;
		hiddenObject.orgLeft = hiddenObjectLeft;
		hiddenObject.style.left = hiddenObjectLeft + stageLeft + "px";
		hiddenObject.addEventListener("click", stageClick);
		console.log(hiddenObject.orgLeft);
	}
	window.addEventListener("resize", function() {
		stageLeft = document.getElementById("stage").offsetLeft;
		var j;
		maxObjects = hiddenObjects.length;
		for(j=0; j<maxObjects; j++){
			obj = hiddenObjects[j];
			if(obj.classList.contains("noanimation")){
				continue;
			}
			console.log(obj.orgLeft);
			obj.style.left = stageLeft + obj.orgLeft + "px";
		}
	});
	document.body.style.opacity = 1;
};

function stageClick(e){
	var hiddenObject = e.target;
	hiddenObject.classList.add("animate");
	hiddenObject.orgLeft = getNextAssetPositionLeft();
	hiddenObject.style.left = hiddenObject.orgLeft + "px";
	hiddenObject.style.top = (assets.offsetTop + 10) + "px";
	hiddenObject.style.width = "40px";
	assetsList.push(hiddenObject);
	document.getElementById("magic").play();
	setTimeout(function(){
		hiddenObject.removeEventListener("click", stageClick);
		hiddenObject.classList.remove("animate");
		hiddenObject.classList.add("noanimate");
	}, 3000);
}

function getNextAssetPositionLeft(){
	return(assetsList.length*assetsWidth) + stageLeft;
}