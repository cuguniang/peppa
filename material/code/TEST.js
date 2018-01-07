/*
	Function  :考试模式
	Author    :醋姑娘
	Build_Date:2017-12-04
	Version   :1.0
*/

var TEST = (function() {

	var balls = [];
	var NUMBER_OF_BALLS = 500;
	var ballPainter = {
		paint:function (sprite,ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(sprite.left,sprite.top,sprite.r,0,Math.PI*2);
			ctx.closePath();
			ctx.fillStyle ="#eee888";
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
	//单音 类
	function KEY(key,x,y,base,line){
		this.key = key;
		this.x = x;
		this.y = y;
		this.base = base;//0原调,1高音, -1低音
		this.line = line;
		this.isRight = false;//描边、true->fill
//		this.font = "35px Trebuchet MS";
        this.font = "35px fantasy";
}

	var keys =[];//谱子的数字 数组 存放每个单音
	//0-平凡之路
	//1-虫儿飞
	//2-小星星
	//3-同桌的你
	var compStrings = ["3366123333665543336123331444315671715665433342567171566671111256717136543326711211712171",
	"33345321112337632632632113334532111233763263263211325432543453216326521434314343121",
	"115566544332215544332554433211556654433221",
	"55553451666646555557654444443211111561132222176777771257712171"];
	var KEY_margins = ["2212221422121210223225222212202222121232122210222212123212221022221222223202232132213210",
	"21122342112230224224223102112233211223022422422310125115112122012231223111121111220",
	"222222322222202222223222222022222232222220",
	"22222233222222022222212322222202222223202223220222222302222220"];
	var KEYS_Lengths = [[16,14,16,16,13,13],
						[14,11,14,11,13,20],
						[14,14,14],
						[15,16,9,7,8,7]];//每行音符数


	var MARGIN_K = 20;//一行中单位x空间
	var MARGIN_Y = 80;//每行的距离
	var comp_begin_x = 175;
	var comp_begin_y = 215;

	var countdown = document.getElementById("countdown");
	var bubble = document.getElementById("bubble");
	var clap = document.getElementById("clap");
	var lose = document.getElementById("lose");

	var ID = null;// for countdown interval
	var cnt = 0;
	var numberWidth = 0;//谱子中一个数字的宽度
	var row_endx = [];//谱子每行最后的位置
	var moveline = {x:0,y:0,w:2,h:55,v:0,nowline:0,color:"rgba(255,0,0,0.5)",beginx:160,beginy:175,limit:0};
	
	var WrongPress = 0;//按错的个数
	var RightPress = 0;//按对的个数
	var Score = 0;

	var flag;//false-drawTestScene  true-在考试
	var pauseTest = {flag:false,count:0,limit:3};//暂停考试 只能暂停三次

	var isOnBackbt = false;//鼠标是否在返回按钮上
	var isOnTestbt = false;
	var isOnSpeedbt0 = false;
	var isOnSpeedbt1 = false;
	var isOnIntro = false;

	var peppas = new Array(2);
	var head = new Image();
	var backbt = new Array(2);
	var bg = new Image();
	var beginbt = new Array(2);
	var finishbt = new Array(2);
	var comp = new Array(4);
	var introkb = new Image();
	var introbt = new Image();
	var speedbt = new Array(2);
	var s = new Image();
	var p = new Image();
	var up = new Image();
	var down = new Image();
	var nowspeed = new Image();
	var faster = new Image();
	var slower = new Image();
	var scoretx = new Image();
	var pausetesttx = new Image();

	var peppa = peppas[0];

	var peppaP = {x:730,y:430,w:200,h:200};
	//按钮的尺寸都是120*50
	var TestbtP = {x1:80,y1:640,x2:200,y2:690};
	var backbtP = {x1:800,y1:640,x2:920,y2:690};
	var speedbtP0 = {x1:320,y1:640,x2:440,y2:690};
	var speedbtP1 = {x1:560,y1:640,x2:680,y2:690};
	var introbtP =  {x1:455,y1:25,x2:575,y2:75};
	//为图片设置数据源
	s.src = "material/image/pic/s.png";
	p.src = "material/image/pic/p.png";
	up.src = "material/image/pic/up.png";
	down.src = "material/image/pic/down.png";
	introbt.src = "material/image/button/introbt0.png";
	introkb.src = "material/image/pic/introkb.png";
	nowspeed.src = "material/image/text/nowspeed.png";
	faster.src = "material/image/text/faster.png";
	slower.src = "material/image/text/slower.png";
	scoretx.src = "material/image/text/scoretx.png";
	pausetesttx.src = "material/image/text/pauseTest.png";
	bg.src = "material/image/pic/background.png";
	head.src = "material/image/pic/prohead.png";
	for(var i = 0 ;i<2;i++){
		speedbt[i] = new Array(2);
		for(var j = 0;j<2;j++){speedbt[i][j] = new Image();speedbt[i][j].src = "material/image/button/speedbt" + i + j + ".png";}
	}
	for(var i =0 ;i<comp.length;i++){comp[i] = new Image();comp[i].src = "material/image/pic/cmp"+ i+".png";}
	for(var i = 0;i<2;i++){finishbt[i] = new Image();finishbt[i].src = "material/image/button/finishbt" + i + ".png";}
	for(var i = 0;i<2;i++){beginbt[i] = new Image();beginbt[i].src = "material/image/button/beginbt" + i + ".png";}
	for(var i = 0;i<2;i++){backbt[i] = new Image();backbt[i].src = "material/image/button/backbt" + i + ".png";}
	for(var i = 0;i<2;i++){peppas[i] = new Image();peppas[i].src = "material/image/pic/peppa" + i + ".png";}


	var nowT = SCALE_5[0]; //当前播放的音
	var flags = []; //判断当前音的状态
	var DO_CODE = 49,SI_CODE = 55,UP_CODE = 38,DOWN_CODE = 40;
	function makeBalls(tp){
		balls = [];
		for(var i = 0;i<NUMBER_OF_BALLS;i++){
			var ball = new Sprite('ball',ballPainter,[move]);
			ball.left = tp.x - 5 + Math.random()*30;
			ball.top = tp.y - 25 + Math.random()*30;
			ball.r = 0.1;
			ball.color = tp.color;
			ball.direction = Math.random() * 2 * Math.PI;
			ball.velocityX = Math.cos(ball.direction);
			ball.velocityY = Math.sin(ball.direction);
			balls.push(ball);
		}
	}
	function drawBalls(){
		for(var i = 0 ;i<balls.length;i++){
			balls[i].paint(ctx);
			balls[i].update(ctx);
			if(balls[i].left < 0 || balls[i].left >iCanvasWidth || 
				balls[i].top < 0 || balls[i].top > iCanvasHeight )
			//飘出canvas外就移除
			{balls.splice(i, 1);}
		}
	}
	function initComp(randomk) {
		//初始化考试曲目keys
		keys = [];
		var compString = compStrings[randomk];
		var KEYS_Length = KEYS_Lengths[randomk];
		var KEY_margin = KEY_margins[randomk];
		moveline.limit = KEYS_Length.length;
		//临时变量
		var i = 0;
		var k = KEYS_Length[0];
		var j = 0;
		var tpx = comp_begin_x;
		var tpy = comp_begin_y;
		if(randomk==0){//平凡之路
			for(i = 0,k = KEYS_Length[j++];i<k;i++){//1
				keys[i] = new KEY(compString[i],tpx,tpy,0,j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}	
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//2
				keys[i] = new KEY(compString[i],tpx,tpy,0,j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//3
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] == '1'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//4
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <'3'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//5
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i]=='1' || i >=68 ?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//6
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i]>'3'?0:1),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
		}
		else if(randomk==1){//虫儿飞
			for(i = 0,k = KEYS_Length[j++];i<k;i++){//1
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] == '7'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}	
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//2
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] =='6'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//3
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] == '7'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//4
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] == '6'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//5
				keys[i] = new KEY(compString[i],tpx,tpy,0,j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//6
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i]>='5'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
		}
		else if(randomk==2){//小星星
			i = 0;
			k = KEYS_Length[0];
			for(var r = 0;r<3;r++){
				for(;i<k;i++){
					keys[i] = new KEY(compString[i],tpx,tpy,0,j);
					tpx += (KEY_margin[i] - '0')*MARGIN_K;
				}
				row_endx[j] = tpx + 80;
				k += KEYS_Length[j++];
				tpx = comp_begin_x;
				tpy += MARGIN_Y;
			}
		}
		else if(randomk==3){//同桌的你
			for(i = 0,k = KEYS_Length[j++];i<k;i++){//1
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] == '1'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}	
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//2
				keys[i] = new KEY(compString[i],tpx,tpy,0,j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//3
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <='3'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//4
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//5
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//6
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
		}
		else if(randomk == 4){//同桌的你
			for(i = 0,k = KEYS_Length[j++];i<k;i++){//1
				keys[i] = new KEY(compString[i],tpx,tpy,(i == 7?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}	
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//2
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] =='5'?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//3
				keys[i] = new KEY(compString[i],tpx,tpy,(i==24||i==32?-1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//4
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//5
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
			for(k += KEYS_Length[j++],tpx = comp_begin_x,tpy += MARGIN_Y;i<k;i++){//6
				keys[i] = new KEY(compString[i],tpx,tpy,(compString[i] <= '2'?1:0),j-1);
				tpx += (KEY_margin[i] - '0')*MARGIN_K;
			}
			row_endx[j-1] = tpx + 80;
		}
		ctx.save();
		ctx.font = keys[0].font;
		numberWidth = ctx.measureText("8").width;
		ctx.restore();
	}
	function onMousemoveInTEST(event){
		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);
		//返回
		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			if(!isOnBackbt && !flag){isOnBackbt = true;drawTestScene();}
			isOnBackbt = true;
			canvas.style.cursor = "pointer";
			return;
		}
		else {
			if(isOnBackbt && !flag){isOnBackbt = false;drawTestScene();}
			isOnBackbt = false;
			canvas.style.cursor = "default";
		}
		//开始考试
		if(now.x > TestbtP.x1 && now.x < TestbtP.x2 && now.y > TestbtP.y1 && now.y < TestbtP.y2){
			if(!isOnTestbt && !flag){isOnTestbt = true;drawTestScene();}
			isOnTestbt = true;
			canvas.style.cursor = "pointer";
			return;
		}
		else {
			if(isOnTestbt && !flag){isOnTestbt = false;drawTestScene();}
			isOnTestbt = false;
			canvas.style.cursor = "default";
		}
		//加速
		if(now.x > speedbtP0.x1 && now.x < speedbtP0.x2 && now.y > speedbtP0.y1 && now.y < speedbtP0.y2){
			if(!isOnSpeedbt0 && !flag){isOnSpeedbt0 = true;drawTestScene();}
			isOnSpeedbt0 = true;
			canvas.style.cursor = "pointer";
			return;
		}
		else {
			if(isOnSpeedbt0 && !flag){isOnSpeedbt0 = false;drawTestScene();}
			isOnSpeedbt0 = false;
			canvas.style.cursor = "default";
		}
		//减速
		if(now.x > speedbtP1.x1 && now.x < speedbtP1.x2 && now.y > speedbtP1.y1 && now.y < speedbtP1.y2){
			if(!isOnSpeedbt1 && !flag){isOnSpeedbt1 = true;drawTestScene();}
			isOnSpeedbt1 = true;
			canvas.style.cursor = "pointer";
			return;
		}
		else {
			if(isOnSpeedbt1 && !flag){isOnSpeedbt1 = false;drawTestScene();}
			isOnSpeedbt1 = false;
			canvas.style.cursor = "default";
		}
		//暂停考试
		if(flag && now.x > peppaP.x && now.x < peppaP.x+peppaP.w && now.y > peppaP.y && now.y < peppaP.y+peppaP.h){
			canvas.style.cursor = "pointer";
		}
		else {
			canvas.style.cursor = "default";
		}
		//操作指南
		if(now.x > introbtP.x1 && now.x < introbtP.x2 && now.y > introbtP.y1 && now.y < introbtP.y2){
			isOnIntro = true;
			ctx.clearRect(0,0,iCanvasWidth,iCanvasWidth);
			ctx.drawImage(bg,0,0,iCanvasWidth,iCanvasWidth);
			ctx.drawImage(introkb,0,150,introkb.width,introkb.height);
		}
		else{
			if(isOnIntro && !flag){isOnIntro = false;drawTestScene();}
			if(isOnIntro && flag) {isOnIntro = false;requestNextAnimationFrame(onTesting);}
			isOnIntro = false;
		}
	}
	function onClickInTEST(event) {

		var now = {x:event.clientX,y:event.clientY};
		now = Coordinate(canvas,now);
		//返回
		if(now.x > backbtP.x1 && now.x < backbtP.x2 && now.y > backbtP.y1 && now.y < backbtP.y2){
			
			clap.load();
			lose.load();
			nowT.load();
			bubble.load();
			countdown.load();
			bubble.play();
			flag = false;
			canvas.removeEventListener("mousemove",onMousemoveInTEST);
			canvas.removeEventListener("click", onClickInTEST);
			window.removeEventListener("keyup",onKeyupInTEST);
			window.removeEventListener("keydown",onKeydownInTEST);
			START();
			return;
		}
		//还没开始考试
		if(!flag){
			//开始考试
			if(now.x > TestbtP.x1 && now.x < TestbtP.x2 && now.y > TestbtP.y1 && now.y < TestbtP.y2){
				beginTest();
			}
			//加速
			else if(now.x > speedbtP0.x1 && now.x < speedbtP0.x2 && now.y > speedbtP0.y1 && now.y < speedbtP0.y2){
				if(moveline.v<=2.0){
					moveline.v += 0.1;
					drawTestScene();
				}	
			}
			//减速
			else if(now.x > speedbtP1.x1 && now.x < speedbtP1.x2 && now.y > speedbtP1.y1 && now.y < speedbtP1.y2){
				if(moveline.v>=0.2){
					moveline.v -= 0.1;
					drawTestScene();
				}
			}
		}
		//考试中
		else{
			//结束考试
			if(now.x > TestbtP.x1 && now.x < TestbtP.x2 && now.y > TestbtP.y1 && now.y < TestbtP.y2){
				finishTest();
			}
			//加速p
			else if(now.x > speedbtP0.x1 && now.x < speedbtP0.x2 && now.y > speedbtP0.y1 && now.y < speedbtP0.y2){
				if(moveline.v<=2.0)
					moveline.v += 0.1;
			}
			//减速
			else if(now.x > speedbtP1.x1 && now.x < speedbtP1.x2 && now.y > speedbtP1.y1 && now.y < speedbtP1.y2){
				if(moveline.v>=0.2)
					moveline.v -= 0.1;
			}
		    //暂停考试
		    else if(now.x > peppaP.x && now.x < peppaP.x+peppaP.w && now.y > peppaP.y && now.y < peppaP.y+peppaP.h){
				//最多暂停pauseTest.count次
				if(pauseTest.count == pauseTest.limit  && !pauseTest.flag) return;
				pauseTest.flag = !pauseTest.flag;
				pauseTest.count += pauseTest.flag?1:0;
			}
		}
	}
	function onKeyupInTEST(event) {
		flags[event.keyCode>=97?event.keyCode-48:event.keyCode] = false;
	}
	function onKeydownInTEST(event) {
		var keynum = event.keyCode;
		if(keynum >= 97 && keynum <=103){keynum -= 48;}//小键盘的1-7转换为全键盘的1-7
		var keychar = String.fromCharCode(keynum);
		//未开始考试
		if(!flag){
			//s快捷键 - 开始考试
			if(keychar == 'S'){
				beginTest();
			}
			//按上键快捷键 - 加速
			else if(keynum == UP_CODE){
				if(moveline.v<2.0){moveline.v+=0.1;drawTestScene();}
			}
			//按下键快捷键 - 减速
			else if(keynum == DOWN_CODE){
				if(moveline.v>=0.2){moveline.v-=0.1;drawTestScene();}
			}
			return;
		}
		//考试进行中
		var hasCtrl = event.ctrlKey;//SCALE_6
		var hasAlt = event.altKey; //SCALE_7
		if(keynum == 17 || keynum == 18) return;//ctrl和alt键
		//??????奇怪的处理组合键的姿势

		//确定八度
		if(keynum >=DO_CODE && keynum <= SI_CODE){
			if(!hasCtrl && !hasAlt){t = SCALE_5;}
			else if(hasCtrl){t = SCALE_6;}
			else {t = SCALE_7;}
		}
		else{
			t = SCALE_4;
			//如果按到别的键，判断是否为快捷键并作出相应，否则return掉（不然会造成无法继续游戏）
			if(t[keychar] == null){
				//按下快捷键的行为和click一模一样
				//这里好像有个语句能模拟事件发生....
				if(keychar == 'P'){//增加了按p暂停考试
					if(pauseTest.count == pauseTest.limit && !pauseTest.flag) return;
					pauseTest.flag = !pauseTest.flag;
					pauseTest.count += pauseTest.flag?1:0;
				}
				else if(keychar == 'S'){
					finishTest();
				}
				else if(keynum == 38){
					if(moveline.v<2.0)moveline.v+=0.1;
				}
				else if(keynum == 40){
					if(moveline.v>=0.2)moveline.v-=0.1;
				}
				//如果不是快捷键，且在进行考试，WrongPress+1再return掉
				else{
					if(!pauseTest.flag) 
						WrongPress++;
				}
				return;
			}
		}	
		//播放单音
		if(!flags[keynum])
		{
			if(!nowT.end)nowT.load();
			nowT = (t == SCALE_4?t[keychar]:t[keynum-49]);
			nowT.play();
			flags[keynum] = true;
		}	
		//计分			
		if(flag && !pauseTest.flag){//如果在考试状态且没有暂停
			var gt = whichKey(moveline);
			if(gt == null) {
				WrongPress++;
				return;
			}
			if(keychar == gt.key || char_map[keychar] == gt.key && gt.base == -1){
				if(!gt.isRight){//如果是第一次弹对才加分
					if((t==SCALE_4 && gt.base == -1)||hasCtrl === (gt.base == 1)) {//同一个八度
						gt.isRight = true;
						makeBalls(gt);
						RightPress++;
					}else WrongPress++;
				}else WrongPress++;
			}else WrongPress++;
		}	
	}
	function drawComp(k){
		//参数k是第k首考试曲目
		//考试曲目信息图片
		ctx.drawImage(comp[k],40,20,380,600);
		//遍历keys数组并画出其中元素
		keys.forEach(function(key){
			ctx.save();
			ctx.font = key.font;
			if(key.base == 1) {//画高音点
				if(key.isRight){ctx.fillText('.',key.x+3,key.y-parseInt(key.font));}
				else {ctx.strokeText('.',key.x+3,key.y-parseInt(key.font));}
			}
			else if(key.base == -1){//画低音点
				if(key.isRight){ctx.fillText('.',key.x+3,key.y+parseInt(key.font)/2-5);}
				else {ctx.strokeText('.',key.x+3,key.y+parseInt(key.font)/2-5);}
			}
			//弹对填充 弹错和未弹是描边
			if(key.isRight){ctx.fillText(key.key,key.x,key.y);}
			else {ctx.strokeText(key.key,key.x,key.y);}
			ctx.restore();
			//测试范围判定（删）
			//ctx.strokeRect(key.x,key.y,numberWidth,35);
		});
	}
	function drawMoveline(){
		//"当前速度："文本图片
		ctx.drawImage(nowspeed,450,70);
		//显示速度，保留一位小数
		ctx.save();
		ctx.fillStyle = "#725e5e";
		ctx.font = "40px Trebuchet MS";
		ctx.fillText(parseInt(moveline.v*10)/10,700,114);
		//调速度有上下限0.1-2.0
		//当前速度=0.1时给出反馈"不能再慢了" 
		if(parseInt(moveline.v*10)/10 == 0.1){
			ctx.drawImage(slower,480,135);
		}
		//当前速度=2时给出反馈"不能再快了" 
		if(parseInt(moveline.v*10)/10 == 2){
			ctx.drawImage(faster,480,135);
		}
		ctx.restore();
		//画moveline
		ctx.save();
		ctx.fillStyle = moveline.color;
		//ctx.globalAlpha = 0.8;
		ctx.drawImage(head, moveline.x-13, moveline.y+12,20,28);

		//ctx.fillRect(moveline.x,moveline.y,moveline.w,moveline.h);
		ctx.restore();
	}
	function updateMoveline(){
		if(!pauseTest.flag){
			moveline.x += moveline.v;
			//如果到达该行的末尾，换到下一行
			if(moveline.x > row_endx[moveline.nowline]){
				moveline.x = moveline.beginx;
				moveline.nowline++;
				moveline.y += MARGIN_Y;
			}
		}
	}
	function showScore(){
		var info = "";//结束考试后显示的信息
		ctx.save();
		ctx.font = "80px Trebuchet MS";
		ctx.fillStyle = "#eee888";
		//"考试成绩："文本图片
		ctx.drawImage(scoretx,800,56);
		//下限0分
		Score = Math.max(0,parseInt(100/compStrings[RANDOM_K].length*RightPress-50/compStrings[RANDOM_K].length*WrongPress));
		//计算小数点后一位数字
		var pointnum = Math.max(0,parseInt(1000/compStrings[RANDOM_K].length*RightPress-500/compStrings[RANDOM_K].length*WrongPress))%10;
		//如果有小数的话，将小数显示为较小字体，并根据整数的位数改变分数的位置（美观）
		if(Score == 100){
			ctx.fillStyle = "red";
			ctx.fillText(Score,795,160);
		}
		else if(Score < 10){
			ctx.fillText(Score,pointnum!=0?830:870,160);
			ctx.save();
			ctx.font = "50px Trebuchet MS";
			if(pointnum!=0){ctx.fillText("."+ pointnum,875,160);}
			ctx.restore();
		}
		else{
			ctx.fillText(Score,pointnum!=0?790:820,160);
			ctx.save();
			ctx.font = "50px Trebuchet MS";
			if(pointnum!=0){ctx.fillText("."+ pointnum,875,160);}
			ctx.restore();
		}
		
		if(!flag){//结束考试后才会分等级显示文字
			if(Score == 100) info = "Crazy!!";
			else if(Score >= 90) info = "Excellent!";
			else if(Score >= 80) info = "Great!";
			else if(Score >= 70) info = "Good!";
			else if(Score >= 60) info = "Pass";
			else {info = "Poor :(";}

			ctx.textAlign = "center";
			ctx.font = "40px Trebuchet MS";
			ctx.fillText(info,880,210);
		}
			ctx.restore();
	}
	function whichKey(moveline){
		//返回当前moveline在谱子的哪个key上
		for(var i = 0;i<keys.length;i++)
		{
			if( (keys[i].line == moveline.nowline) && moveline.x+moveline.w >= keys[i].x && moveline.x <= keys[i].x + numberWidth ){
				return keys[i];
			}
		}
		//如果在空白处，返回null
		return null;
	}
	function drawTestScene(){
		ctx.clearRect(0,0,iCanvasWidth,iCanvasHeight);
		//背景
		ctx.drawImage(bg,0,0,iCanvasWidth,iCanvasHeight);
		//peppa
		ctx.drawImage(peppa,peppaP.x,peppaP.y,peppaP.w,peppaP.h);
		if(flag){
			//"点我暂停考试"文本图片和p 
			ctx.drawImage(pausetesttx,760,330);
			ctx.drawImage(p,865,300,30,30);
			//暂停次数cnt/limit
			ctx.save();
			ctx.fillStyle = "#eee888";
			ctx.font = "38px Trebuchet MS";
			ctx.fillText(pauseTest.count+ "/"+pauseTest.limit,795,415);
			ctx.restore();
		}
		//返回按钮
		ctx.drawImage(backbt[isOnBackbt?1:0],backbtP.x1,backbtP.y1,backbtP.x2-backbtP.x1,backbtP.y2-backbtP.y1);
		//开始/结束考试按钮和s
		ctx.drawImage(s,45,650,30,30);
		if(flag) ctx.drawImage(finishbt[isOnTestbt?1:0],TestbtP.x1,TestbtP.y1,TestbtP.x2-TestbtP.x1,TestbtP.y2-TestbtP.y1);
		else ctx.drawImage(beginbt[isOnTestbt?1:0],TestbtP.x1,TestbtP.y1,TestbtP.x2-TestbtP.x1,TestbtP.y2-TestbtP.y1);
		//加速按钮和↑
		ctx.drawImage(up,285,650,30,30);
		ctx.drawImage(speedbt[0][isOnSpeedbt0?1:0],speedbtP0.x1,speedbtP0.y1,speedbtP0.x2-speedbtP0.x1,speedbtP0.y2-speedbtP0.y1);
		//减速按钮和↓
		ctx.drawImage(down,525,650,30,30);		
		ctx.drawImage(speedbt[1][isOnSpeedbt1?1:0],speedbtP1.x1,speedbtP1.y1,speedbtP1.x2-speedbtP1.x1,speedbtP1.y2-speedbtP1.y1);
		//操作指南按钮
		ctx.drawImage(introbt,introbtP.x1,introbtP.y1,introbtP.x2-introbtP.x1,introbtP.y2-introbtP.y1);

		drawMoveline();
		drawComp(RANDOM_K);
		if(cnt!=0)showScore();
	}
	function onTesting(){
		if(!flag || isOnIntro) return;

		drawTestScene();
		drawBalls();
		//自然情况下的考试deadline
		if(moveline.nowline < moveline.limit){
			updateMoveline();
			requestNextAnimationFrame(onTesting);
		}
		else {
			moveline.y = moveline.beginy;
			finishTest();
		}
	}
	function initTestScene(canvas){

		flag = false;
		cnt = 0;//已经考完额次数（0次的时候不显示分数,否则显示上一次的分数）
	    isOnBackbt = false;//鼠标是否在返回按钮上
		peppa = peppas[parseInt(Math.random()*100)%2==0?1:0];

		moveline.x = moveline.beginx - 35;
		moveline.y = moveline.beginy;
		moveline.v = 1.0;
		moveline.nowline = 0;
		for(var i = 0;i<keys.length;i++){keys[i].isRight = false;}
		//随机生成考试曲目
		RANDOM_K = parseInt(Math.random()*compStrings.length);
		initComp(RANDOM_K);
		flags = [];
		drawTestScene();
		canvas.addEventListener("mousemove",onMousemoveInTEST);
		canvas.addEventListener("click", onClickInTEST);
		window.addEventListener("keyup",onKeyupInTEST);
		window.addEventListener("keydown",onKeydownInTEST);
	}

	function beginTest(){
		flag = true;
		moveline.x = moveline.beginx - 35;
		moveline.y = moveline.beginy;
		moveline.nowline = 0;
		cnt++;
		clap.load();
		lose.load();
		bubble.load();
		countdown.load();
		countdown.play();
		drawTestScene();
		pauseTest.flag = false;
		pauseTest.count = 0;
		WrongPress = 0;
		RightPress = 0;
		for(var i = 0;i<keys.length;i++){keys[i].isRight = false;}
			
		pauseTest.flag = true;
		ID = setTimeout(function(){pauseTest.flag = false;},3500);

		requestNextAnimationFrame(onTesting);	
	}
	function finishTest(){
		moveline.nowline = 0;
		flag = false;
		countdown.load();
		if(ID) clearTimeout(ID);
		if(Score >= 60){clap.load();clap.play();}//pass及以上才有掌声
		else{lose.load();lose.play();}
		drawTestScene();
	}
	return {init:initTestScene};


})();
