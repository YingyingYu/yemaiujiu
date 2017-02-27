//list  中间内容 侧边栏
function CenterAside(){
	
	//获取地址  中文转码 decodeURI()函数 
	var _list = decodeURI(window.location.href).split("?");
	var _word = _list[1].replace(/[^\u4e00-\u9fa5]/g,"");
	$(".breadcrumb").append(
		"<a rel='nofollow' href='../index.html'>首页</a><span>></span><span class='wordSpan'>"+_word+"</span>"
	);
	
	//侧边栏 1
	
	$.ajax({
		type:"post",
		url:"../json/aside1.json",
		async:true,
		success:function(data){
//			console.log(data["aside1"].length);
			$.each(data["aside1"], function(i,item) {
				$(".content .aside .channel-type").append(
					"<div class='type-mod'><div class='type-mod-name'><span><em class='add'></em></span>"+
					"<a href='#'>"+item["title"]+"</a></div><ul class='hidden'></ul>"
				);
				
				if(i == 0){
					$(".content .aside .channel-type .type-mod:nth-child("+(i+2)+") ul").removeClass("hidden");
					$(".content .aside .channel-type .type-mod:nth-child("+(i+2)+") .type-mod-name span em").removeClass("add");
					$(".content .aside .channel-type .type-mod:nth-child("+(i+2)+") .type-mod-name span em").addClass("count");
				}
				
				$.each(item["types"], function(j,item1) {
					$(".content .aside .channel-type .type-mod:nth-child("+(i+2)+") ul").append(
						"<li><a href='#' rel='nofollow'>"+item1+"</a></li>"
					);
				});
			});
			
			
			$(".aside .channel-type .type-mod .type-mod-name span em").click(function(){
//				console.log($(this).parent().parent().next("ul"));
				if($(this).parent().parent().next("ul").hasClass("hidden")){//检测是否有特定的类名
					$(this).removeClass("add");
					$(this).addClass("count");
					$(this).parent().parent().next("ul").removeClass("hidden");
				}else{
					$(this).removeClass("count");
					$(this).addClass("add");
					$(this).parent().parent().next("ul").addClass("hidden");
				}
				
			});
	
		}
	});
	
	//侧栏 2 
	$.ajax({
		type:"post",
		url:"../json/aside2.json",
		async:true,
		success:function(data){
			$.each(data["aside2"], function(i,item) {
//				console.log(item["title"]);
				$(".content .aside .channel-topboard ul").append(
					"<li class='item' data-dts='L222'><em>"+(i+1)+"</em><a title='"+item["title"]+"' class='prod-img' target='_blank' href='#'>"+
					"<img width='60' height='98' border='0' alt='' src='../img/listImages/"+item["image"]+"'/></a>"+
					"<a title='"+item["title"]+"' class='prod-name' target='_blank' href='#'>"+item["title"]+"<span>"+item["en_title"]+"</span></a>"+
					"<span class='prod-price'>¥<strong>"+item["price"]+"</strong></span></li>"
				);
				if(i<=2){
					$(".content .aside .channel-topboard ul li:nth-child("+(i+1)+")").addClass("hot");
				}
				$(".content .aside .channel-topboard ul li").mouseenter(function(){
					var _num = $(this).index();
					$(".content .aside .channel-topboard ul li").removeClass("on");
					$(".content .aside .channel-topboard ul li").eq(_num).addClass("on");
				});
			});
		}
	});
	
	//侧栏 3 
	$.ajax({
		type:"post",
		url:"../json/aside3.json",
		async:true,
		success:function(data){
			$.each(data["aside3"], function(i,item) {
				$(".content .aside .channel-history ul").append(
					"<li class='' data-dts='L15'><a title='"+data["title"]+"' class='prod-img' target='_blank' href='#'>"+
					"<img width='60' height='98' border='0' alt='' src='../img/listImages/"+item["image"]+"'/></a>"+
					"<a title='"+item["title"]+"' class='prod-name' target='_blank' href='#'>"+item["title"]+"<span>"+item["en_title"]+"</span></a>"+
					"<span class='prod-price'>¥<strong>"+item["price"]+"</strong></span></li>"
				);
				if(i == data["aside3"].length-1){
					$(".content .aside .channel-history ul li:nth-child("+(i+1)+")").addClass("last");
				}
			});		
		}
	});
}

//list 中间内容 右侧 上面
function CenterRightUp(){
	
	//分类  名称
	$.ajax({
		type:"post",
		url:"../json/selector-items.json",
		async:true,
		success:function(data){
			$.each(data["selector-items"], function(i,item) {
				$(".content .main #goodSelector .selector-frame .selector-items").append(
					"<dl><dt>"+item["title"]+":</dt><dd><div class='topitems'></div></dd>"+
					"<div class='btn-option' style='display:none;'><a class='button btn-style' href='#'>确定</a><a class='btn-end' href='#'>取消</a></div></dl>"
				);
				if(i == 0){
					$(".content .main #goodSelector .selector-frame .selector-items dl").addClass("first");
				}
				
				$.each(item["types"], function(j,item1) {
					$(".content .main #goodSelector .selector-frame .selector-items dl:nth-child("+(i+1)+") dd .topitems").append(
						"<a rel='nofollow' href='#'><span class=''>"+item1+"</span></a>"
					);
					
				});
				
				if(i == data["selector-items"].length-1){
					$(".content .main #goodSelector .selector-frame .selector-items dl:nth-child("+(i+1)+") dd .topitems").addClass("items-price");
					$(".content .main #goodSelector .selector-frame .selector-items dl:nth-child("+(i+1)+") dd div.items-price").append(
						"<span class='custom-price'><input type='text' class='txt-input price-begin' value=''><em>-</em>"+
						"<input type='text' class='txt-input price-end'value='' ><input type='button' class='btn-common' value='确认' ></span>"
					);
				}else{
					$(".content .main #goodSelector .selector-frame .selector-items dl:nth-child("+(i+1)+") dd div").append(
						"<span class='multiple'>多选</span>"
					);
				}	
				
			});
			
			//点击多选
			var _num = 0;
			$(".main #goodSelector .selector-frame .selector-items dl .multiple").click(function(){
				_num = $(this).parent().parent().parent().index();
//				alert($(this).parent().parent().parent().index());
				$(".main #goodSelector .selector-frame .selector-items dl:nth-child("+(_num+1)+")").addClass("select");
				$(".main #goodSelector .selector-frame .selector-items dl:nth-child("+(_num+1)+") .btn-option").css( "display","block" );
				
			});
			
			$(".main #goodSelector .selector-frame .selector-items dl .topitems a").click(function(){
//				var _num1 = $(this).index();//只能选择一个
				$(this).addClass("active");
			});
			
			$(".main #goodSelector .selector-frame .selector-items dl .btn-option .btn-end").click(function(){
				$(".main #goodSelector .selector-frame .selector-items dl:nth-child("+(_num+1)+")").removeClass("select");
				$(".main #goodSelector .selector-frame .selector-items dl:nth-child("+(_num+1)+") .btn-option").css( "display","none" );
			});
		}
	});
}

//list 中间内容 右侧  good-nav
function GoodsNav(){
	//goods-nav
	$.ajax({
		type:"post",
		url:"../json/goods-nav.json",
		async:true,
		success:function(data){
			$.each(data["goods-nav"], function(i,item) {
				$(".main .goods #goodNavigatorV3 ul.first").append(
					"<li><a rel='nofollow' href='#'>"+item+"</a></li>"
				);
				$(".main .goods #goodNavigatorV3 ul.first li:nth-child(1)").addClass("on");
			});
		}
	});
}

//list 中间内容 右侧  sel-areas
function SelAreas(){
	//城市区域
	$.ajax({
		type:"post",
		url:"../json/sel-areas.json",
		async:true,
		success:function(data){
//			console.log(data);
			$.each(data["sel-areas"], function(i,item) {
				$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas").append(
					"<dd></dd>"
				);
				$.each(item, function(j,item1) {
					$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child("+(i+1)+")").append(
						"<a rel='nofollow' href='#'>"+item1+"</a>"
					);
				});
			});
			
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(2) a:nth-child(1)").addClass("on");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(2) a:nth-child(1)").addClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(2) a:nth-child(2)").addClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(3) a").addClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(3) a:nth-child(5)").removeClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(4) a:nth-child(1)").addClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(6) a:nth-child(1)").addClass("red");
			$(".main .goods #goodNavigatorV3 #areaSelector .sel-areas dd:nth-child(7) a:nth-child(1)").addClass("red");
			
			//如果想要滑上去 不消失  就应该在整个大块的div上
			$(".main .goods #goodNavigatorV3 #areaSelector").mouseover(function(){
				$(".main .goods #goodNavigatorV3 #areaSelector").addClass("goods-areaselector-hover");
			});
			$(".main .goods #goodNavigatorV3 #areaSelector").mouseout(function(){//有点问题
				$(".main .goods #goodNavigatorV3 #areaSelector").removeClass("goods-areaselector-hover");
			});
		}
	});
}

//list 中间内容 右侧  分页
function CenterRightPaging(){
	//列表
	$.ajax({
		type:"post",
		url:"../json/goodsList.json",
		async:true,
		success:function(data){
			
			var _count = data["goodsList"].length;
			var _sum = 0;
			for (var i=0; i<_count; i++) {
				_sum += parseInt(data["goodsList"][i]["goodsList"].length);
			}
			//最上面  fr 总共有多少件商品
			$(".content .main .selector-related").append(
				"<span class='fr'>共有<strong>"+_sum+"</strong>件商品</span>"
			);
		
			$.each(data["goodsList"][0]["goodsList"], function(i,item) {
				$(".main .goods #goodList .piclist").append(
					"<li class='list-item' data-good-id='0"+i+"' ><dl><dt><a href='#' target='_blank' class='pimg'><img src='../img/listImages/"+item["image"]+"' width='110' height='180' alt='"+item["title"]+"' style='opacity:1;' />"+
					"</a></dt><dd class='base'><a href='#' target='_blank' class='pname' title='"+item["title"]+"'>"+
					"<span class='cn'>"+item["less-title"]+"</span><span class='en' title='"+item["en-title"]+"'>"+item["en-title"]+"</span><span class='promo' title='"+item["promo"]+"'>"+item["promo"]+"</span></a>"+
					"<p class='price'><span class='minprice' style='color:#CC0000;'>¥<strong style='font-family:inherit;'>"+item["price"]+"</strong></span></p></dd>"+
					"<dd class='action'><p class='count'><label>数量：</label><a href='#' class='btn-down' >-</a><input type='text' class='txt-prodcount' value='1' ><a href='#' class='btn-up'>+</a></p>"+
					"<p><a href='javascript:void(0);' class='btn-style btn-add2cart'>加入购物车</a></p></dd><dd class='sum'><span class='ratecount'><strong style='color:#CC0000;'>"+item["ratecount"]+"</strong>好评度</span>"+
					"<span class='commentcount'><a href='#' target='_blank'><strong>"+item["commentcount"]+"</strong></a>评论</span><span class='soldnum'><strong>"+item["soldnum"]+"</strong>售出</span></dd>"+
					"<dd class='info'><ol></ol></dd></dl></li>"
				);
			});
					
			//一开始显示 的 商品列表 
			$(".main .goods .page").append(
				"<a href='javascript:void(0);' class='prev'>首页</a><a href='javascript:void(0);' class='prev'>上一页</a>"
			);
			for (var i=0; i<_count; i++) {
				$(".main .goods .page").append(
					"<a href='javascript:void(0);'>"+(i+1)+"</a>"
				);
			}
			$(".main .goods .page").append(
				"<a href='javascript:void(0);' class='next'>下一页</a><a href='javascript:void(0);' class='next'>尾页</a>"
			);
			 
			$(".main .goods .page a:nth-child(1)").css("display","none");//消失
			$(".main .goods .page a:nth-child(2)").css("display","none");
			$(".main .goods .page a:nth-child(3)").addClass("on");
			
			//<label>1/2</label>  计算
//			_count = _sum%2 ? Math.floor(_sum/2)+1 : _sum/2; //三目运算
			var _s = 1;
			$(".content .main .goods .goods-page-min").append(
				"<label>"+_s+"/"+_count+"</label><a class='prev disabled' href='javascript:void(0);'>上页</a><a class='next' href='javascript:void(0);'>下页</a>"
			);
			
			//商品列表上 的 分页  从 1 开始
			var _over = 0;
			$(".content .main .goods .goods-page-min a").click(function(){
				var _n2 = $(this).index();
//				alert(_n2);
				//如果class中有 disabled 既不能点击
				if($(this).hasClass("disabled") == false){
					if(_n2 == 2){
//						_s++;
						_over++;
						$(".content .main .goods .goods-page-min label").html((_over+1)+"/"+_count);
						if((_over+1) == _count){
							$(".content .main .goods .goods-page-min a:nth-child(3)").addClass("disabled");
						}
						$(".content .main .goods .goods-page-min a:nth-child(2)").removeClass("disabled");
					}
					
					if(_n2 == 1){
						_over--;
						$(".content .main .goods .goods-page-min label").html((_over+1)+"/"+_count);
						if((_over+1) == 1){
							$(".content .main .goods .goods-page-min a:nth-child(2)").addClass("disabled");
						}
						$(".content .main .goods .goods-page-min a:nth-child(3)").removeClass("disabled");
					}
					
					$(".main .goods #goodList .piclist").empty();
					$.each(data["goodsList"][_over]["goodsList"], function(i,item) {
						$(".main .goods #goodList .piclist").append(
							"<li class='list-item' data-good-id='"+(String(_over)+i)+"' ><dl><dt><a href='#' target='_blank' class='pimg'><img src='../img/listImages/"+item["image"]+"' width='110' height='180' alt='"+item["title"]+"' style='opacity:1;' />"+
							"</a></dt><dd class='base'><a href='#' target='_blank' class='pname' title='"+item["title"]+"'>"+
							"<span class='cn'>"+item["less-title"]+"</span><span class='en' title='"+item["en-title"]+"'>"+item["en-title"]+"</span><span class='promo' title='"+item["promo"]+"'>"+item["promo"]+"</span></a>"+
							"<p class='price'><span class='minprice' style='color:#CC0000;'>¥<strong style='font-family:inherit;'>"+item["price"]+"</strong></span></p></dd>"+
							"<dd class='action'><p class='count'><label>数量：</label><a href='#' class='btn-down' >-</a><input type='text' class='txt-prodcount' value='1' ><a href='#' class='btn-up'>+</a></p>"+
							"<p><a href='javascript:void(0);' class='btn-style btn-add2cart'>加入购物车</a></p></dd><dd class='sum'><span class='ratecount'><strong style='color:#CC0000;'>"+item["ratecount"]+"</strong>好评度</span>"+
							"<span class='commentcount'><a href='#' target='_blank'><strong>"+item["commentcount"]+"</strong></a>评论</span><span class='soldnum'><strong>"+item["soldnum"]+"</strong>售出</span></dd>"+
							"<dd class='info'><ol></ol></dd></dl></li>"
						);
					});
				}
				new AddShopCartPaging();
			});
			
			//商品列表下  的 分页  从0开始
			var _n1 = 2;
			$(".main .goods .page a").click(function(){
				var _n = $(this).index();
//				alert(_n);
				//首页
				if(_n == 0){
					$(".main .goods .page a:nth-child(1)").css("display","none");//消失
					$(".main .goods .page a:nth-child(2)").css("display","none");
					
					$(".main .goods .page a:nth-child("+(_count+3)+")").attr("style","");//显示
					$(".main .goods .page a:nth-child("+(_count+4)+")").attr("style","");
					
					$(".main .goods .page a").removeClass("on");
					$(".main .goods .page a:nth-child("+(_n+3)+")").addClass("on");
					
					_over = _n;
					
				}
				//尾页
				if(_n == _count+3){
					$(".main .goods .page a:nth-child(1)").attr("style","");//显示
					$(".main .goods .page a:nth-child(2)").attr("style","");
					
					$(".main .goods .page a:nth-child("+(_count+3)+")").css("display","none");//消失
					$(".main .goods .page a:nth-child("+(_count+4)+")").css("display","none");	
					
					$(".main .goods .page a").removeClass("on");
					$(".main .goods .page a:nth-child("+(_n-1)+")").addClass("on");
					
					_over = _n - 4;
					
				}
				//中间 1 2 ....
				if(_n > 1 && _n < _count+2){
					
					_n1 = _n;
					
					if(_n == _count+1){
						$(".main .goods .page a:nth-child(1)").attr("style","");//显示
						$(".main .goods .page a:nth-child(2)").attr("style","");
						
						$(".main .goods .page a:nth-child("+(_count+3)+")").css("display","none");//消失
						$(".main .goods .page a:nth-child("+(_count+4)+")").css("display","none");	
					}
					if(_n == _count){
						$(".main .goods .page a:nth-child(1)").css("display","none");//消失
						$(".main .goods .page a:nth-child(2)").css("display","none");
						
						$(".main .goods .page a:nth-child("+(_count+3)+")").attr("style","");//显示
						$(".main .goods .page a:nth-child("+(_count+4)+")").attr("style","");
					}
					
					$(".main .goods .page a").removeClass("on");
					$(".main .goods .page a:nth-child("+(_n+1)+")").addClass("on");
					
					_over = _n - 2;
					
					
				}
				//上一页
				if(_n == _count-1){
					_n1--;
					if(_n1 == _count){
						$(".main .goods .page a:nth-child(1)").css("display","none");//消失
						$(".main .goods .page a:nth-child(2)").css("display","none");
						
						$(".main .goods .page a:nth-child("+(_count+3)+")").attr("style","");//显示
						$(".main .goods .page a:nth-child("+(_count+4)+")").attr("style","");
					}
					
					$(".main .goods .page a").removeClass("on");
					$(".main .goods .page a:nth-child("+(_n1+1)+")").addClass("on");
					
					_over = _n1 - 2;
					
				}
				//下一页
				if(_n == _count+2){
					_n1++;
					if(_n1 == _count+1){
						$(".main .goods .page a:nth-child(1)").attr("style","");//显示
						$(".main .goods .page a:nth-child(2)").attr("style","");
						
						$(".main .goods .page a:nth-child("+(_count+3)+")").css("display","none");//消失
						$(".main .goods .page a:nth-child("+(_count+4)+")").css("display","none");	
					}
					
					$(".main .goods .page a").removeClass("on");
					$(".main .goods .page a:nth-child("+(_n1+1)+")").addClass("on");
					
					_over = _n1 - 2;
					
				}
				
				$(".main .goods #goodList .piclist").empty();
				$.each(data["goodsList"][_over]["goodsList"], function(i,item) {
					$(".main .goods #goodList .piclist").append(
						"<li class='list-item' data-good-id='"+(String(_over)+i)+"' ><dl><dt><a href='#' target='_blank' class='pimg'><img src='../img/listImages/"+item["image"]+"' width='110' height='180' alt='"+item["title"]+"' style='opacity:1;' />"+
						"</a></dt><dd class='base'><a href='#' target='_blank' class='pname' title='"+item["title"]+"'>"+
						"<span class='cn'>"+item["less-title"]+"</span><span class='en' title='"+item["en-title"]+"'>"+item["en-title"]+"</span><span class='promo' title='"+item["promo"]+"'>"+item["promo"]+"</span></a>"+
						"<p class='price'><span class='minprice' style='color:#CC0000;'>¥<strong style='font-family:inherit;'>"+item["price"]+"</strong></span></p></dd>"+
						"<dd class='action'><p class='count'><label>数量：</label><a href='#' class='btn-down' >-</a><input type='text' class='txt-prodcount' value='1' ><a href='#' class='btn-up'>+</a></p>"+
						"<p><a href='javascript:void(0);' class='btn-style btn-add2cart'>加入购物车</a></p></dd><dd class='sum'><span class='ratecount'><strong style='color:#CC0000;'>"+item["ratecount"]+"</strong>好评度</span>"+
						"<span class='commentcount'><a href='#' target='_blank'><strong>"+item["commentcount"]+"</strong></a>评论</span><span class='soldnum'><strong>"+item["soldnum"]+"</strong>售出</span></dd>"+
						"<dd class='info'><ol></ol></dd></dl></li>"
					);
				});
				new AddShopCartPaging();
			});
			new AddShopCartPaging();
		}
	});
}

//增加购物车里面的商品
function AddShopCartPaging(){
	
	//加载已有的购物车信息
	loadCart();
	//给购物车加一个跳转点击事件
	$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-cart-txt").click(function(){
		window.location.href = "showCart.html";
	});
	
	//给“加入购物车”按钮添加点击事件
	$(".main .goods #goodList .piclist .list-item dl dd.action p a.btn-add2cart").click(function(e){
		//获取商品的 id (用来区分不同的商品)
		var goodId = $(this).parent().parent().parent().parent().attr("data-good-id");
		//获取商品的名称
		var goodName = $(this).parent().parent().prev().children().eq(0).attr("title");
		//获取商品英文的名称
		var goodEnName = $(this).parent().parent().prev().children().children().eq(1).attr("title");
		//获取商品的价格
		var goodPrice = $(this).parent().parent().prev().children().eq(1).children().children().html();
		//获取商品的图片的地址
		var goodSrc = $(this).parent().parent().prev().prev().children().children().attr("src");
		//存到购物车中去，商品信息统一可以放在cookie当中
		//购物车中是否有商品？
		//购物车中是否加过同一个商品？
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
		/*设计以下结构的对象来处理商品信息
		 * 以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		 * {
		 * 	id : {
		 * 		name : "",
		 * 		enName : ""
		 *      price : ,
		 *      num : ,
		 *      src : "i"
		 *     }
		 * }
		 */
		//获取cookie中的信息
		//如果cookie中没有信息会返回一个undefined ,我所需要的是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		//将字符串转成对象
		var cartObj = convertCartStrToObj(cartStr);
		//判断该商品是否已经在购物车中存在
		if(goodId in cartObj){
			//如果已存在,那么该商品的数量加1
			cartObj[goodId].num += 1;
		}else{
			//如果不存在,那么将新的商品的信息存入
			cartObj[goodId] = {
				name : goodName,
				enName : goodEnName,
				price : goodPrice,
				num : 1,
				src : goodSrc
			};
		}
		
		//将新的购物车信息存回cookie
		//将对象转成字符串
		cartStr = convertObjToCartStr(cartObj);
		//存入cookie
		$.cookie("cart",cartStr,{expires : 7, path:"/"});
		
		//做一个飞入购物车的效果
		var cloneImg = $(this).parent().parent().prev().prev().children().children().clone().css({width:50,height:50});
		cloneImg.fly({
			start : {
				top : e.clientY,
				left : e.clientX
			},
			end : {
				top : $(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").offset().top,
				left : $(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").offset().left,
				width : 0,
				height : 0
			},
			autoPlay : true,
			onEnd : function(){
				$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").html(function(index,v){
					//"购物车（0）"
					console.log($(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").offset().top-450);
					console.log($(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").offset().left+220);
					var pattern = /(\d+)/;
					var num = parseInt(v.match(pattern)[1]);
					return num+1;
				});
				cloneImg.remove();//移除克隆的图片
			}				
		});
	});
}

$(document).ready(function(){

	//list 中间内容 侧边栏
	new CenterAside();
	//list 中间内容 右侧 上面
	new CenterRightUp();
	//list 中间内容 右侧  good-nav
	new GoodsNav();
	//list 中间内容 右侧  sel-areas  
	new SelAreas();
	//list 中间内容 右侧  分页
	new CenterRightPaging();
	//加入购物车
	new AddShopCartPaging();
	
});