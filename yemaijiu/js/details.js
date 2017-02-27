function sMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for (attr in json) {
			//获取当前属性值
			if (attr == 'opacity') {
				var iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, attr));
				
			}
			//计算速度
			var iSpeed = (json[attr] - iCur) / 6;
			iSpeed > 0 ? iSpeed = Math.ceil(iSpeed) : iSpeed = Math.floor(iSpeed);

			//判断停止
			if (iCur == json[attr]) {
				clearInterval(obj.timer);
				if (fn) {
					fn();
				}
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = (iCur + iSpeed) + 'px';
				}
			}
		}
	}, 20);
}

///*右边导航条效果*/
//var chongZ=document.getElementById("rchongZhi");
//var zuiJ=document.getElementById("rzuiJin");
//var woD=document.getElementById("wodeYan");
//var woZ=document.getElementById("wodeZi");
//
//var navone=document.getElementById("nav_firstItem");
//var navtwo=document.getElementById("zuiJ");
//var navthird=document.getElementById("chong");
//var navforth=document.getElementById("yanZ");
//var navfif=document.getElementById("qian")
//chongZ.onmouseover=navone.onmouseover=function(){
//	chongZ.style.display="block";
//}
//chongZ.onmouseout=navone.onmouseout=function(){
//	chongZ.style.display="none";
//}
//zuiJ.onmouseover=navtwo.onmouseover=function(){
//	zuiJ.style.display="block";
//}
//zuiJ.onmouseout=navtwo.onmouseout=function(){
//	zuiJ.style.display="none";
//}
//
//woZ.onmouseover=navfif.onmouseover=function(){
//	woZ.style.display="block";
//}
//woZ.onmouseout=navfif.onmouseout=function(){
//	woZ.style.display="none";
//}
//
//woD.onmouseover=navforth.onmouseover=function(){
//	woD.style.display="block";
//}
//woD.onmouseout=navforth.onmouseout=function(){
//	woD.style.display="none";
//}
///*二级菜单*/
//var classify=document.getElementById("classify");
//var menu1=document.getElementById("menu1");
//var menu2=getByClassName("menu2");
//var lis=menu1.getElementsByTagName("li");
//var main_menu2=document.getElementById("main_menu2");
//for(var i=0;i<lis.length;i++){
//	lis[i].index=i;
//	menu2[i].index=i;
//	lis[i].onmouseover=function(){
//		for(var i=0;i<menu2.length;i++){
//			if(this.index==menu2[i].index){
//				menu2[i].style.display="block";
//				menu2[i].style.top=this.offsetTop+"px";
//			}else{
//				menu2[i].style.display="none";
//			}
//			menu2[i].onmouseover=function() {
//				this.style.display="block";
//				menu1.style.display="block";
//				sMove(menu1,{opacity:100});
//				
//			}
//			menu2[i].onmouseout=function(){
//				this.style.display="none";
//				sMove(menu1,{opacity:0});
//				menu1.style.display="none";
//			}
//		}
//	}
//}
//menu1.onmouseover=classify.onmouseover=function(){
//	menu1.style.display="block";
//	sMove(menu1,{opacity:100});
//	main_menu2.style.display="block";
//}
//menu1.onmouseout=function(){
//	main_menu2.style.display="block";
//}
//classify.onmouseout=function(){
//	sMove(menu1,{opacity:0});
//	menu1.style.display="none";
//	main_menu2.style.display="none";
//}
/*图片轮播*/
var currentImgIndex=0;
var maxIndex=0;
var bigs=document.getElementById("big_pic");
//大图
var bimgs=bigs.getElementsByTagName("img");
//左边按钮
var parbtn_left=document.getElementById("parbtn_left");
//右边边按钮
var parbtn_right=document.getElementById("parbtn_right");
//小图左边按钮
var sLeft=getByClassName("small_btnL");
//小图右边按钮
var sRight=getByClassName("small_btnR");

for(var i=0;i<bimgs.length;i++){
	parbtn_right.onmouseover=parbtn_left.onmouseover=bimgs[i].onmouseover=function(){
		sMove(parbtn_left,{opacity:100});
		sMove(parbtn_right,{opacity:100});
	}
	parbtn_right.onmouseout=parbtn_left.onmouseout=bimgs[i].onmouseout=function(){
		sMove(parbtn_left,{opacity:0});
		sMove(parbtn_right,{opacity:0});
	}
}
sLeft[0].onclick=function(){
	sMove(smallpic,{left:-(currentImgIndex-1)*simgs[0].offsetWidth})
}
sRight[0].onclick=function(){
	if(currentImgIndex>(bimgs.length-1)){
		currentImgIndex=0;
	}
	sMove(smallpic,{left:-(currentImgIndex-1)*simgs[0].offsetWidth})
}
parbtn_left.onclick=function(){
	currentImgIndex--;
	if(currentImgIndex<0){
		return;
	}
	changeImg();
}
parbtn_right.onclick=function(){
	currentImgIndex++;
	if(currentImgIndex>=(bimgs.length-2)){
		currentImgIndex=0;
	}
	changeImg();
}
//装img的ul
var smallpic=document.getElementById("small_pics");
var simgs=smallpic.getElementsByTagName("li");

smallpic.style.width= simgs.length*simgs[0].offsetWidth + "px";
//小图的集合

for(var i=0;i<simgs.length;i++){
	simgs[i].index=i;
	simgs[i].onmouseover=function(){
		sMove(this,{opacity:100});
	}
	simgs[i].onmouseout=function(){
		if(currentImgIndex!=this.index){
			sMove(this,{opacity:60});
		}
			
	}
	simgs[i].onclick=function(){
		currentImgIndex=this.index;
		changeImg();
	}
}
function changeImg(){
	bimgs[currentImgIndex].style.zIndex=++maxIndex;
	b_img.src="../img/bigpic"+ (currentImgIndex+1)+".JPG";
	//小图
	for(var k=0;k<simgs.length;k++){
		sMove(simgs[k],{opacity:60});
	}
	sMove(simgs[currentImgIndex],{opacity:100});
	
	if(currentImgIndex==0){
		sMove(smallpic,{left:0})
	}else if(currentImgIndex==(simgs.length-1)){
		sMove(smallpic,{left:-(simgs.length-6)*simgs[0].offsetWidth})
	}else{
		sMove(smallpic,{left:-(currentImgIndex-1)*simgs[0].offsetWidth})
	}
}

/*放大镜*/
var magnify=getByClassName("magnify")[0];
var big_pic=document.getElementById("big_pic");
var mouse=getByClassName("mouse")[0];
var b_img=document.getElementById("b_img");
var par_left=getByClassName("par_left")[0];
var particulars=getByClassName("particulars")[0];

big_pic.onmouseover=function(){
	magnify.style.display="block";
}
big_pic.onmouseout=function(){
	magnify.style.display="none";
}
document.onmousemove=function(event){
	var evt = event||window.event;
		//alert(evt.clientY)
	var x = evt.clientX + Number(document.documentElement.scrollLeft||document.body.scrollLeft) - particulars.parentNode.offsetLeft- big_pic.offsetLeft;
	var y = evt.clientY + Number(document.documentElement.scrollTop||document.body.scrollTop)-particulars.parentNode.offsetTop -big_pic.offsetTop;
	//alert(big_pic.parentNode.offsetTop)
	if(x > mouse.offsetWidth/2 && x< (big_pic.offsetWidth-mouse.offsetWidth/2) && y > mouse.offsetWidth/2 && y< (big_pic.offsetHeight-mouse.offsetWidth/2) ){
		mouse.style.opacity = .5;
		b_img.style.left = -(x - mouse.offsetWidth/2)*3.6 +"px";
		b_img.style.top = -(y - mouse.offsetWidth/2)*3.3 +"px";
		mouse.style.left = x - mouse.offsetWidth/2+"px";
		mouse.style.top = y - mouse.offsetWidth/2 +"px";
	}else{
		mouse.style.opacity = 0;
	}
}


/*更多优惠*/
var gengDuo=getByClassName("gengDuo");
var more_div=getByClassName("more_div");
more_div[0].onmouseover=gengDuo[0].onmouseover=function(){
	more_div[0].style.display="block";
	sMove(more_div[0],{height:220})
}
more_div[0].onmouseout=gengDuo[0].onmouseout=function(){
	more_div[0].style.display="none";
	sMove(more_div[0],{height:0})
}

/*数量加减*/
var jian=getByClassName("countJian")[0];
var jia=getByClassName("countJia")[0];
var count=getByClassName("count")[0];
jian.onclick=function(){
	count.value-=1;
	if(count.value<0){
		count.value=0;
	}
}
jia.onclick=function(){
	count.value=Number(count.value)+1;
}
/*分享到*/
var big=getByClassName("gengD")[0];
var weibo=big.getElementsByTagName("img");
var share=getByClassName("share")[0];
share.onmouseover=big.onmouseover=function(){
	sMove(big,{marginLeft:20})
}
share.onmouseout=big.onmouseout=function(){
	sMove(big,{marginLeft:0})
}

/*商品详情tab切换*/
var shops_ul=getByClassName("shops_ul")[0];
var shopOne=shops_ul.getElementsByTagName("li");
var shopsX=getByClassName("shops_ulx");
for(var i=0;i<shopOne.length;i++){
	shopOne[i].index=i;
	shopsX[i].index=i;
	shopOne[i].onmouseover=function(){
		for(var k=0;k<shopsX.length;k++){
			if(this.index==shopsX[k].index){
				shopsX[k].style.display="block";
			}else{
				shopsX[k].style.display="none"
			}
		}
	}
}
/*用户评价tab切换*/
var jind_nav=getByClassName("jind_nav")[0];
var jindas=jind_nav.getElementsByTagName("a");
var pings=getByClassName("pingJ");
for(var i=0;i<jindas.length;i++){
	jindas[i].index=i;
	
	jindas[i].onmouseover=function(){
		for(var k=0;k<pings.length;k++){
			pings[k].index=k;
			if(this.index==pings[k].index){
				pings[k].style.display="block";
			}else{
				pings[k].style.display="none"
			}
		}
	}
}
/*商品咨询tab切换*/
var jindd=getByClassName("jindd")[0];
var jinds=jindd.getElementsByTagName("a");
var pingss=getByClassName("pingJJ");
for(var i=0;i<jinds.length;i++){
	jinds[i].index=i;
	
	jinds[i].onmouseover=function(){
		
		for(var k=0;k<pingss.length;k++){
			pingss[k].index=k;
			if(this.index==pingss[k].index){
				pingss[k].style.display="block";
			}else{
				pingss[k].style.display="none"
			}
		}
	}
}

///*右边悬浮*/
//var right_nav=getByClassName("right_nav")[0];
//setTimeout(function(){
//	right_nav.style.display="block";
//	sMove(right_nav,{width:34});
//},300);



/*回到顶部*/
var r_lastItem=getByClassName("r_lastItem")[0];

/*顶部悬浮*/
document.onscroll=function(){
	var oDiv=document.getElementById('shops_title');
	var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>=1200){
			oDiv.style.position = "fixed";
			oDiv.style.top = "0px";
			//startMove(oDiv2,{opacity:'100',top:'0'})
			//alert(scrolltop-oDiv1.offsetHeight)
//			r_lastItem.style.display="block";
//			r_lastItem.onclick=function(){
//				scrolltop=document.documentElement.scrollTop=document.body.scrollTop=0;;
//			}
		} else {
			oDiv.style.position = "absolute";
//			r_lastItem.style.display="none";
		}
		
}

////右边购物车的数量的增减的p标签
//var countShop=getByClassName("countShop")[0];
////加入购物车按钮
//var shopname=getByClassName("text_s")[0];
////名称:alert(shopname.firstElementChild.firstElementChild.innerHTML)
//var price=getByClassName("price")[0];
////alert(price.firstElementChild.firstElementChild.innerHTML);
//var btn_join=getByClassName("join")[0];
//btn_join.onclick=function(){
//	countShop.innerHTML=Number(count.value)+Number(countShop.innerHTML);
//	countShop.style.fontSize="16px";
//	countShop.style.fontWeight="600";
//	if(count.value==0){
//		return;
//	}else{
//		alert("加入购物车成功");
//	}
//	
//}

///*查看购物车*/
//var rzuiJin=document.getElementById("rzuiJin");
//rzuiJin.onclick=function(){
//	window.location.href="http://127.0.0.1:8020/%E5%AE%9E%E8%AE%AD%E9%A1%B9%E7%9B%AE/html/cart.html"
////}