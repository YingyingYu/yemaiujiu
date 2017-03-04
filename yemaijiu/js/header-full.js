//head-bar
function HeadBar(){
	
	//head-bar
	$("#header .head-bar .site-bar .sitelinks .myaccount,.app-download,.myservice").hover(function(){
		$(this).toggleClass("dropdown-hover");
	},function(){
		$(this).toggleClass("dropdown-hover");
	});
	//head-nav
	$(".head-nav .site-nav .navLinks li").not(".site-nav .navLinks li:first-child").hover(function(){
		$(this).toggleClass("on");
	},function(){
		$(this).toggleClass("on");
	});
	
    $(".categorys h3 b").css("display","none");
	$("#categroup").css("display","block");
}

//加载购物车中的信息 (是商品也与购物车页中的购物车数量同步)
function loadCart(){
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var cartObj = convertCartStrToObj(cartStr);
	//获取到购物车中所有商品的数量
	var total = 0;
	for(var id in cartObj){
		total += cartObj[id].num;
	}
	$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").html(total);
}

//转成对象 
function convertCartStrToObj(cartStr){
	//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
	//如果空字符串,既没有购物车信息,那么购物车为空,直接返回一个空对象
	if(!cartStr){
		return {};
	}
	var goods = cartStr.split(":");
	var obj = {};
	for (var i = 0; i< goods.length; i++) {
		var data = goods[i].split(","); 
		//以商品的id为键,商品的其他信息为值,这个值也设计为一个对象
		obj[data[0]] = {
			name : data[1],
			enName : data[2],
			price : data[3],
			num : parseInt(data[4]),
			src : data[5]
		}
	}
	return obj;
}

//转成字符串
function convertObjToCartStr(obj){
	/* {
		 * 	sp1 : {
		 * 		name : "香蕉",
		 * 		enName :"",
			 * price : 30,
			 * num : 1,
			 * src : "img/1.jpg"
		 * },
		 * sp2 :{
			 * 	name :"苹果",
			 * price : 40,
			 * num:2,
			 * src : "img/2.jpg"
		 * }
	*/ 
	var cartStr = "";
	//遍历对象
	for (var id in obj) {
		if(cartStr){
			cartStr += ":";
		}
		cartStr += id + "," + obj[id].name + "," +obj[id].enName+ "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
	}
	return cartStr;
}

//header 购物车
function IsShopCartHead(){

	//读取cookie里面的值
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";

	var cartObj = convertCartStrToObj(cartStr);
	//计算总共加入购物车的数量  _sum
	var _sum = 0;
	var _n = 0;
	var _priceSum = 0;
	for(var id in cartObj){
		var good1 = cartObj[id];
		_sum += parseInt(good1.num);
		_priceSum += parseInt(good1.num) * parseInt(good1.price);
	}
	
	if(_sum > 0){
		$(".header .head-main .head-shopcart .txt-cartcount").html(_sum);
		$(".header .head-main .head-shopcart .txt-cartcount").css("display","block");
	}else{
		$(".header .head-main .head-shopcart .txt-cartcount").html();
		$(".header .head-main .head-shopcart .txt-cartcount").css("display","none");
	}
	
	
	//btn-shopcart
	$("#header .head-main .head-shopcart a.btn-shopcart").mouseenter(function(){
		
		$("#header .head-main .head-shopcart").addClass("head-shopcart-hover");

		if(!cartStr){
			//清空
			$("#header .head-main .head-shopcart .shopcart-list").empty();
			$("#header .head-main .head-shopcart .shopcart-list").append(
				"<div class='empty'>您的购物车里没有任何商品，赶快去挑选商品吧！</div>"
			);
		}else{
			//清空
			$("#header .head-main .head-shopcart .shopcart-list").empty();
			
			$("#header .head-main .head-shopcart .shopcart-list").append(
				"<ul></ul><div class='shopcart-sum'><a class='btn-viewcart' href='showCart.html' target='_blank'>查看购物车</a>"+
				"<p>共<em>"+_sum+"</em>件商品<br>总计： ¥<strong>"+_priceSum+"</strong></p></div>"
			);
			//遍历所有的商品生成html添加到购物车列表中
			for(var id in cartObj){
				//商品信息对象
				var good = cartObj[id];
				var str = '<li data-good-id="'+id+'">'+
						  '<a class="prod-info" target="_blank" href="javascript:void(0);"><img width="60" height="98" alt="'+good.name+'" src="'+good.src+'" />'+
						  '<span class="name">'+good.name+'</span>'+
						  '<span class="nameEn">'+good.enName+'</span>'+
						  '<span class="price"><strong>￥'+good.price+'</strong>×<em>'+good.num+'</em></span></a>'+
						  '<a title="'+good.name+'" data-good-id="'+id+'" class="btn-remove" href="javascript:void(0);" >删除</a></li>';
				//将上面的结构添加到cartList中去
				$(str).appendTo("#header .head-main .head-shopcart .shopcart-list ul");
				_n++;
				if(_n > 4){
					$("#header .head-main .head-shopcart .shopcart-list ul li:nth-child("+(_n-4)+")").remove();
				}
			}
			_n=0;
			//删除cookie商品
			$("#header .head-main .head-shopcart .shopcart-list ul li a.btn-remove").click(function(){
				//在页面上将商品信息删除，顺便获取一个该商品的id
				var id = $(this).parent().remove().attr("data-good-id");
				//从cookie中将该商品删除
	//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	//			var cartObj = convertCartStrToObj(cartStr);
				delete cartObj[id];
				//将新商品信息放回cookie\n
				$.cookie('cart' , convertObjToCartStr(cartObj) , {
					expires: 7,
					path: "/"
				});
				var cartStr1 = $.cookie("cart") ? $.cookie("cart") : "";
				if(!cartStr1){
					//清空
					$("#header .head-main .head-shopcart .shopcart-list").empty();
					$("#header .head-main .head-shopcart .shopcart-list").append(
						"<div class='empty'>您的购物车里没有任何商品，赶快去挑选商品吧！</div>"
					);
				}
			});	
		}
	});
	
	$("#header .head-main .head-shopcart ").mouseleave(function(){
		$("#header .head-main .head-shopcart").removeClass("head-shopcart-hover");
	});
}

//登录 成功后 
function LoginSuccess(){
	
	$.post("../api/login2.php",null,function(data,textStatus){
		
		var _reg =  new RegExp(/\d+/g);
		var _reg2 = new RegExp(/^\d+$/g);
		var _reg3 = new RegExp(/[b]/g);
		data.lastIndex = 0;

		if(_reg3.test(String(data)) == true){
			data.lastIndex = 0;
			data = data.split("<br />")[2];
		}
		
		
		try{
			if(data == "0" ||  _reg2.test(String(data)) == false){
				data.lastIndex = 0;
				data = String(data).match(_reg)[0];
				
				//创建登录/注册
				if($(".header .head-bar .site-bar .userinfos li").length <= 0){
					$(".header .head-bar .site-bar .userinfos").append(
						"<li class='hidden' style='display:list-item;'><em class='member-count'>"+data+"</em> 位会员的选择</li>"+
						"<li class=''><a href='login.html' class='txt-login' rel='nofollow' data-dts='IT.1' group1='ad'>登录</a></li>"+
						"<li class='bldr bold bg_clear'><a href='register.html' class='txt-register' rel='nofollow' data-dts='IT.2' group1='ad'>注册</a></li>"
					);
				}	
			}else{
				//创建登录成功
				if($(".header .head-bar .site-bar .userinfos li").length <= 0){
					$(".header .head-bar .site-bar .userinfos").append(
						"<li style='height:16px;overflow:hidden;'>您好,<a href='#'>"+data+"<img align='absmiddle' width='16' height='16' src='../img/indexImages/member.png'></a></li>"+
						"<li class='bldr'><a href='login.html' class='txt-logout'>退出</a></li>"
					);
					$("#header .head-bar .site-bar .userinfos li a").css("width","96px");
				}
			}
		}catch(e){
			//忘记密码
		}
	});	
}

//侧栏购物车   是否有商品
function IsShopCartSlide(){
	
	//读取cookie里面的值
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var _n = 0;
	if(!cartStr){
		//清空
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").empty();
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").append(
			"<div class='empty'>您的购物车里没有任何商品，赶快去挑选商品吧！</div>"
		);
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop").css("margin-top","-5px");
	}else{
		//清空
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").empty();
		var cartObj = convertCartStrToObj(cartStr);
		//计算总共加入购物车的数量  _sum
		var _sum = 0;
		for(var id in cartObj){
			var good1 = cartObj[id];
			_sum += parseInt(good1.num);
		}
		
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").html(_sum);
		
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").append(
			"<h2>最近加入</h2><ul></ul><div class='shopcart-sum'><a class='btn btn-default' href='showCart.html' target='_blank'>查看购物车</a>"+
			"<p>共计<em>"+_sum+"</em>件商品</p></div>"
		);
		//遍历所有的商品生成html添加到购物车列表中
		for(var id in cartObj){
			//商品信息对象
			var good = cartObj[id];
			var str = '<li data-good-id="'+id+'">'+
					  '<a class="prod-info" target="_blank" href="javascript:void(0);"><img width="60" height="98" alt="'+good.name+'" src="'+good.src+'" />'+
					  '<span class="name">'+good.name+'</span>'+
					  '<span class="nameEn">'+good.enName+'</span>'+
					  '<span class="price"><strong>￥'+good.price+'</strong>×<em>'+good.num+'</em></span></a>'+
					  '<a title="'+good.name+'" data-good-id="'+id+'" class="btn-remove" href="javascript:void(0);" >删除</a></li>';
			//将上面的结构添加到cartList中去
			$(str).appendTo(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list ul");
			
			_n++;
			if(_n > 4){
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list ul li:nth-child("+(_n-4)+")").remove();
				_n = 4;
			}
			$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop").css("margin-top","-"+(20.5+54.5*(_n))+"px");
		}
		var _top = 20.5+54.5*(_n);
		var _n1 = _n;
		_n = 0;
		//删除cookie商品
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop ul li a.btn-remove").click(function(){
			//在页面上将商品信息删除，顺便获取一个该商品的id
			var id = $(this).parent().remove().attr("data-good-id");
			//从cookie中将该商品删除
//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//			var cartObj = convertCartStrToObj(cartStr);
			delete cartObj[id];
			//将新商品信息放回cookie\n
			$.cookie('cart' , convertObjToCartStr(cartObj) , {
				expires: 7,
				path: "/"
			});
			var cartStr1 = $.cookie("cart") ? $.cookie("cart") : "";
			if(!cartStr1){
				//清空
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").empty();
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop .shopcart-list").append(
					"<div class='empty'>您的购物车里没有任何商品，赶快去挑选商品吧！</div>"
				);
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop").css("margin-top","-5px");
			}else{
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-pop").css("margin-top","-"+(20.5+54.5*(--_n1))+"px");
			}
		});	
	}
}

//侧栏
function SiderBar(){
	
	//也买酒商品真伪查询 1111122222
	
	
}

//侧栏 回到顶部
function BackTop(){

	var _h = $(window).height();//获取可视高度
	var _st = $(document).scrollTop();//获取滚动条离顶部的高度

	if(_st >= _h){
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-backtop").css("display","block");
	}else{
		$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-backtop").css("display","none");
	}
	
	$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-backtop").click(function(){
		$(document).scrollTop(0);
	});
}

//侧栏 回到顶部
$(window).scroll(function(e){
	new BackTop();
});

//二级菜单
function MenuTwo(){
	//获取资源
	$.ajax({
		type:"post",
		url:"../json/categorys.json",
		async:true,
		success:function(data){
			$.each(data["menu-one"], function(i,item) {
				//一级菜单
				$(".header .head-nav .site-nav .categorys .categroup").append(
					"<dl class=''><dt><h4><a href='#' class='topcate' target='_blank' group1='ad' group2='1308'>"+item["title"]+"</a></h4>"+
					"<p></p></dt><dd class=''></dd></dl>"
				);
				
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(1)").addClass("first");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(6)").addClass("first");

				$.each(item["subTitles"], function(j,item1) {
					$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dt p").append(
						"<a href='#' target='_blank' group1='ad' group2='1308'>"+item1+"</a>"
					);
				});
				
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(1) dd").addClass("h400");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(2) dd").addClass("h100");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(3) dd").addClass("h320");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(4) dd").addClass("h400");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(5) dd").addClass("h121");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(6) dt").addClass("last");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(6) dd").addClass("h470");
				
				//二级菜单
				$.each(item["menu-two"], function(k,item2) {
					$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd").append(
						"<ul></ul>"
					);
//					console.log(item2);
					$.each(item2, function(m,item2a) {
						if(k == "subcates"){
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1)").addClass(k);
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1)").append(
								"<li><h5><a href='#' target='_blank' group1='ad' group2='1308' >"+item2a["title"]+"</a></h5><p class=''></p></li>"
							);	
							
							$.each(item2a["subTitles"], function(a,item2aa) {
								$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1) li:nth-child("+(m+1)+") p").append(
									"<a href='#' target='_blank' group1='ad' group2='1308' >"+item2aa+"</a>"
								);
							});
							
						}else{
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2)").addClass(k);
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2)").append(
								"<li><h5><a href='#' target='_blank' group1='ad' group2='1308' >"+item2a["title"]+"</a></h5><p class=''></p></li>"
							);
							$.each(item2a["subTitles"], function(a,item2aa) {
								$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2) li:nth-child("+(m+1)+") p").append(
									"<a href='#' target='_blank' group1='ad' group2='1308' >"+item2aa+"</a>"
								);
							});				
						}	
					});	
				});
			});
		}
	});
}

$(document).ready(function(){
	
	//head-bar
	new HeadBar();
	//header 购物车
	new IsShopCartHead();
	//登录 成功后 
	new LoginSuccess();
	//侧栏购物车   是否有商品
	new IsShopCartSlide();
	//侧栏 回到顶部
	new BackTop();
	//二级菜单
	new MenuTwo();
	
});
