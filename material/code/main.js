/*
	Function  :Start
	Author    :醋姑娘
	Build_Date:2017-12-04
	Version   :1.0
	*/

//1. 公共变量声明块........................................................
var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

var iCanvasWidth = canvas.width,
iCanvasHeight = canvas.height;

var nowScene = 0; //[0,3]当前canisvas所绘制startimg标号 
var INTERVAL = 100;
var radius = 0;
var startimg = [];

//三个按钮在canvas上的位置大小
var startP = {x1:218,y1:615,x2:218+143,y2:615+52};//study:218,615  x依次+17 y w h不变

var bubble = document.getElementById("bubble");//点击按钮的音效

//淡入行为
var fadeIn = {
	lastT :0,
	execute: function (sprite, ctx,time) {
		var nowT = +new Date();
		if(nowT - this.lastT >= time){
			ctx.globalAlpha = parseInt(ctx.globalAlpha*10+1)/10;
			this.lastT = nowT;
		}
	}
},
	//创建初始化界面的精灵,实现淡入效果
	startbg = new Sprite('startbg',{paint:function () {
		ctx.drawImage(startimg[0], 0, 0,iCanvasWidth,iCanvasHeight);
	}},[fadeIn]);
//2. 函数定义块..........................................................
function START() {//主界面

	nowScene = 0;

	canvas.style.border = "solid 3px";

	ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
	ctx.drawImage(startimg[0], 0, 0,iCanvasWidth,iCanvasHeight);

	canvas.addEventListener("mousemove",onMousemoveStart);
	canvas.addEventListener("click",onClickStart);
	//
	canvas.addEventListener("touchstart", onTouchStart);
}
function startFadein() {
	
	ctx.save();
	ctx.beginPath();
	ctx.arc(iCanvasWidth/2,iCanvasHeight/2,radius,0,Math.PI*2);
	ctx.clip();
	radius+=20;
	ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
	startbg.paint(ctx);
	ctx.restore();
	if(ctx.globalAlpha < 1) startbg.update(ctx,INTERVAL);
	if(radius <= 650 || ctx.globalAlpha < 1) requestNextAnimationFrame(startFadein);
	
	//圆圈已填充满屏幕 && 完成淡入 
	else{START();}//主界面功能
}
function Coordinate(canvas,point) {
	//坐标转换
	var box = canvas.getBoundingClientRect();
	var canvasStyle = window.getComputedStyle(canvas);

	point.x -= box.left;
	point.y -= box.top;
	
	point.x -= parseFloat(canvasStyle["borderLeft"]);
	point.y -= parseFloat(canvasStyle["borderTop"]);

	point.x -= parseFloat(canvasStyle["padding-left"]);
	point.y -= parseFloat(canvasStyle["padding-top"]);
	
	var xRatio = canvas.width/parseFloat(canvasStyle["width"]);
	var yRatio = canvas.height/parseFloat(canvasStyle["height"]);

	point.x *= xRatio;
	point.y *= yRatio;
	
	return point;

}
function setShadow(ctx,x,y,blur,color) {
	ctx.shadowOffsetX = x;
	ctx.shadowOffsetY = y;
	ctx.shadowBlur = blur;
	ctx.shadowColor = color;
}
//3. 事件注册块...........................................................
function onMousemoveStart(event) {

	var now = {x:event.clientX,y:event.clientY};
	now = Coordinate(canvas,now);
	
	for(var i = 0;i<=2;i++){//判断鼠标当前在哪个按钮上
		if(now.x > startP.x1+i*217 && now.x < startP.x2+i*217 && now.y > startP.y1 && now.y < startP.y2){
			if(nowScene!= i+1){
				nowScene = i+1;
				ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
				ctx.drawImage(startimg[i+1],0,0,iCanvasWidth,iCanvasHeight);
				canvas.style.cursor = "pointer";
			}
			return;
		}
	}
	if(nowScene!=0){
		nowScene = 0;
		ctx.clearRect(0, 0, iCanvasWidth, iCanvasHeight);
		ctx.drawImage(startimg[0],0,0,iCanvasWidth,iCanvasHeight);
		canvas.style.cursor = "default";
	}	
}
function onClickStart(event) {

	var now = {x:event.clientX,y:event.clientY};
	now = Coordinate(canvas,now);

	for(var i = 0;i<=2;i++){//判断鼠标当前在哪个按钮上
		if(now.x > startP.x1+i*217 && now.x < startP.x2+i*217 && now.y > startP.y1 && now.y < startP.y2){
			canvas.style.cursor = "default";
			//有效点击 -> 音效
			bubble.load();
			bubble.play();

			if(i==0){STUDY.begin(canvas);}//进入学习模式
			else if(i==1){PlayWhistle.play(canvas);}//进入故事背景
			else if(i==2){TEST.init(canvas);}//进入考试模式

			canvas.removeEventListener("mousemove",onMousemoveStart);
			canvas.removeEventListener("click",onClickStart);
			canvas.removeEventListener("touchstart",onTouchStart);
			return;
		}
	}
}
function onTouchStart(event){
	
	var point = {x:event.touches[0].clientX,y:event.touches[0].clientY};
	
	{PlayWhistle.play(canvas);}
	
}
//4. 初始化块............................................................
for(var i = 0;i<4;i++){
	startimg[i] = new Image();
	startimg[i].src = "material/image/pic/start" + i + ".png";
}
startimg[0].onload = function(){ //初始化界面
	//alert("为保证游戏效果，请使用Chrome浏览器。");
	ctx.globalAlpha = 0;
	radius = 0;
	requestNextAnimationFrame(startFadein);//淡入进入主界面
}

