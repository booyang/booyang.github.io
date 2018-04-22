// JavaScript Document
//获取屏幕 宽度 和 高度 作为全局变量
var clientWidth = document.documentElement.clientWidth;
var clientHeight= document.documentElement.clientHeight;
var inPC,inPhone;
function inWhere(){
	var ua = window.navigator.userAgent;
	var os = {};
	os.android = ua.match(/(Android)\s+([\d.]+)/) || ua.match(/Silk-Accelerated/) ? true : false;
	os.ipad = ua.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	var url = "javascript:;";
	if (os.ios || os.android) {//在手持设备(手机/平板)中
		if(os.ipad){
			inPC();
		}else{
			inPhone();
		}
	} else {//在PC设备中
		//再判断屏幕是否过于小
		inPC();
	}
}
//在PC设备中
function inPC() {
	inPC = 1;
	inPhone = 0;
	clientHeight= document.documentElement.clientHeight > 620 ? document.documentElement.clientHeight : 620 ;
	$(".fullScreen").css("height",clientHeight).css("font-size","1em");
	$("#top").add("body").css("min-width","1000px").show();
	$("#who").css("font-size","1em");
	//页面一刷新就回顶部
	$('html,body').animate({scrollTop: '0px'}, 1000);
	//PC页面滑块效果
	$(".slideInner").slide({
		slideContainer: $('.slideInner a'),
		effect: 'easeOutCirc',
		autoRunTime: 4000,
		slideSpeed: 1000,
		nav: true,
		autoRun: true,
		prevBtn: $('a.prev'),
		nextBtn: $('a.next')
	});
	//人物头像提示
	$('.picDiv').tipso({
		useTitle: false,
		position: 'bottom',
		background:'rgba(0,0,0,0.7)',
		width:300,
		offsetY:-100
	});
}
//在手持设备(手机/平板)中
function inPhone() {
	inPhone = 1;
	inPC = 0;
	//顶部改动
	$("#top_inphone").show();
	//内容部分
	$(".fullScreen").css("height",clientHeight);
	//nerd部分的改动
	$("#what .hideContent").hide();
	$("#top").hide();
	//观点部分的改动
	$(".slides").hide();
	$(".report_list").show();
	//成员部分的改动
	$(".personnel").css("width","300px");
	$(".personnel .picDiv").css("height","60px").css("width","60px").css("margin","40px auto");
	$(".personnel .nameDiv").css("margin-top","-70px").css("margin-left","-90px");
	$(".personnel .positionDiv").hide();
	$(".personnel .positionDivCn").show();
}
//顶部缩窄
function narrowTop() {
	$("#top").css("background-color","rgba(0,0,0,0.4)");
	$("#top a").css("padding-top","0").css("padding-bottom","20px");
	$("#logoA").css("top","20px").css("height","60px");
	$("#top img").css("height","60px").css("width","55px");
}
//顶部增宽
function broadTop() {
	$("#top").css("background-color","rgba(0,0,0,0)");
	$("#top a").css("padding-top","30px").css("padding-bottom","30px");
	$("#logoA").css("top","50px");
	$("#top img").css("height","90px").css("width","83px");	
}
/**
 *点击顶部标签
 */
$("#homeA").on('click', function(event) {$('html,body').animate({scrollTop: '0px'}, 1000);});
$("#techA").add("#techB").on('click', function(event) {$('html,body').animate({scrollTop: 2 * clientHeight}, 1000);});
$("#logoA").on('click', function(event) {$('html,body').animate({scrollTop: clientHeight}, 1000);});
$("#reportA").add("#reportB").on('click', function(event) {	$('html,body').animate({scrollTop: 3 * clientHeight}, 1000);});
$("#whoA").add("#whoB").on('click', function(event) {$('html,body').animate({scrollTop: 5 * clientHeight}, 1000);});
/*if(0){
	//由于animate方法的时间参数必须使用数字,不能用变量,如果要根据距离来,只能采用以下方式:
	//算出页面滚动距离除以屏幕高度的倍数,并用switch-case来判断,在case中规定基本时间*倍数得出的毫秒数值
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	var tc=  t / clientHeight;
	alert("t=" + t + ";clientHeight=" + clientHeight+ ";tc=" + tc);
}*/
window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
	if(inPC){
		if( t !== 0) {
			narrowTop();
		} else {
			broadTop();
		}
	}
	if(inPhone){
		if( t !== 0) {
			$("#top_inphone").hide();
		} else {
			$("#top_inphone").show();
		}
	}
}
//监听屏幕宽度变化,改变背景区域高度
$(window).bind('resize', function() {
	clientWidth	= document.documentElement.clientWidth;
	clientHeight= (inPC==1) ? Math.max(document.documentElement.clientHeight,620) : document.documentElement;
	$(".fullScreen").css("height",clientHeight);
});
inWhere();