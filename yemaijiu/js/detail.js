//增加购物车里面的商品
function AddShopCartMain(){
	
	//加载已有的购物车信息
	loadCart();
	//给购物车加一个跳转点击事件
	$(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart .ym-nBar-cart-txt").click(function(){
		window.location.href = "showCart.html";
	});
	
	//随时获取滚动高度
	var _st = "";
	$(window).scroll(function(e){
		_st = $(document).scrollTop();
	});
	
	//给“加入购物车”按钮添加点击事件
	$(".particulars .par_right .par_place .join").click(function(e){
		var _url = window.location.href;
		var _list = _url.split("?");
		//获取商品的 id (用来区分不同的商品)
		var goodId = _list[1];
		//获取商品的名称
		var goodName = "维莎赤霞珠干红葡萄酒";
		//获取商品英文的名称
		var goodEnName = "";
		//获取商品的价格
		var goodPrice = "49.0";
		//获取商品的图片的地址
		var goodSrc = "../img/indexImages/1267630_110x180.jpg";
		//存到购物车中去，商品信息统一可以放在cookie当中
		//购物车中是否有商品？
		//购物车中是否加过同一个商品？
		//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
		/*设计以下结构的对象来处理商品信息
		 * 以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		 * {
		 * 	id : {
		 * 		name : "香蕉",
		 * 		enName : "",
		 *      price : 30,
		 *      num : 1,
		 *      src : "img/1.jpg"
		 *  }
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
		var cloneImg = $(".particulars .par_left #big_pic img:nth-child(1)").clone().css({width:50,height:50});
		cloneImg.fly({
			start : {
				top : e.clientY,
				left : e.clientX
			},
			end : {
				top : $(".ym-nBar .ym-nBar-tabs .ym-nBar-tab-cart a .ym-nBar-cart-num em").offset().top-_st,
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

	//加入购物车  main 
	new AddShopCartMain();
	
});