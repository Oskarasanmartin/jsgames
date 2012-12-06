function collisionTest(tester, target){
	var testerLeft = tester.offsetLeft;
	var testerTop = tester.offsetTop;
	var testerWidth = tester.offsetWidth;
	var testerHeight = tester.offsetHeight;
	var testerRight = testerLeft + testerWidth;
	var testerBottom = testerTop + testerHeight;
	
	var targetLeft = target.offsetLeft;
	var targetTop = target.offsetTop;
	var targetWidth = target.offsetWidth;
	var targetHeight = target.offsetHeight;
	var targetRight = targetLeft + targetWidth;
	var targetBottom = targetTop + targetHeight;	

	return(!(targetLeft > testerRight || 
           targetRight < testerLeft || 
           targetTop > testerBottom ||
           targetBottom < testerTop));
	
}


function collisionTests(tester, targetArray){
	var test = false;
	
	var testerLeft = tester.offsetLeft;
	var testerTop = tester.offsetTop;
	var testerWidth = tester.offsetWidth;
	var testerHeight = tester.offsetHeight;
	var testerRight = testerLeft + testerWidth;
	var testerBottom = testerTop + testerHeight;
	
	var max = targetArray.length;
	var i = 0;
	
	for(i=0; i<max; i++){
		var target = targetArray[i];
		var targetLeft = target.offsetLeft;
		var targetTop = target.offsetTop;
		var targetWidth = target.offsetWidth;
		var targetHeight = target.offsetHeight;
		var targetRight = targetLeft + targetWidth;
		var targetBottom = targetTop + targetHeight;	
		test = !(targetLeft > testerRight || 
           targetRight < testerLeft || 
           targetTop > testerBottom ||
           targetBottom < testerTop);
		if(test){
			break;
		}
	} 
	return(test);
}
