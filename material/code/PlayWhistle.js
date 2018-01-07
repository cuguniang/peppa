/*
Function  :故事背景
Author    :醋姑娘
Build_Date:2017-12-04
Version   :1.0
*/

var PlayWhistle = (function() {

	var flag = false;//当flag为false时要立刻停止动画+回到主界面
	var isOnBackbt = false;
	var whistle = document.getElementById("whistle");
	var bubble = document.getElementById("bubble");
	var pauseCircle = new Image();
	var backbt = new Array(2);
	var whistleP = {x1:0,y1:68.75,x2:0+1000,y2:68.75+562.5};
	var backbtP = {x1:800,y1:640,x2:800+120,y2:640+50};

	function nextVideoFrame() {	
		if(!flag) return;//按下返回键后无条件停止
		
		if(!whistle.ended){
			ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
			ctx.fillRect(0, 0, iCanvasWidth, iCanvasHeight);//黑底背景
			ctx.drawImage(whistle, 0, 68.75,1000,562.5);
			if(whistle.paused){ctx.drawImage(pauseCircle,350,200,300,300);}
			ctx.drawImage(backbt[isOnBackbt?1:0],backbtP.x1,backbtP.y1,backbtP.x2-backbtP.x1,backbtP.y2-backbtP.y1);
			requestNextAnimationFrame(nextVideoFrame);
		}
	}
	function onMousemoveInPlayWhistle(event){

		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);

		if(now.x > whistleP.x1 && now.x < whistleP.x2 && now.y > whistleP.y1 && now.y < whistleP.y2){
			//视频区域
			canvas.style.cursor = "pointer";
			return;
		}
		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			//返回按钮
			isOnBackbt = true;
			canvas.style.cursor = "pointer";
		}
		else {
			isOnBackbt = false;
			canvas.style.cursor = "default";
		}
	}
	function onClickInPlayWhistle(event) {

		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);

		if(now.x > whistleP.x1 && now.x < whistleP.x2 && now.y > whistleP.y1 && now.y < whistleP.y2 ){
			//继续播放
			if(whistle.paused){whistle.play();}
			//暂停视频
			else{whistle.pause();}
			return;
		}

		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			//返回主界面
			canvas.removeEventListener("click",onClickInPlayWhistle);
			canvas.removeEventListener("mousemove",onMousemoveInPlayWhistle);
			flag = false;
			bubble.load();
			whistle.pause();
			bubble.play();
			START();
		}
	}

	function play(canvas){
		flag = true;
		isOnBackbt = false;

		canvas.style.border = "dashed 15px";

		whistle.load();
		whistle.play();

		canvas.addEventListener("click",onClickInPlayWhistle);
		canvas.addEventListener("mousemove",onMousemoveInPlayWhistle);
		
		requestNextAnimationFrame(nextVideoFrame);
	}
	//为图片设置数据源
	pauseCircle.src = "material/image/pic/pause.png";
	for(var i = 0;i<2;i++){backbt[i] = new Image();backbt[i].src = "material/image/button/backbt" + i + ".png";	}

	return {play:play};

})();
