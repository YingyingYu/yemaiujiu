//banner　透明度轮播
function OpacityBanner(){
	var _self = this;
	this.timer = 0;
	_self.i=0;
	this.delay = function(){
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-index span").eq(_self.i).removeClass("active");
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).css({
			"display":"none",
			"opacity":0.3
		});
		_self.i++;
		if(_self.i>=$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").size()){
			_self.i=0;
		}
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).css("display","block");
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-index span").eq(_self.i).addClass("active");
		_self.play(true);
	}
	this.play = function(_cmd){
//		console.log("lunbo "+_self.i);
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-index span").eq(_self.i).addClass("active");
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).animate({
			"display":"block",
			"opacity":1
		},800,function(){
			if(_cmd){
				window.clearTimeout(_self.timer);
				_self.timer=window.setTimeout(_self.delay,3000);
			}else{
				$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).stop();
				window.clearTimeout(_self.timer);
			}
		});
	}
	this.eventHandle = function(_current){
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").css({
			"display":"none",
			"opacity":0.3
		});
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-index span").removeClass("active");
		$(_current).addClass("active");//当前点击的span
		_self.i=$(_current).index();//获取当前的span的索引值
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).css({
			"display":"block",
		});
		window.clearTimeout(_self.timer);
		_self.play(false);
	}

	$(".hpmain .bigbanner .section #bigFocusSlider").mouseenter(function(){
		window.clearTimeout(_self.timer);
		$(".hpmain .bigbanner .section #bigFocusSlider .slide-items li").eq(_self.i).stop();
	});
	$(".hpmain .bigbanner .section #bigFocusSlider").mouseleave(function(){
		_self.play(true);
	});
	$(".hpmain .bigbanner .section #bigFocusSlider .slide-index span").mouseenter(function(){
		_self.eventHandle(this);
	});
}

//main 首屏 左边
function MainLeft(){
	
	$(".hpmain .section .left .mod-notice").append(
		"<div class='notice-link'>"+
		"<ul class='clearfix'>"+
		"</ul>"+
		"</div>"+
		"<div class='notice-main-slider'>"+
		"<span class='notice-change'>切换</span>"+
		"<div id='noticeSlider' class='notice-slider'>"+
		"<ul class='slide-items' data-dts='IA.7' style='width:400px;'>"+
		"<li><a rel='nofollow' href='javascript:void(0);' title='精品闪购' target='_blank'>"+
		"<img src='img/indexImages/flashSales.jpg' alt='精品闪购' width='200' height='204' border='0' style='opacity:1;' />"+
		"<p class='notice-title-slider'>精品闪购</p>"+
		"</a></li>"+
		"</ul></div></div>"+
		"<div class='bd'>"+
		"<div id='notices' class='notice-lists'>"+
		"<h3 class='clearfix' data-dts='IA.8.0'></h3>"+
		"</div></div>"
	);
	$(".notice-main-slider span.notice-change").click(function(){
		$(".left .mod").toggleClass("mod-notice-on");
	});
	
	$.ajax({
		type:"post",
		url:"json/mainLeft.json",
		dataType:"json",
		async:true,
		success:function(data){
//			console.log(data);
			$.each(data["noticeLink"]["contents"],function(i,item){
//				console.log(data);
//				console.log(data["noticeLink"]["contents"]);
				$(".notice-link ul").append(
					"<li><a href='javascript:void(0);' target='_blank' data-dts='"+item["id"]+"'>"+item+"</a>"
				);
			});
			$.each(data["noticeLists"], function(i,item){
//				console.log(item);
				$(".bd #notices h3").append(
					"<span><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'>"+item["title"]+"</a></span>"
				);
				$(".bd #notices").append(
					"<ul class='clearfix' data-dts='"+item["id"]+"'></ul>"
				);
				//注意  要精确定位到父元素上  例如:循环3个ul 每个ul下各有4个li 使用伪元素:nth-child(i+2)
				$.each(item["contents"], function(n,item){
//					console.log(item);
					$(".bd #notices ul:nth-child("+(i+2)+")").append(
						"<li>• <a href='javascript:void(0);' target='_blank' title='"+item+"' mdts='true'>"+item+"</li>"	
					);
				});
			});
			$(".bd #notices h3 span:nth-child(1)").addClass("first on");
			$(".bd #notices ul:nth-child(2)").addClass("on");
			
			var _self = this;
			_self.i = 0;
			this.eventTab = function(_current){
				$(".bd #notices ul").removeClass("on");
				$(".bd #notices h3 span").removeClass("on");
				$(_current).addClass("on");
				_self.i = $(_current).index();
				$(".bd #notices ul").eq(_self.i).addClass("on");
			}
			$(".bd #notices h3 span").mouseenter(function(){
				_self.eventTab(this);
			});		
		}
	});
}

//main 首屏 右边
function MainRight(){
	var num = 0;
	$(".main .mod-hotgoods").append(
		"<ul class='hottabs'></ul>"+
		"<div class='bd'>"+
		"<div class='goodslist' style='margin-top:0px;height:1800px;'></div>"+
		"</div>"
	);
	
	$.ajax({
		type:"post",
		url:"json/mainRight.json",
		async:true,
		success:function(data){
//			console.log(data);
			$.each(data["hottabs"], function(i,item) {
//				console.log(item);
				$(".main .hottabs").append(
					"<li><a href='javascript:void(0);' target='_blank' group1='ad' class='font26'>"+item["title"]+"</a>"+
					"<a href='javascript:void(0);' target='_blank' group1='ad' class='font14'>"+item["subTitle"]+"</a></li>"
				);
			});
			$.each(data["goodslist"],function(i,item){
				if(i==0){
					$(".main .mod-hotgoods .bd .goodslist").append(
						"<ul class='goodslist-qiang clearfix active' data-dts='I10'></ul>"
					);
					$.each(item["content"], function(j,item1) {
						//倒计时
//						var _millseconds = $(".main .mod-hotgoods .bd .goodslist ul:nth-child(1) li:nth-child(1) .prod-countdown").attr("millseconds");
						var n_date = new Date();
						var f_date = new Date(2017/2/26);
						var _mills = f_date.getTime() - n_date.getTime();
						var _date = new Date(_mills);
						var _day = _date.getDate();
						var _hours = _date.getHours();
						var _minutes = _date.getMinutes();
						
						$(".main .mod-hotgoods .bd .goodslist ul:nth-child(1)").append(
							"<li><div class='prod-countdown' millseconds='296867588'>还剩<strong class='tcd-d'>"+_day+"</strong>天<strong class='tcd-h'>"+_hours+"</strong>时<strong class='tcd-m'>"+_minutes+"</strong>分</div>"+
							"<dl><dt><a class='pimg' target='_blank' href='javascript:void(0);'><img src='img/indexImages/"+item1["image"]+"'  width='110' height='180' alt='"+item1["title"]+"' style='opacity:1;'/><p class='promo-icon'></p></a></dt>"+
							"<dd class='base'><a title='"+item1["title"]+"' class='pname' target='_blank' href='javascript:void(0);'>"+item1["title"]+"<span title='"+item1["en-title"]+"' class='en'>"+item1["en-title"]+"</span></a>"+
							"<p class='price'><span class='minprice'><label>抢购价：</label>¥<strong>"+item1["price"]+"</strong></span></p><dd></dl></li>"
						);
						
						if(item1["ins"] == true){
							$(".main .mod-hotgoods .bd .goodslist ul:nth-child(1) li:nth-child("+(j+1)+") dl dt p.promo-icon").append( 
								"<ins class='qiang'></ins>"
							);
						}
						
						$(".main .mod-hotgoods .bd .goodslist ul:nth-child(1) li:nth-child(2) dl dt a,dd.base a").attr("href","html/detail.html?WS");
						
					});
				}else{
					$(".main .mod-hotgoods .bd .goodslist").append(
						"<ul class='goodslist-qiang clearfix' data-dts='I1"+i+"'></ul>"
					);
					$.each(item["content"], function(j,item1) {
						$(".main .mod-hotgoods .bd .goodslist ul:nth-child("+(i+1)+")").append(
							"<li><dl><dt><a class='pimg' target='_blank' href='javascript:void(0);'><img src='img/indexImages/"+item1["image"]+"'  width='110' height='180' alt='"+item1["title"]+"' style='opacity:1;'/><p class='promo-icon'></p></a></dt>"+
							"<dd class='base'><a title='"+item1["title"]+"' class='pname' target='_blank' href='javascript:void(0);'>"+item1["title"]+"<span title='"+item1["en-title"]+"' class='en'>"+item1["en-title"]+"</span></a>"+
							"<p class='price'><span class='minprice'><label>抢购价：</label>¥<strong>"+item1["price"]+"</strong></span></p></dd><dd class='sum'><span class='soldnum'>售出<strong>"+item1["number"]+"</strong></span></dd></dl></li>"
						);
						
						if(item1["ins"] == true){
							$(".main .mod-hotgoods .bd .goodslist ul:nth-child("+(i+1)+") li:nth-child("+(j+1)+") dl dt p.promo-icon").append( 
								"<ins class='qiang'></ins>"
							);
						}
					});
				}
			});
			
			var _self = this;
			var _num = 0;
			var _height = $(".main .mod-hotgoods .bd .goodslist").height()/5;
		
			$(".main .mod-hotgoods .hottabs li").mouseenter(function(){
				_num = $(this).index();

				$(".main .mod-hotgoods .hottabs li").removeClass("active");
				$(".main .mod-hotgoods .hottabs li").eq(_num).addClass("active");
				
				$(".main .mod-hotgoods .bd .goodslist").animate({"margin-top":_height * (_num) * (-1)},'fast',function(){
					
					$(".main .mod-hotgoods .bd .goodslist ul").removeClass("active");
					$(".main .mod-hotgoods .bd .goodslist ul").eq(_num).addClass("active");
					
				});
			});
			$(".main .mod-hotgoods .hottabs li").eq(0).addClass("active");
			$(".main .mod-hotgoods .hottabs li").eq(4).addClass("last");
		}
	});
}

//main 每个子目录下的 右边Tab
function RightTab(){
	
	var num = 0;
	//葡萄酒
	$(".hpmain .channel-wine .section .right .channel-topboard ul li").hover(function(){
		
		num = $(this).index();
//		alert(num);
		if(parseInt(num) >= 2){
//			alert(num);
			$(".hpmain .channel-wine .section .right .channel-topboard ul li:nth-child(n+3)").removeClass("on");
			$(".hpmain .channel-wine .section .right .channel-topboard ul li").eq(num).addClass("on");
		}
		
	},function(){
		
		$(".hpmain .channel-wine .section .right .channel-topboard ul li:nth-child(1)").addClass("on");
		$(".hpmain .channel-wine .section .right .channel-topboard ul li:nth-child(2)").addClass("on");
		
	});
	//洋酒
	$(".hpmain .channel-yangjiu .section .right .channel-topboard ul li").mouseenter(function(){
		
		num = $(this).index();
		$(".hpmain .channel-yangjiu .section .right .channel-topboard ul li").removeClass("on");
		$(".hpmain .channel-yangjiu .section .right .channel-topboard ul li").eq(num).addClass("on");
		
	});
	//白酒
	$(".hpmain .channel-baijiu .section .right .channel-topboard ul li").hover(function(){
		
		num = $(this).index();
//		alert(num);
		if(parseInt(num) >= 2){
//			alert(num);
			$(".hpmain .channel-baijiu .section .right .channel-topboard ul li:nth-child(n+3)").removeClass("on");
			$(".hpmain .channel-baijiu .section .right .channel-topboard ul li").eq(num).addClass("on");
		}
		
	},function(){
		
		$(".hpmain .channel-baijiu .section .right .channel-topboard ul li:nth-child(1)").addClass("on");
		$(".hpmain .channel-baijiu .section .right .channel-topboard ul li:nth-child(2)").addClass("on");
		
	});
	//老酒
	$(".hpmain .channel-laoju .section .right .channel-topboard ul li").hover(function(){
		
		num = $(this).index();
//		alert(num);
		if(parseInt(num) >= 2){
//			alert(num);
			$(".hpmain .channel-laoju .section .right .channel-topboard ul li:nth-child(n+3)").removeClass("on");
			$(".hpmain .channel-laoju .section .right .channel-topboard ul li").eq(num).addClass("on");
		}
		
	},function(){
		
		$(".hpmain .channel-laoju .section .right .channel-topboard ul li:nth-child(1)").addClass("on");
		$(".hpmain .channel-laoju .section .right .channel-topboard ul li:nth-child(2)").addClass("on");
		
	});
	//酒具
	$(".hpmain .channel-jiuju .section .right .channel-topboard ul li").mouseenter(function(){
		
		num = $(this).index();
		$(".hpmain .channel-jiuju .section .right .channel-topboard ul li").removeClass("on");
		$(".hpmain .channel-jiuju .section .right .channel-topboard ul li").eq(num).addClass("on");
		
	});
	
}

//登录 成功后 
function LoginSuccess(){
	
	$.post("api/login2.php",null,function(data,textStatus){
		
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
				if($(".header .headBar .site-bar .userInfos li").length <= 0){
					$(".header .headBar .site-bar .userInfos").append(
						"<li class='hidden' style='display:list-item;'><em class='member-count'>"+data+"</em> 位会员的选择</li>"+
						"<li class=''><a href='html/login.html' class='txt-login' rel='nofollow' data-dts='IT.1' group1='ad'>登录</a></li>"+
						"<li class='bldr bold bg_clear'><a href='html/register.html' class='txt-register' rel='nofollow' data-dts='IT.2' group1='ad'>注册</a></li>"
					);
					$(".head-nav .lon_nav .head-bar .site-bar .userInfos").append(
						"<li class=''><a href='html/login.html' class='txt-login' rel='nofollow' data-dts='IT.1' group1='ad'>登录</a></li>"+
						"<li class='bldr bold bg_clear'><a href='html/register.html' class='txt-register' rel='nofollow' data-dts='IT.2' group1='ad'>注册</a></li>"
					);
				}
			}else{
				//创建登录成功
				if($(".header .headBar .site-bar .userInfos li").length <= 0){
					$(".header .head-bar .site-bar .userInfos").append(
						"<li style='height:16px;overflow:hidden;'>您好,<a href='javascript:void(0);'>"+data+"<img align='absmiddle' width='16' height='16' src='img/indexImages/member.png'></a></li>"+
						"<li class='bldr'><a href='html/login.html' class='txt-logout'>退出</a></li>"
					);
				}
			}
		}catch(e){
			//忘记密码
		}
	});
}

//二级菜单
function MenuTwo(){
	//获取资源
	$.ajax({
		type:"post",
		url:"json/categorys.json",
		async:true,
		success:function(data){
			$.each(data["menu-one"], function(i,item) {
				//一级菜单
				$(".header .head-nav .site-nav .categorys .categroup").append(
					"<dl class=''><dt><h4><a href='javascript:void(0);' class='topcate' target='_blank' group1='ad' group2='1308'>"+item["title"]+"</a></h4>"+
					"<p></p></dt><dd class=''></dd></dl>"
				);
				
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(1)").addClass("first");
				$(".header .head-nav .site-nav .categorys .categroup dl:nth-child(6)").addClass("first");

				$.each(item["subTitles"], function(j,item1) {
					$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dt p").append(
						"<a href='javascript:void(0);' target='_blank' group1='ad' group2='1308'>"+item1+"</a>"
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

					$.each(item2, function(m,item2a) {
						if(k == "subcates"){
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1)").addClass(k);
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1)").append(
								"<li><h5><a href='javascript:void(0);' target='_blank' group1='ad' group2='1308' >"+item2a["title"]+"</a></h5><p class=''></p></li>"
							);	
							
							$.each(item2a["subTitles"], function(a,item2aa) {
								$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(1) li:nth-child("+(m+1)+") p").append(
									"<a href='javascript:void(0);' target='_blank' group1='ad' group2='1308' >"+item2aa+"</a>"
								);
							});
							
						}else{
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2)").addClass(k);
							$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2)").append(
								"<li><h5><a href='javascript:void(0);' target='_blank' group1='ad' group2='1308' >"+item2a["title"]+"</a></h5><p class=''></p></li>"
							);
							$.each(item2a["subTitles"], function(a,item2aa) {
								$(".header .head-nav .site-nav .categorys .categroup dl:nth-child("+(i+1)+") dd ul:nth-child(2) li:nth-child("+(m+1)+") p").append(
									"<a href='javascript:void(0);' target='_blank' group1='ad' group2='1308' >"+item2aa+"</a>"
								);
							});				
						}	
					});	
				});
			});
		}
	});
}

//猜你喜欢
function LikeLeft(){
	
	$.ajax({
		type:"post",
		url:"json/like-left.json",
		async:true,
		success:function(data){
			
			$.each(data["like-left"][0]["content"], function(i,item) {
				$(".hpmain .content #happy #guessPageNum").append(
					"<div class='block'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'><img src='img/indexImages/"+item["image"]+"' /></a>"+
					"<dl style='width:180px;'><dt class='title'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'>"+item["title"]+"</a></dt>"+
					"<dd title='"+item["en-title"]+"'>"+item["en-title"]+"</dd><dd>"+item["type"]+"</dd><dd>"+item["producing-area"]+"</dd><dd>好评度："+item["ratecount"]+"</dd>"+
					"<dd class='last'><div class='minminprice'><span class='fuhao'>¥</span><strong>"+item["price"]+"</strong></div></dd></dl></div>"
				);
			});
			
			$(".hpmain .content #happy .like-left ul li").click(function(){
				var _num = $(this).index();

				$(".hpmain .content #happy #guessPageNum").empty();
				$.each(data["like-left"][_num]["content"], function(i,item) {
					$(".hpmain .content #happy #guessPageNum").append(
						"<div class='block'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'><img src='img/indexImages/"+item["image"]+"' /></a>"+
						"<dl style='width:180px;'><dt class='title'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'>"+item["title"]+"</a></dt>"+
						"<dd title='"+item["en-title"]+"'>"+item["en-title"]+"</dd><dd>"+item["type"]+"</dd><dd>"+item["producing-area"]+"</dd><dd>好评度："+item["ratecount"]+"</dd>"+
						"<dd class='last'><div class='minminprice'><span class='fuhao'>¥</span><strong>"+item["price"]+"</strong></div></dd></dl></div>"
					);
				});
			});
			//换一批
			var _n = 0;
			$(".hpmain .content #happy .tt #getnextPage").click(function(){
				_n++;
				if(_n >=8){
					_n=0;
				}
				
				$(".hpmain .content #happy #guessPageNum").empty();
				$.each(data["like-left"][_n]["content"], function(i,item) {
					$(".hpmain .content #happy #guessPageNum").append(
						"<div class='block'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'><img src='img/indexImages/"+item["image"]+"' /></a>"+
						"<dl style='width:180px;'><dt class='title'><a href='javascript:void(0);' target='_blank' title='"+item["title"]+"'>"+item["title"]+"</a></dt>"+
						"<dd title='"+item["en-title"]+"'>"+item["en-title"]+"</dd><dd>"+item["type"]+"</dd><dd>"+item["producing-area"]+"</dd><dd>好评度："+item["ratecount"]+"</dd>"+
						"<dd class='last'><div class='minminprice'><span class='fuhao'>¥</span><strong>"+item["price"]+"</strong></div></dd></dl></div>"
					);
				});
				
			});
		}
	});
	
	
}

//head-bar  最上一层
function HeadBar(){
	//head-bar
	$(".myaccount,.app-download,.myservice").hover(function(){
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
		 * 	id : {
		 * 		name : "",
		 * 		enName :"",
		 *      price : 30,
 		 * 	    num : 1,
     	 *      src : "img/1.jpg"
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
function IsShopCartHeader(){
	
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
	//如果购物车没有东西，则执行display:none,有就执行display:block
	if(!cartStr){
		$("#header .head-main .head-shopcart span.txt-cartcount").css("display","none");
	}else{
		$("#header .head-main .head-shopcart span.txt-cartcount").css("display","inline");
	}
	$("#header .head-main .head-shopcart span.txt-cartcount").html(_sum);
	
	//btn-shopcart
	$("#header .head-main .head-shopcart a.btn-shopcart").mouseenter(function(){
		//显示隐藏的div
		$("#header .head-main .head-shopcart").addClass("head-shopcart-hover");
		//cookie是否有商品
		if(!cartStr){
			//清空
			$("#header .head-main .head-shopcart .shopcart-list").empty();
			$("#header .head-main .head-shopcart .shopcart-list").append(
				"<div class='empty'>您的购物车内暂时没有商品，去<a href='index.html'>首页</a></div>"
			);
	
		}else{
			//清空
			$("#header .head-main .head-shopcart .shopcart-list").empty();
			$("#header .head-main .head-shopcart .shopcart-list").append(
				"<ul></ul><div class='shopcart-sum'><a class='btn-viewcart' href='html/showCart.html' target='_blank'>查看购物车</a>"+
				"<p>共<em>"+_sum+"</em>件商品<br>总计： ¥<strong>"+_priceSum+"</strong></p></div>"
			);
			//遍历所有的商品生成html添加到购物车列表中
			for(var id in cartObj){
				//商品信息对象
				var good = cartObj[id];
				//由于图片地址的不一样，需要特别处理下
				var _list = good.src.split("/");
				var _srcStr = _list[1]+"/"+_list[2]+"/"+_list[3];
				var str = '<li data-good-id="'+id+'">'+
						  '<a class="prod-info" target="_blank" href="javascript:void(0);"><img width="60" height="98" alt="'+good.name+'" src="'+_srcStr+'" />'+
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
//					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//					var cartObj = convertCartStrToObj(cartStr);
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
							"<div class='empty'>您的购物车内暂时没有商品，去<a href='index.html'>首页</a></div>"
						);
					}else{
						
					}
			});	
		}
	});
	
	$("#header .head-main .head-shopcart").mouseleave(function(){
		$("#header .head-main .head-shopcart").removeClass("head-shopcart-hover");
	});
}

//footer 购物车  注意调用函数名字一定要不一样，否则只执行一个
function IsShopCartFooter(){
	
	//读取cookie里面的值
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var cartObj = convertCartStrToObj(cartStr);
	//计算总共加入购物车的数量  _sum
	var _sum = 0;
	var _n = 0;//遍历多少次
	var _priceSum = 0;
	for(var id in cartObj){
		var good1 = cartObj[id];
		_sum += parseInt(good1.num);
		_priceSum += parseInt(good1.num) * parseInt(good1.price);
	}

	//如果购物车没有东西，则执行display:none,有就执行display:block
	if(!cartStr){
		$("#util-floattop .head-shopcart .txt-cartcount").css("display","none");
	}else{
		$("#util-floattop .head-shopcart .txt-cartcount").css("display","inline");
	}
	$("#util-floattop .head-shopcart span.txt-cartcount").html(_sum);
	
	//btn-shopcart
	$("#util-floattop .head-shopcart a.btn-shopcart").mouseenter(function(){
		//显示隐藏的div
		$("#util-floattop .head-shopcart").addClass("head-shopcart-hover");
		//cookie是否有商品
		if(!cartStr){
			//清空
			$("#util-floattop .head-shopcart .shopcart-list").empty();
			$("#util-floattop .head-shopcart .shopcart-list").append(
				"<div class='empty'>您的购物车内暂时没有商品，去<a href='index.html'>首页</a></div>"
			);
			$("#util-floattop .head-shopcart .shopcart-list").css("top","-52px");
		}else{
			//清空
			$("#util-floattop .head-shopcart .shopcart-list").empty();
			$("#util-floattop .head-shopcart .shopcart-list").append(
				"<ul></ul><div class='shopcart-sum'><a class='btn-viewcart' href='html/showCart.html' target='_blank'>查看购物车</a>"+
				"<p>共<em>"+_sum+"</em>件商品<br>总计： ¥<strong>"+_priceSum+"</strong></p></div>"
			);
			//遍历所有的商品生成html添加到购物车列表中
			for(var id in cartObj){
				//商品信息对象
				var good = cartObj[id];
				//由于图片地址的不一样，需要特别处理下
				var _list = good.src.split("/");
				var _srcStr = _list[1]+"/"+_list[2]+"/"+_list[3];
				var str = '<li data-good-id="'+id+'">'+
						  '<a class="prod-info" target="_blank" href="javascript:void(0);"><img width="60" height="98" alt="'+good.name+'" src="'+_srcStr+'" />'+
						  '<span class="name">'+good.name+'</span>'+
						  '<span class="nameEn">'+good.enName+'</span>'+
						  '<span class="price"><strong>￥'+good.price+'</strong>×<em>'+good.num+'</em></span></a>'+
						  '<a title="'+good.name+'" data-good-id="'+id+'" class="btn-remove" href="javascript:void(0);" >删除</a></li>';
				//将上面的结构添加到cartList中去
				$(str).appendTo("#util-floattop .head-shopcart .shopcart-list ul");
				
				++_n;
				if(_n > 4){
					$("#util-floattop .head-shopcart .shopcart-list ul li:nth-child("+(_n-4)+")").remove();
					_n=4;
				}
				$("#util-floattop .head-shopcart .shopcart-list").css("top","-"+(55+109*(_n))+"px");
			}
			var _top = 55+109*(_n);
			var _n1 = _n;
			// 防止 _n越加越大
			_n=0;
			
			//删除cookie商品
			$("#util-floattop .head-shopcart .shopcart-list ul li a.btn-remove").click(function(){
				//在页面上将商品信息删除，顺便获取一个该商品的id
				var id = $(this).parent().remove().attr("data-good-id");
				//从cookie中将该商品删除
//				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//				var cartObj = convertCartStrToObj(cartStr);
				delete cartObj[id];
				//将新商品信息放回cookie
				$.cookie('cart' , convertObjToCartStr(cartObj) , {
					expires: 7,
					path: "/"
				});
				var cartStr1 = $.cookie("cart") ? $.cookie("cart") : "";
				if(!cartStr1){
					//清空
					$("#util-floattop .head-shopcart .shopcart-list").empty();
					$("#util-floattop .head-shopcart .shopcart-list").append(
						"<div class='empty'>您的购物车内暂时没有商品，去<a href='index.html'>首页</a></div>"
					);
					$("#util-floattop .head-shopcart .shopcart-list").css("top","-52px");
				}else{
					$("#util-floattop .head-shopcart .shopcart-list").css("top","-"+(55+109*(--_n1))+"px");
				}
			});	
		}
	});
	
	$("#util-floattop .head-shopcart").mouseleave(function(){
		$("#util-floattop .head-shopcart").removeClass("head-shopcart-hover");
	});
}

//footer 购物车  当滚动条拉倒一定程度 后  才出现
function IsShowCartFooter(){
	
	var _h = $(window).height();//获取可视高度
	var _st = $(document).scrollTop();//获取滚动条离顶部的高度
//	console.log(_st);
	if(_st >= _h){
		$("#util-floattop .head-shopcart a.btn-shopcart").css("display","block");
	}else{
		$("#util-floattop .head-shopcart a.btn-shopcart").css("display","none");
	}
}

$(window).scroll(function(e){
	new IsShowCartFooter();
});

$(document).ready(function() {
	
	//head-bar
	new HeadBar();
	// 二级 菜单
	new MenuTwo();
	//banner　透明度轮播
	new OpacityBanner().play(true);
	//main 首屏 左边
	new MainLeft();
	//猜你喜欢
	new LikeLeft();
	//main 首屏 右边
	new MainRight();
	//main 每个子目录下的 右边Tab
	new RightTab();
	//登录成功后
	new LoginSuccess();
	//head 购物车
	new IsShopCartHeader();
	//footer 购物车  当滚动条拉倒一定程度 后  才出现
	new IsShowCartFooter();
	//footer 购物车
	new IsShopCartFooter();

});