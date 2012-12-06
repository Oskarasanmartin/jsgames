var tiles = null,
	rows = 3,
	cols = 3,
	tileWidth = 341,
	tileHeight = 256,
	stageLeft = null,
	selectedTile = null,
	tilesResult = rows*cols,
	tilesFixed = 0;	


function pageloaded(){
	stageLeft = document.getElementById("stage").offsetLeft;
	stageTop = document.getElementById("stage").offsetTop;
	tiles = document.getElementsByClassName("tile");
	tilesArray = new Array();
	for(var i=0; i<tiles.length; i++){
		tilesArray.push(tiles[i]);	
	}
	tilesArray.sort(function() {return 0.5 - Math.random()});
	var row = 0,
		col = 0,
		tile = null,
		i = 0
		maxTiles = tilesArray.length;
	for(i=0;i<maxTiles;i++){
		tile = tilesArray[i];
		tile.className = "mixed_tile";
		tile.row = row+1;
		tile.col = col+1;
		tile.addEventListener("click", clickTile);
		tile.style.left = stageLeft + (col * tileWidth) + "px";
		tile.style.top = stageTop + (row * tileHeight) + "px";
		if(col == cols-1){
			col = 0;
			row++;
		}
		else{
			col++;	
		}
	}
}


function clickTile(e){
	var clickedTile = e.target;
	if(!selectedTile){
		selectedTile = 	clickedTile;
		selectedTile.style.opacity = 0.8;
	}
	else{
		selectedTile.style.opacity = 1;
		var selectedTileLeft = selectedTile.offsetLeft;	
		var selectedTileTop = selectedTile.offsetTop;	
		var clickedTileLeft = clickedTile.offsetLeft;	
		var clickedTileTop = clickedTile.offsetTop;
		var selectedRow = selectedTile.row;	
		var selectedCol = selectedTile.col;	
		var clickedRow = clickedTile.row;	
		var clickedCol = clickedTile.col;
		
		clickedTile.style.left = selectedTileLeft + "px";	
		clickedTile.style.top = selectedTileTop + "px";	
		selectedTile.style.left = clickedTileLeft + "px";	
		selectedTile.style.top = clickedTileTop + "px";	
		clickedTile.row = selectedRow;	
		clickedTile.col = selectedCol;	
		selectedTile.row = clickedRow;	
		selectedTile.col = clickedCol;	
		
		if(selectedTile.row == selectedTile.getAttribute("data-row") && selectedTile.col == selectedTile.getAttribute("data-col")){
			selectedTile.style.opacity = 0.2;
			selectedTile.removeEventListener("click", clickTile);	
			tilesFixed++;	
		}
		if(clickedTile.row == clickedTile.getAttribute("data-row") && clickedTile.col == clickedTile.getAttribute("data-col")){
			clickedTile.style.opacity = 0.2;
			clickedTile.removeEventListener("click", clickTile);
			tilesFixed++;	
		}
		if(tilesFixed == tilesResult){
			var tilesArray = document.getElementsByClassName("mixed_tile");
			var i = 0,
				maxTiles = tilesArray.length;
			for(i=0;i<maxTiles;i++){
				tilesArray[i].style.opacity = 1;	
			}
		}
		selectedTile = null;
	}
}
