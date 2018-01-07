/*
	Function  :学习模式
	Author    :醋姑娘
	Build_Date:2017-12-04
	Version   :1.0
*/

var STUDY=(function(){

	var bgm = document.getElementById("bgm");
	var bubble = document.getElementById("bubble");

	var flag = false;//总控制flag为false时要回主界面了
	var numbers = [];//飘动的数字
	var nowT = SCALE_5[0]; //当前播放的音
	var flags = []; //判断当前音的状态
	var lasttime = 0;
	var INTERVAL = 100;
	var isOnBackbt = false;//鼠标是否在返回按钮上
	var isOnIntrobt = false;

	var backbt = new Array(2);
	var bg = new Image();
	var introkb = new Image();
	var introbt = new Image();
	var bgmtx = new Image();
	var snow = new Image();
	var changeVolume = new Image();
	var peppas = new Array(2);
	var George = new Image();

	var backbtP = {x1:800,y1:640,x2:800+120,y2:640+50};
	var introbtP =  {x1:800,y1:50,x2:800+120,y2:50+50};
	var peppaP = {x:730,y:430,w:200,h:200};
	var peppa = peppas[0];

	var DO_CODE = 49,SI_CODE = 55,UP_CODE = 38,DOWN_CODE = 40;
	var BOUND_RECT = {x1:60,y1:135,x2:930,y2:410};//数字移动的边界
	var balls = [];
	var NUMBERS_OF_BALLS = 500;
	var ballPainter = {
			paint:function (sprite,ctx) {
				ctx.save();
				ctx.beginPath();
				ctx.arc(sprite.left,sprite.top,sprite.r,0,Math.PI*2);
				ctx.closePath();
				ctx.fillStyle = sprite.color;
				ctx.fill();
				ctx.restore();
			}
	},
	move = {
		execute:function (sprite,ctx,time) {
			sprite.left += sprite.velocityX;
			sprite.top += sprite.velocityY;
		}
	};

	
	function makeBalls(tp) {
		balls = [];
		for(var i = 0;i<NUMBERS_OF_BALLS;i++){
			var ball = new Sprite('ball',ballPainter,[move]);
			ball.left = tp. x - tp.size/3  + Math.random() * tp.size;
			ball.top = tp.y - tp.size/2 + Math.random() * tp.size;
			ball.r = 0.1;
			ball.color = tp.color;
			ball.direction = Math.random() * 2 * Math.PI;
			ball.velocityX = Math.cos(ball.direction);
			ball.velocityY = Math.sin(ball.direction);
			balls.push(ball);
		}
	}
	function drawRoundRect(){		//画一个圆角矩形
		ctx.save();
		ctx.strokeStyle = "#eee888";
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.arc(70,130,20,-0.5*Math.PI,Math.PI,true);
		ctx.lineTo(50,390);
		ctx.arc(70,390,20,Math.PI,Math.PI*0.5,true);
		ctx.lineTo(930,410);
		ctx.arc(930,390,20,Math.PI*0.5,0,true);
		ctx.lineTo(950,130);
		ctx.arc(930,130,20,0,-0.5*Math.PI,true);
		ctx.lineTo(70,110);
		ctx.stroke();
		ctx.restore();
	}
	function drawImgText(){
		ctx.drawImage(bg, 0, 0,iCanvasWidth,iCanvasHeight);
		//返回按钮
		ctx.drawImage(backbt[isOnBackbt?1:0],backbtP.x1,backbtP.y1,backbtP.x2-backbtP.x1,backbtP.y2-backbtP.y1);
		//操作指南按钮
		ctx.drawImage(introbt,introbtP.x1,introbtP.y1,introbtP.x2-introbtP.x1,introbtP.y2-introbtP.y1);
		//peppa
		ctx.drawImage(peppa,peppaP.x,peppaP.y,peppaP.w,peppaP.h);
		//George
		ctx.drawImage(George, 0, 0,George.width,George.height/2,50,70,George.width/4,George.height/8);
		ctx.drawImage(George, 0, George.height/2,George.width,George.height/2,207,68,George.width/4,George.height/8);

		//"点我播放bgm"文本图片
		ctx.drawImage(bgmtx,345,550);
		//"按下没有音效的键会出现*哦"文本图片
		ctx.drawImage(snow,140,455);
		//上下键调整bgm音量文本图片
		if(!bgm.paused)ctx.drawImage(changeVolume,638,450,100,100);

	}
	function drawProgressBar(){
		//进度条
		ctx.save();
		if(numbers.length >= 90) ctx.fillStyle = "red";//超过90时 红色警示
		ctx.font = "30px impact";
		ctx.textAlign = "center";
		ctx.strokeRect(100,500,500,30);
		if(numbers.length <= 100){
			ctx.fillRect(102,502,numbers.length*5 - 3,26);//略小于矩形外框
			ctx.fillText(numbers.length,625,527);
		}
		ctx.restore();
		
		if(numbers.length > 100) numbers.length = 0;//上限100，到100自动清空
	}
	function drawNumbersAndBalls(){
		//数字
		numbers.forEach(function(number){	
			ctx.save();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = number.size + "px fantasy";
			ctx.fillStyle = number.color;
			ctx.fillText(number.n,number.x,number.y);
			if(number.base == 2){ctx.fillText('.',number.x,number.y - number.size - 5);}
			if(number.base >= 1){ctx.fillText('.',number.x,number.y - number.size + 3);}
		    else if(number.base == -1){ctx.fillText('.',number.x,number.y + number.size/2);}
			ctx.restore();
		});
		//基于时间的运动
		var nowtime = + new Date();
		if(nowtime - lasttime >= INTERVAL){
			for(var i = 0;i<numbers.length;i++){	
				if (numbers[i].x + numbers[i].vx*(nowtime-lasttime)/1000 > BOUND_RECT.x2 || numbers[i].x + numbers[i].vx*(nowtime-lasttime)/1000 < BOUND_RECT.x1) 
					numbers.splice(i,1);
				else if (numbers[i].y + numbers[i].vy*(nowtime-lasttime)/1000  > BOUND_RECT.y2 || numbers[i].y + numbers[i].vy*(nowtime-lasttime)/1000 < BOUND_RECT.y1) 
					numbers.splice(i,1);
				else{
					numbers[i].x += numbers[i].vx*(nowtime-lasttime)/1000;
					numbers[i].y += numbers[i].vy*(nowtime-lasttime)/1000;
				}
			}
			lasttime = nowtime;
		}
		//特效balls
		for(var i = 0 ;i<balls.length;i++){
			balls[i].paint(ctx);
			balls[i].update(ctx);
			if(balls[i].left < 0 || balls[i].left > iCanvasWidth || 
				balls[i].top < 0 || balls[i].top > iCanvasHeight )
			//飘出canvas外就移除
			{balls.splice(i,1);}
		}
	}
	function studying(){
		if(!flag || isOnIntrobt) return;

		ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
		drawImgText();
		drawRoundRect();
		drawProgressBar();
		drawNumbersAndBalls();
					
		requestNextAnimationFrame(studying);
    }
    function onMousemoveInSTUDY(event){
		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);

		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			isOnBackbt = true;
			canvas.style.cursor = "pointer";
			return;
		}
		else {
			isOnBackbt = false;
			canvas.style.cursor = "default";
		}
		if(now.x > peppaP.x && now.x < peppaP.x+peppaP.w && now.y > peppaP.y && now.y < peppaP.y+peppaP.h){
			canvas.style.cursor = "pointer";
			return;
		}
		else{
			canvas.style.cursor = "default";
		}
		if(now.x > introbtP.x1 && now.x < introbtP.x2 && now.y > introbtP.y1 && now.y < introbtP.y2){
			if(!isOnIntrobt){
				isOnIntrobt = true;
				ctx.drawImage(bg,0,0,iCanvasWidth,iCanvasWidth);
				ctx.drawImage(introkb,0,150,introkb.width,introkb.height);
			}
		}
		else {
			if(isOnIntrobt){
				isOnIntrobt = false;
				requestNextAnimationFrame(studying);	
			}			
		}
	}
	function onClickInSTUDY(event) {

		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);

		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			flag = false;
			window.removeEventListener("keyup",onKeyupInSTUDY);
			window.removeEventListener("keydown",onKeydownInSTUDY);
			canvas.removeEventListener("mousemove",onMousemoveInSTUDY);
			canvas.removeEventListener("click",onClickInSTUDY);
			nowT.load();
			bgm.load();
			bubble.load();
			bubble.play();
			START();
			return;
		}
		if(now.x > peppaP.x && now.x < peppaP.x+peppaP.w && now.y > peppaP.y && now.y < peppaP.y+peppaP.h){
			if(bgm.paused){
				bgm.load();
				bgm.volume = 0.5;
				bgm.play();
			}
			else{bgm.pause();}
		}
	}
	function onKeyupInSTUDY(event) {
		flags[event.keyCode>=97?event.keyCode-48:event.keyCode] = false;
	}
	function onKeydownInSTUDY(event) {
		var hasCtrl = event.ctrlKey;//SCALE_6
		var hasAlt = event.altKey; //SCALE_7
		var keynum = event.keyCode;
		if(keynum >=97 && keynum <=103){keynum -= 48;} //实现小键盘
		var keychar = String.fromCharCode(keynum);
		//if(keynum == 48) nowT.load();//强行停止11(已删除该功能)
		if(keynum == 17||keynum == 18) return;
		
		//确定八度(对应数组)
		if(keynum >= DO_CODE && keynum <= SI_CODE ){
			if(!hasCtrl && !hasAlt){t = SCALE_5;}
			else if(hasCtrl){t = SCALE_6;}
			else {t = SCALE_7;}
		}
		else{
			t = SCALE_4;
			if(t[keychar] == null) {//except QWERTYU
				//上键加bgm的音量 下键减音量 但不能减为0
				if(keynum == UP_CODE){if(bgm.volume < 1){bgm.volume =(bgm.volume*10+1)/10.0;}}
				else if(keynum == DOWN_CODE){if(bgm.volume>=0.1){bgm.volume = (bgm.volume*10-1)/10.0;}}
				else{//无效的键 生成*
					var tp = {n:'*',
							  base :0,
							  x:Math.random() * 870 + 60,
							  y:Math.random() * 275 + 135,
							  vx:Math.random()*20*(parseInt(Math.random()*10)%2==0?1:-1),
							  vy:Math.random()*20*(parseInt(Math.random()*10)%2==0?1:-1),
							  size: Math.random() * 55 + 10,
					          color:"rgb("+ parseInt(Math.random() * 256)+ ","+parseInt(Math.random() * 256)+"," +parseInt(Math.random() * 256)};
					numbers.push(tp);
					//根据该字符生成特效
					makeBalls(tp);
				}
				return;	
			}
		}

		//播放单音+效果
		if(!flags[keynum])
		{
			if(!nowT.ended) nowT.load();
			nowT = (t == SCALE_4?t[keychar]:t[keynum-49]);
			nowT.volume = 0.4;
			nowT.play();
			flags[keynum] = true;

			var tp = {n:(t == SCALE_4?char_map[keychar]:keynum-48),
				      base :0,
					  x:Math.random() * 870 + 60,
					  y:Math.random() * 275 + 135,
				      vx:Math.random()*20*(parseInt(Math.random()*10)%2==0?1:-1),
				      vy:Math.random()*20*(parseInt(Math.random()*10)%2==0?1:-1),size: Math.random() * 55 + 10,
					  color:"rgb("+ parseInt(Math.random() * 256)+ ","+parseInt(Math.random() * 256)+"," +parseInt(Math.random() * 256)};
			if(t == SCALE_4){tp.base = -1;}
			else if(t == SCALE_6){tp.base = 1;}
			else if(t == SCALE_7){tp.base = 2;}
			numbers.push(tp);
			makeBalls(tp);
		}

	}
	function begin(canvas){
		flag = true;
		isOnIntrobt = false;
		numbers = [];
		flags = [];
		balls = [];
		lasttime = 0;
		peppa = peppas[parseInt(Math.random()*100)%2==0?1:0];
		window.addEventListener("keyup",onKeyupInSTUDY);
		window.addEventListener("keydown",onKeydownInSTUDY);
		canvas.addEventListener("mousemove",onMousemoveInSTUDY);
		canvas.addEventListener("click",onClickInSTUDY);
		requestNextAnimationFrame(studying);
	}

	//为图片设置数据源
	for(var i = 0;i<2;i++){backbt[i] = new Image();backbt[i].src = "material/image/button/backbt" + i + ".png";}
	for(var i = 0;i<2;i++){peppas[i] = new Image();peppas[i].src = "material/image/pic/peppa" + i + ".png";}
	bg.src = "material/image/pic/background.png";
	introkb.src = "material/image/pic/introkb.png";
	introbt.src = "material/image/button/introbt0.png";
	bgmtx.src = "material/image/text/bgmtx.png";
	snow.src = "material/image/text/snow.png";
	changeVolume.src = "material/image/pic/changeVolume.png";
	George.src = "material/image/pic/10George.png";

	return {begin:begin};

})();
