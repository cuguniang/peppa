/*
	Function  :SCALE_4/5/6/7
	Author    :醋姑娘
	Build_Date:2017-12-04
	Version   :1.0
	*/

//1. 公共变量声明块........................................................

var SCALE_4 =  {'Q':document.getElementById("DO4"),
				'W':document.getElementById("RE4"),
				'E':document.getElementById("MI4"),
				'R':document.getElementById("FA4"),
				'T':document.getElementById("SO4"),
				'Y':document.getElementById("LA4"),
				'U':document.getElementById("SI4")};

var char_map = {'Q':1,'W':2,'E':3,'R':4,'T':5,'Y':6,'U':7};

var SCALE_5 = new Array(document.getElementById("DO5"),
						document.getElementById("RE5"),
						document.getElementById("MI5"),
						document.getElementById("FA5"),
						document.getElementById("SO5"),
						document.getElementById("LA5"),
						document.getElementById("SI5"));

var SCALE_6 = new Array(document.getElementById("DO6"),
						document.getElementById("RE6"),
						document.getElementById("MI6"),
						document.getElementById("FA6"),
						document.getElementById("SO6"),
						document.getElementById("LA6"),
						document.getElementById("SI6"));

var SCALE_7 = new Array(document.getElementById("DO7"),
						document.getElementById("RE7"),
						document.getElementById("MI7"),
						document.getElementById("FA7"),
						document.getElementById("SO7"),
						document.getElementById("LA7"),
						document.getElementById("SI7"));

//引入图片
//1.返回按钮
//var backbt = new Array(2);
//for(var i = 0;i<2;i++){
//	backbt[i] = new Image();
//	backbt[i].src = "material/image/button/backbt" + i + ".png";
//}
//2.渐变背景图
//var bg = new Image();
//bg.src = "material/image/pic/background.png";
//3.初始界面背景 4张 
//var startimg = new Array(4);
//for(var i = 0;i<4;i++){
//	startimg[i] = new Image();
//	startimg[i].src = "material/image/pic/start" + i + ".png";
//}
//4.视频暂停时候的图标
//var pauseCircle = new Image();
//pauseCircle.src = "material/image/pic/pause.png";
//5.peppa
//var peppas = new Array(2);
//for(var i = 0;i<2;i++){
//	peppas[i] = new Image();
//	peppas[i].src = "material/image/pic/peppa" + i + ".png";
//}
//var George = new Image();
//George.src = "material/image/pic/10George.png";
//var head = new Image();
//head.src = "material/image/pic/prohead.png";
//6.piano 
//var piano = new Image();
//piano.src = "material/image/pic/introkb.png";
//7.beginbt
//var beginbt = new Array(2);
//for(var i = 0;i<2;i++){
//	beginbt[i] = new Image();
//	beginbt[i].src = "material/image/button/beginbt" + i + ".png";
//}
//8.finishbt
//var finishbt = new Array(2);
//for(var i = 0;i<2;i++){
//	finishbt[i] = new Image();
//	finishbt[i].src = "material/image/button/finishbt" + i + ".png";
//}
//9.考试曲目
//var comp = new Array(4);
//for(var i =0 ;i<comp.length;i++){
//	comp[i] = new Image();
//	comp[i].src = "material/image/pic/cmp"+ i+".png";
//}


//9.操作指南
//var introkb = new Image();
//introkb.src = "material/image/pic/introkb.png";
//10.加速减速[i][j] i0加速 i1减速 j0棕色 j1黄色
//var speedbt = new Array(2);
//for(var i = 0 ;i<2;i++){
//	speedbt[i] = new Array(2);
//	for(var j = 0;j<2;j++){
//		speedbt[i][j] = new Image();
//		speedbt[i][j].src = "material/image/button/speedbt" + i + j + ".png";
//	}
//}
//11.操作指南bt
//var introbt = new Image();
//introbt.src = "material/image/button/introbt0.png";
//12.bgmbt
//var bgmtx = new Image();
//bgmtx.src = "material/image/text/bgmtx.png";
//13.speedtx
//var nowspeed = new Image();
//nowspeed.src = "material/image/text/nowspeed.png";
////14."不能更快/慢"文本
//var faster = new Image();
//faster.src = "material/image/text/faster.png";
//var slower = new Image();
//slower.src = "material/image/text/slower.png";
////15.考试成绩
//var scoretx = new Image();
//scoretx.src = "material/image/text/scoretx.png";
////16.*
//var stx = new Image();
//stx.src = "material/image/text/stx.png";
//17.点我暂停考试
//var pausetesttx = new Image();
//pausetesttx.src = "material/image/text/pauseTest.png";
//18.s/p/up/down/changeVolume
//var s = new Image();
//s.src = "material/image/pic/s.png";
//var p = new Image();
//p.src = "material/image/pic/p.png";
//var up = new Image();
//up.src = "material/image/pic/up.png";
//var down = new Image();
//down.src = "material/image/pic/down.png";
//19.音量
//var changeVolume = new Image();
//changeVolume.src = "material/image/pic/changeVolume.png";
//************引入图片结束
