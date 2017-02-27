///*roof我的账户下拉菜单效果*/
//var roof_secondul_thirdItem=document.getElementById("roof_secondul_thirdItem");
//var ye_account=document.getElementById("ye_account");
//var third_a=document.getElementById("third_a");
//	ye_account.onmouseover=roof_secondul_thirdItem.onmouseover=function(){
//		ye_account.style.display="block";
//		third_a.style.background="url(img/huaguojiantou.png) center bottom no-repeat";
//	}
//	ye_account.onmouseout=roof_secondul_thirdItem.onmouseout=function(){
//		ye_account.style.display="none";
//		third_a.style.background="none";
//	}
///*roof手机版的下拉菜单效果*/
//var roof_secondul_fourthItem=document.getElementById("roof_secondul_fourthItem");
//var ye_phone=document.getElementById("ye_phone");
//var fourth_a=document.getElementById("fourth_a");
//	ye_phone.onmouseover=roof_secondul_fourthItem.onmouseover=function(){
//		ye_phone.style.display="block";
//		fourth_a.style.background="url(img/huaguojiantou.png) center bottom no-repeat";
//	}
//	ye_phone.onmouseout=roof_secondul_fourthItem.onmouseout=function(){
//		ye_phone.style.display="none";
//		fourth_a.style.background="none";
//	}
///*roof也买服务下拉*/	
//var roof_secondul_fifthItem=document.getElementById("roof_secondul_fifthItem");
//var ye_service=document.getElementById("ye_service");
//var fifth_a=document.getElementById("fifth_a");
//	ye_service.onmouseover=roof_secondul_fifthItem.onmouseover=function(){
//		ye_service.style.display="block";
//		fifth_a.style.background="url(img/huaguojiantou.png) center bottom no-repeat";
//	}
//	ye_service.onmouseout=roof_secondul_fifthItem.onmouseout=function(){
//		ye_service.style.display="none";
//		fifth_a.style.background="none";
//	}
///*roof也买系列下拉*/
//var roof_secondul_sixthItem=document.getElementById("roof_secondul_sixthItem");
//var ye_series=document.getElementById("ye_series");
//var sixth_a=document.getElementById("sixth_a");
//	ye_series.onmouseover=roof_secondul_sixthItem.onmouseover=function(){
//		ye_series.style.display="block";
//		sixth_a.style.background="url(img/huaguojiantou.png) center bottom no-repeat";
//	}
//	ye_series.onmouseout=roof_secondul_sixthItem.onmouseout=function(){
//		ye_series.style.display="none";
//		sixth_a.style.background="none";
//	}
///*
// *搜索框 */
//var search_inpt=document.getElementById("search_inpt");
//	search_inpt.onfocus=function(){
//		search_inpt.style.background="#FFFFFF";	
//		search_inpt.style.color="#000000";	
//	}
//	search_inpt.onblur=function(){
//		search_inpt.style.color="#cccccc";	
//		search_inpt.style.background="#F4F1F0";
//	}
//
///*购物车*/
//var shopping=document.getElementById("shopping");
//var shopping_cart=document.getElementById("shopping_cart")
//shopping.onmouseover=shopping_cart.onmouseover=function(){
//	shopping_cart.style.display="block";
//}
//shopping.onmouseout=shopping_cart.onmouseout=function(){
//	shopping_cart.style.display="none";
//}


/*
*给IE和其他浏览器设置兼容，获取外部样式表中的元素
*/
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr]
	} else {
		return window.getComputedStyle(obj, false)[attr];
	}
}
/*
 图片的渐隐渐现效果，兼容IE
 */
function startMove(obj, json, fn) {
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
	}, 30);
}

/*
 *兼容 IE和火狐下获取class名字
 */
function getByClassName(className){  
	if(document.getElementByClassName){  
		return document.getElementByClassName(className) //FF下因为有此方法，所以可以直接获取到；  
	}  
	var nodes=document.getElementsByTagName("*");//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；  
	var arr=[];//用来保存符合的className；  
	for(var i=0;i<nodes.length;i++){  
		if(hasClass(nodes[i],className)) arr.push(nodes[i]);  
	}  
	return arr;  
} 
 function hasClass(node,className){    
    var cNames=node.className.split(/\s+/);//根据空格来分割node里的元素；    
    for(var i=0;i<cNames.length;i++){    
        if(cNames[i]==className) return true;    
    }    
    return false;    
 }   
    /*倒计时*/
 function getRTime(){
        var EndTime= new Date('2015/10/10 10:00:00'); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();


        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
		for(var i=0;i<getByClassName("t_d").length;i++){
			getByClassName("t_d")[i].innerHTML=Math.abs(d)+ "天";
		}
		for(var i=0;i<getByClassName("t_h").length;i++){
			getByClassName("t_h")[i].innerHTML=Math.abs(h) + "时";
		}
		for(var i=0;i<getByClassName("t_m").length;i++){
			getByClassName("t_m")[i].innerHTML=Math.abs(m) + "分";
		}
		for(var i=0;i<getByClassName("t_s").length;i++){
			getByClassName("t_s")[i].innerHTML=Math.abs(s) + "秒";
		}
      /*  getByClassName("t_d").innerHTML = Math.abs(d)+ "天";
        getByClassName("t_h").innerHTML =Math.abs(h) + "时";
        getByClassName("t_m").innerHTML = Math.abs(m) + "分";
        getByClassName("t_s").innerHTML = Math.abs(s) + "秒";*/
    }
    setInterval(getRTime,1000);   
var Base={
	getById:function(id){
		return document.getElementById(id);
	},
	getByName:function(name){
		return document.getElementsByName(name)[0];	
	},
	getByTag:function(tag){
		return document.getElementsByTagName(tag)[0];	
	},
	getByClass:function(classname){
		return document.getElementsByClassName(classname)[0];	
	},
	log:function (obj){
		document.title=(obj);
	},
	/**
	*获取obj下的所有子节点，包括文本节点，属性节点，和元素节点（标签）
	*/
	getChildElement:function(obj){
		var objchild = obj.childNodes;
		var objlist =[];
	//筛选，获得所有元素节点
		for(var i=0;i<objchild.length;i++){
			if(objchild[i].nodeType==1){
				objlist.push(objchild[i]);
			}
		}
		return objlist;
	},
	/**
	*添加时间监听器的兼容方法
	*/
	addEvent : function(target,eventname,fn){
		if(target.attachEvent){
			target.attachEvent("on"+eventname,fn);
		}else{
			target.addEventListener(eventname,fn,false);
		}
	},
	/**
	*字符串去空格
	*/
	trim:function(str){
		var arr=[];
		for(var i=0;i<str.length;i++){
			if(str[i]==" "){
				continue;
			}else{
				arr.push(str[i]);
			}
		}
		return arr.join("");
	}
}


/*
 *图拍自动切换 */
function autoChange(imgs,btns){
	var currentImgIndex=0;
	clearInterval(imgs.timer)
	imgs.timer=setInterval(function(){
		currentImgIndex++;
		//图片轮播
		for (var i = 0; i < imgs.length; i++) {
			if (currentImgIndex > imgs.length - 1) {
				currentImgIndex = 0;
			}
			if (i == currentImgIndex) {
				startMove(imgs[i],{opacity:100})
			} else {
				startMove(imgs[i],{opacity:0})
			}
		}
		//图片上的按钮轮播
		for (var i = 0; i < btns.length; i++) {
			if (i == currentImgIndex) {
				btns[i].style.background = "#7E0001";
			} else {
				btns[i].style.background = "#86685E"
			}
		}
	}, 2000);
	
}
/*
 *图片手动切换 */
function handChange(imgs,btns){
	for(var k=0;k<btns.length;k++){
		btns[k].index=k;
		btns[k].onmouseover=function(){
			for(var m=0;m<btns.length;m++){
				btns[m].style.background="#86685E";
				startMove(imgs[m],{opacity:0})
			}
			this.style.opacity=1;
			this.style.background="#7E0001";
			startMove(imgs[this.index],{opacity:100})
			currentImg=this.index+1;
		}					
	}
}
/*
 *搜索框下拉菜单效果*/
function pullDownMenu(obj1,obj2){
	obj1.onclick=function(event){			
		var evt=event||window.event;				
		obj2.style.display=obj2.style.display=="block"?"none":"block";
		//阻止冒泡	
		if(window.event) event.cancelBubble = true;
			else event.stopPropagation();
	}
	
	var lilist=obj2.childNodes;
	var arr=[];
	for(var i=0;i<lilist.length;i++){
		if(lilist[i].nodeType==1){
			arr.push(lilist[i]);
		}
	}
	for(var k=0;k<arr.length;k++){	
		arr[k].onmouseover=function(){
			this.style.background="#FC595A";			
		}
		arr[k].onmouseout=function(){
			this.style.background="none";
		}
		arr[k].onclick=function(){
			obj1.innerHTML=this.lastChild.nodeValue;
			obj2.style.display="none";
		}
	}
	document.onclick=function(){
		obj2.style.display="none";
	}			
};	
/*
* 创建、删除 获取cookie*/
var Cookie={
	/**
	*创建一个cookie
	*/
	put :function(key,value,expires,domain,path){
		var str=key+ "=" +value;
		if(expires && (expires instanceof Date)){
			str+=";expires="+expires;
		}
		if(domain){
			str +=";domain="+domain;
		}
		if(path){
			str +=";path="+path;
		}
		document.cookie=str;
	},
	/**
	*获取一个cookie
	*/
	get :function(key){
		var cks =document.cookie.split(";");
		for(var a in cks){
			var kv=cks[a].split("=");
			if(Base.trim(kv[0]) == key){
				return kv[1];
			}
		}
	},
	/**
	*删除一个cookie
	*/
	remove: function(key){
		var d=new Date(0);
		document.cookie=key + "=ysh;expires="+d;
	}
}
/*
 *对日期的处理 */
var DateLib={
	/**
	*判断一个年份是否为闰年
	*/
	isLeapYear:function(year){
		if(year%4==0&&year%100!=0 || year%400==0){
			return true;
		}else{
			return false;
		}
	},
	/**
	*格式化输出一个年月日
	*/
	Format : function(_date,seperator){
		var year=_date.getFullYear();
		var month=(_date.getMonth()+1)> 9 ? _date.getMonth()+1 : "0"+(_date.getMonth()+1);
		var date=_date.getDate()>9 ? _date.getDate() : "0"+_date.getDate();
		return year+seperator+month+seperator+date;
	},
	/**
	*字符串改成日期对象
	*/
	parse:function(str,seperator) {
		//将字符串以分隔符分割成数组
		var astr=str.split(seperator);
		//将数组以-为分隔符来讲数组装换成字符串
		var dstr=astr.join("-");
		//将字符串装换成毫秒
		var time=Date.parse(dstr);
		//将字符串中的日期传进new Date(time) 输出字符串的日期
		var d = new Date(time);
		return d;
	},
	/**
	*获得某个月份的天数
	*/
	getMonthLength:function(num){
		switch(num){
			case 1: 
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:return 31;
			case 2: return 28;
			case 4:
			case 6:
			case 9:
			case 11:return 30;
		}
	},
	/**
	*获取两个日期相差的时间
	*/
	getdiff:function(date1,date2){
		var dateva1 = date1.getTime();
		var dateva2 = date2.getTime();
		return Math.floor(Math.abs(dateva1-dateva2)/(1000*60*60*24));
	},
	/**
	*获取N天以后的日期
	*/
	getSday: function(n){
		var date = new Date();
		var time=date.getTime();
		time+= n*24*60*60*1000;
		return new Date(time);
	}
}