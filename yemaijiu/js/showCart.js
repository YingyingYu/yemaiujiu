//温馨提示 关闭 listCartClose
function ListCartClose(){
	$(".warp .content .listCart #listCartClose span p a").click(function(){
		$(this).parent().parent().parent().hide();
	});
}

//购物车  tab 选项卡 cart_change_tab
function CartChangeTab(){
	
	$.ajax({
		type:"post",
		url:"../json/cartChangeTab.json",
		async:true,
		success:function(data){
			//在点击之前  显示第一个商品
			$.each(data["cartChangeTab"][0]["cartChangeTab"], function(i,item) {
				$(".warp .content .cart_change_tab ul:nth-child(2)").append(
					"<li class='goodlist'><a href='javascript:void(0);' target='_blank' style='overflow:hidden; display:block;float:left;'><img src='../img/cartImages/"+item["image"]+"' class='pics' /></a>"+
					"<dl><dt><a href='javascript:void(0);' target='_blank'>"+item["title"]+"</a><span class='en'></span><p>促销价：<br/><span class='change-price'>¥"+item["price"]+"</span></p>"+
					"<p class='goodsAmountCalc'><span class='jj_box'><a title='减少' class='subAmount otherSubAmount'>-</a><input name='input' class='editAmount otherEditAmount' type='text' value='1' maxlength='3' minvalue='1' maxvalue='500' >"+
					"<a title='增加' class='addAmount otherAddAmount' >+</a></span></p><p><a class='exchange cartPageAddGood' >加入购物车</a></p></dt></dl></li>"
				);
				//增加  减少 购物的件数
				$(".warp .content .cart_change_tab ul:nth-child(2) li").mouseenter(function(){
					var _num2 = $(this).index();
//					alert(_n);
					
					$(".warp .content .cart_change_tab ul:nth-child(2) li:nth-child("+(_num2+1)+") .goodsAmountCalc .jj_box .subAmount").click(function(){
						var _subValue = $(this).next().attr("value");
//						alert(_n);
						if(_subValue > 1){
							_subValue--;
						}
						$(this).next().attr("value",_subValue);
					});
					
					$(".warp .content .cart_change_tab ul:nth-child(2) li:nth-child("+(_num2+1)+") .goodsAmountCalc .jj_box .addAmount ").click(function(){
						var _addValue = $(this).prev().attr("value");
//						alert(_n);
						_addValue++;
						$(this).prev().attr("value",_addValue);
					});
					
				});
				
			});
			
			$.each(data["cartChangeTab"][1]["cartChangeTab"], function(i,item1) {
				$(".warp .content .cart_change_tab ul:nth-child(3)").append(
					"<li class='goodlist'><a href='javascript:void(0);' target='_blank' style='overflow:hidden; display:block;float:left;'><img src='../img/cartImages/"+item1["image"]+"' class='pics' /></a>"+
					"<dl><dt><a href='javascript:void(0);' target='_blank'>"+item1["title"]+"</a><span class='en'></span><p>促销价：<br/><span class='change-price'>¥"+item1["price"]+"</span></p>"+
					"<p class='goodsAmountCalc'><span class='jj_box'><a title='减少' class='subAmount otherSubAmount'>-</a><input name='input' class='editAmount otherEditAmount' type='text' value='1' maxlength='3' minvalue='1' maxvalue='500'  >"+
					"<a title='增加' class='addAmount otherAddAmount' >+</a></span></p><p><a class='exchange cartPageAddGood' >加入购物车</a></p></dt></dl></li>"
				);
				//增加  减少 购物的件数
				$(".warp .content .cart_change_tab ul:nth-child(3) li:nth-child("+(i+1)+") .goodsAmountCalc .jj_box .subAmount").click(function(){
					var _n = $(this).index();
					alert(_n);
				});
				
				$(".warp .content .cart_change_tab ul:nth-child(3) li:nth-child("+(i+1)+") .goodsAmountCalc .jj_box .addAmount ").click(function(){
					var _n = $(this).index();
					alert(_n);
				});
				
			});
			
			$(".warp .content .cart_change_tab ul:nth-child(4)").append(
				"请先登录在查看我的收藏信息！"
			);
			
			//点击显示商品
			var _num = 0;
			$(".warp .content .cart_change_tab ul.bd li").mouseenter(function(){
			
				var _num = $(this).index();
	
				$(".warp .content .cart_change_tab ul.bd li").removeClass("on");
				$(".warp .content .cart_change_tab ul.bd li:nth-child("+(_num+1)+")").addClass("on");
				
				$(".warp .content .cart_change_tab ul.hd").css("display","none");
				$(".warp .content .cart_change_tab ul:nth-child("+(_num+2)+")").css("display","block");
				
				//增加  减少 购物的件数 .warp .content .cart_change_tab ul.bd:nth-child(1) li:nth-child(1) dl dt 
//				$.each(data["cartChangeTab"][0]["cartChangeTab"], function(i,item1) {
//					
//					
//				});
//				$(".warp .content .cart_change_tab ul:nth-child("+(_num+2)+") li").onmouseenter(function(){
//					var _num1 = $(this).index();
//					alert(_num1);
//					
//					
//				});
				
				
				
//				//先清空
//				$(".warp .content .cart_change_tab ul.hd").empty();
//				
//				$.each(data["cartChangeTab"][_num]["cartChangeTab"], function(i,item1) {
//					
//					console.log(item1["title"] == undefined );
//					
//					if( data["cartChangeTab"][_num]["cartChangeTab"].length > 0){
//						$(".warp .content .cart_change_tab ul:nth-child("+(_num+2)+")").append(
//							"<li class='goodlist'><a href='javascript:void(0);' target='_blank' style='overflow:hidden; display:block;float:left;'><img src='../img/cartImages/"+item1["image"]+"' class='pics' /></a>"+
//							"<dl><dt><a href='javascript:void(0);' target='_blank'>"+item1["title"]+"</a><span class='en'></span><p>促销价：<br/><span class='change-price'>¥"+item1["price"]+"</span></p>"+
//							"<p class='goodsAmountCalc'><span class='jj_box'><a title='减少' class='subAmount otherSubAmount'>-</a><input name='input' class='editAmount otherEditAmount' type='text' value='1' maxlength='3' minvalue='1' maxvalue='500' >"+
//							"<a title='增加' class='addAmount otherAddAmount' >+</a></span></p><p><a class='exchange cartPageAddGood' >加入购物车</a></p></dt></dl></li>"
//						);
//					}else{
//						$(".warp .content .cart_change_tab ul:nth-child("+(_num+2)+")").append(
//							""+item1["title"]+""
//						);
//					}			
//				});
			});	
		
		}
	});
}

//购物车
function IsShopCart(){
	
	//取出在cookie中存的购物车信息
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var cartObj = convertCartStrToObj(cartStr);
	//计算总共加入购物车的数量  _sum
	var _sum = 0;
	var _priceSum = 0;
	for(var id in cartObj){
		var good1 = cartObj[id];
		_sum += parseInt(good1.num);
		_priceSum += parseInt(good1.num) * parseInt(good1.price);
		
		//如果商品数量 大于 1  "-"可点击  小于 500 "+"可点击
//		console.log(good1.num);
	}
	
	if(!cartStr){
		//清空
		$(".warp .content .listCart ul").empty();
		$(".warp .content .cartActivity").empty();
		
	}else{
		//清空
		$(".warp .content .listCart ul").empty();
		$(".warp .content .cartActivity").empty();
	
		$(".warp .content .listCart ul").append(
			"<li class='cartList cartLi_1-normal'><a name='a_1-normal' id='a_1-normal'></a><div class='radio radio_1-normal radio_zk'><span class='dd_sp_num cartType'>"+
			"<b class='cartGoodsNum_1-normal'>"+_sum+"</b><i></i></span><div class='radio_lf'>"+
			"<input name='orderSource' present='0' checked='checked' type='radio' value='1-normal' class='mr5 cart_radio cartType cartType_1-normal' >"+
			"<label for='orderSource_0' class='cartType'><b></b>由也买酒配送</label></div></div>"+
			"<div class='top cartDto cart_1-normal' id='orderSource_0_detail' style='display:block;'><div class='boxBorRed clearfix'><div class='trTitle'>"+
			"<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr><td height='34' width='8%'><input class='e-selall selectAll selectAll_1-normal' type='checkbox' name='checkbox'>"+
			"<label for='checkbox0_t' style='cursor: pointer;'>全选</label></td><td>商品名称</td><td width='13%'>单价</td><td width='13%'>数量</td><td width='13%'>小计</td><td width='13%'>&nbsp;</td></tr></table></div>"+
			"<div class='marginTop cartGoodsList cartGoodsList_1-normal' name='goodsList_carttype'><table width='100%' cellspacing='0' cellpadding='0' class='inTable' id='tbHover' data-carttype='1-normal'></table></div>"+
			"<div class='trFooter'><ul><li><input class='e-selall selectAll selectAll_1-normal' type='checkbox' name='checkbox'><label>全选</label></li><li class='removeSelectedGoods'>批量删除</li><li class='addSelectedFavorite clicktr'>批量加入收藏夹</li></ul></div></div></div></li>"+
			"<li class='last chooseResult'><div class='subtotal subtotal_1-normal'><span class='fl' style='color:red;'></span><span class='jg'>商品件数：<b class='subTotalNum_1-normal'>"+_sum+"</b>件</span>"+
			"<span>商品总价：<b>¥<input type='hidden' id='oldSumPriceAll0' value='"+_priceSum+"'><i>"+_priceSum+"</i></b></span>"+
			"<span class='buy_yh'>活动优惠：<b>¥<em>0</em></b></span><span class='buy_yh'>优惠券：<b>¥<em class='lqzCouponPrivilege_1-normal'>0</em></b></span></div></li>"+
			"<li class='buy'><div id='floatNav_buy' class='listCart listCart-fixed  cartCoupon cartCoupon_1-normal' data-carttype='1-normal' style='display:block;'><ul class='clearfix'>"+
			"<li class='buy'><div class='payexpress_panl' id='quick_check_out_div' style='display:none'></div><a class='buy'>去结算</a><a class='buy_bc memberGift memberGift_1-normal' style='cursor: default;'><font class='noGift' style='cursor: default;'>没有可领取礼品</font></a>"+
			"<div class='buy_yhq_y couponList_1-normal'>商品没有符合优惠券使用条件</div><a class='total_price'>商品数量<b class='total_num_1-normal' style=' font: bold 14px Arial;'>"+_sum+"</b>&nbsp;件&nbsp;&nbsp;"+
			"<strong>应付金额</strong><em>(不含运费)</em>：<i>¥</i><b class='total total_1-normal'>"+_priceSum+"</b></a></li></ul></div></li>"
			
		);
		
		//遍历所有的商品生成html添加到购物车列表中
		for(var id in cartObj){
			//商品信息对象
			var good = cartObj[id];
			//
			var str = '<tr class="border" data-good-id="'+id+'" class="'+id+'" ><td width="8%" class="btn_fx"><input type="checkbox" name="goodsSelect" value="" class="goodsSelect" checked="checked" ></td>'+
					  '<td width="8%" class="left"><a href="javascript:;" target="_blank" class="prod-img"><img src="'+good.src+'" /></a></td>'+
					  '<td class="left"><a href="javascript:;" target="_blank" class="title">'+good.name+'</a><br/>'+good.enName+'<br/><span class="red"></span><br/><ins id="error_5152044"></ins></td>'+
					  '<td width="13%" class="dj_price">¥<b>'+good.price+'</b><br/></td>'+
					  '<td width="13%"><span class="jj_box"><a title="减少" class="left subAmount cartSubAmount">-</a><input name="input" class="editAmount cartEditAmount" type="text" value="'+good.num+'" maxlength="3" minvalue="1" maxvalue="500"><a title="增加" class="right addAmount cartAddAmount">+</a></span></td>'+
					  '<td class="xj_price" width="13%">¥<b>'+good.price+'</b></td><td width="13%" class="btn_edit"><div class="tip_fram col-blue addFavoriteSuccess" style="display:none;"><div class="tip_content"><p><i class="suc-icon"></i></p></div><b class="tip_icon"></b></div>'+
					  '<div class="tip_fram col-red addFavoriteFail" style="display:none;"><div class="tip_content"><p><i class="ero-icon"></i>已经收藏过本商品！</p></div><b class="tip_icon"></b></div><a data-good-id="'+id+'" class="addFavorite">加入收藏夹</a><br/><a class="btn-remove removeGoods">删除</a></td></tr>'
			//将上面的结构添加到cartList中去
			$(str).appendTo(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover");
		}
		
		//本次购买您可享受以下活动
		new EnjoyPrivilege();
		
		//再遍历一遍   //增加  或 减少 (一开始  在页面上显示  “-”  或  “+”)
//		var _n = 0;
//		var id3 = $(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr").attr("data-good-id");
//		for(var id3 in cartObj){
//			var good3 = cartObj[id3];
//			_n++;
//			
//			if(parseInt(good3.num) > 1 && parseInt(good3.num) < 500){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+_n+") .jj_box a.left").removeClass("left_jy");
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+_n+") .jj_box a.right").removeClass("right_jy");
//			}
//			if(parseInt(good3.num) == 1){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+_n+") .jj_box a.left").addClass("left_jy");
//			}
//			if(parseInt(good3.num) == 500){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+_n+") .jj_box a.right").addClass("right_jy");
//			}
//		}
		
		//删除
		$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr .btn_edit .btn-remove").click(function(){
			//从页面上将商品信息删除,顺便获取一个该商品的id
			var id = $(this).parent().parent().remove().attr("data-good-id");
			//从cookie中将该商品删除
//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//			var cartObj = convertCartStrToObj(cartStr);

			_sum -= parseInt(cartObj[id].num);//总数量
			_priceSum -= parseInt(cartObj[id].price) * parseInt(cartObj[id].num);//总价格
			if(_sum > 0){
				//更新页面上数量
				$(".warp .content ul .chooseResult .subtotal .jg .subTotalNum_1-normal").html(_sum);
				$(".warp .content ul .buy .listCart .buy .total_price .total_num_1-normal").html(_sum);
				//更新页面上价格
				$(".warp .content ul .chooseResult .subtotal span:nth-child(3) i").html(_priceSum);
				$(".warp .content ul .buy .listCart .buy .total_price .total_1-normal").html(_priceSum);
			}else{
				$(".warp .content .listCart ul").empty();
				$(".warp .content .cartActivity").remove();
			}
			
			
			//删除 cookie 的记录
			delete cartObj[id];
			//将新的商品信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj),{
				expires:7,
				path:"/"
			});
		});
		
		//给增加按钮添加事件
		$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr span.jj_box a.addAmount").click(function(){
			
			var id = $(this).parent().parent().parent().attr("data-good-id");
			var _n2 = $(this).index();
			
//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//			var cartObj = convertCartStrToObj(cartStr);
			cartObj[id].num += 1;
			
//			if(parseInt(cartObj[id].num) > 1 && parseInt(cartObj[id].num) < 500){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n2+1)+") .jj_box a.left").removeClass("left_jy");
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n2+1)+") .jj_box a.right").removeClass("right_jy");
//			}
//			if(parseInt(cartObj[id].num) == 1){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n2+1)+") .jj_box a.left").addClass("left_jy");
//			}
//			if(parseInt(cartObj[id].num) == 500){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n2+1)+") .jj_box a.right").addClass("right_jy");
//			}
			
			_sum += 1;//总数量
			_priceSum += parseInt(cartObj[id].price);//总价格
			//将页面上显示的数量加1
			$(this).siblings("input").val(cartObj[id].num);
			//更新页面上数量
			$(".warp .content ul .chooseResult .subtotal .jg .subTotalNum_1-normal").html(_sum);
			$(".warp .content ul .buy .listCart .buy .total_price .total_num_1-normal").html(_sum);
			//更新页面上价格
			$(".warp .content ul .chooseResult .subtotal span:nth-child(3) i").html(_priceSum);
			$(".warp .content ul .buy .listCart .buy .total_price .total_1-normal").html(_priceSum);
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj),{
				expires: 7,
				path: "/"
			});
		});
		
		//给减少按钮添加事件
		$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr span.jj_box a.subAmount").click(function(){
			
			var id = $(this).parent().parent().parent().attr("data-good-id");
			var _n1 = $(this).index();
			
//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//			var cartObj = convertCartStrToObj(cartStr);
//			if(cartObj[id].num > 1){
//				
//			}
			
			if(parseInt(cartObj[id].num) > 1 && parseInt(cartObj[id].num) < 500){//商品数量减少不能少于1
				
				cartObj[id].num -= 1;
				_sum -= 1;//总数量
				_priceSum -= parseInt(cartObj[id].price);//总价格
				
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n1+1)+") .jj_box a.left").removeClass("left_jy");
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n1+1)+") .jj_box a.right").removeClass("right_jy");
			}
//			if(parseInt(cartObj[id].num) == 1){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n1+1)+") .jj_box a.left").addClass("left_jy");
//			}
//			if(parseInt(cartObj[id].num) == 500){
//				$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr:nth-child("+(_n1+1)+") .jj_box a.right").addClass("right_jy");
//			}
			
			//将页面上显示的数量减1
			$(this).siblings("input").val(cartObj[id].num);
			//更新页面上数量
			$(".warp .content ul .chooseResult .subtotal .jg .subTotalNum_1-normal").html(_sum);
			$(".warp .content ul .buy .listCart .buy .total_price .total_num_1-normal").html(_sum);
			//更新页面上价格
			$(".warp .content ul .chooseResult .subtotal span:nth-child(3) i").html(_priceSum);
			$(".warp .content ul .buy .listCart .buy .total_price .total_1-normal").html(_priceSum);
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj),{
				expires: 7,
				path: "/"
			});
		});
		//改变数量的input绑定一个blur事件
		$(".warp .content .listCart ul .cartList .top .cartGoodsList table#tbHover tr span.jj_box .editAmount").blur(function(){
			
			var id = $(this).parent().parent().parent().attr("data-good-id");
			
//			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//			var cartObj = convertCartStrToObj(cartStr);
			//判断用户是否合法
			console.log($(this).val());
			var pattern = /^\d+$/;
			$(this).val().lastIndex = 0;
			if(!pattern.test($(this).val())){
				cartObj[id].num = 1;
				$(this).val("1");
			}else{
				//修改下数量
				cartObj[id].num = parseInt($(this).val());
			}
			//修改input里面的值
			$(this).val(cartObj[id].num);
			//将信息放回cookie
			$.cookie('cart', convertObjToCartStr(cartObj),{
				expires: 7,
				path: "/"
			});
			
			//需要在遍历一遍
			var _sum2 = 0;
			var _priceSum2 = 0;
			for(var id in cartObj){
				var good2 = cartObj[id];
				_sum2 += parseInt(good2.num);
				_priceSum2 += parseInt(good2.num) * parseInt(good2.price);
			}
			
			//更新页面上数量
			$(".warp .content ul .chooseResult .subtotal .jg .subTotalNum_1-normal").html(_sum2);
			$(".warp .content ul .buy .listCart .buy .total_price .total_num_1-normal").html(_sum2);
			//更新页面上价格
			$(".warp .content ul .chooseResult .subtotal span:nth-child(3) i").html(_priceSum2);
			$(".warp .content ul .buy .listCart .buy .total_price .total_1-normal").html(_priceSum2);	
		});
	}
}

//本次购买您可享受以下活动
function EnjoyPrivilege(){
	
	$.ajax({
		type:"post",
		url:"../json/cartActivity.json",
		async:true,
		success:function(data){
//			console.log(data);
			$(".warp .content .cartActivity").append(
				"<h1>本次购买您可享受以下活动"+
				"<ins> 所有0元赠品已自动添加到您的购物车中，您可直接结算</ins></h1><ul></ul>"
			);
			$.each(data["cartActivity"], function(i,item) {
				$(".warp .content .cartActivity ul").append(
					"<li data-good-id='EP"+i+"' data-carttype='1-normal'><h2>订单满1元加"+item["changePrice"]+"元换购</h2><dl><h3>"+
					"<a href='javascript:;' target='_blank'><img src='../img/cartImages/"+item["image"]+"' width='110' height='180' /></a></h3>"+
					"<dt><a href='javascript:;' target='_blank'>"+item["title"]+"</a><br/><span></span></dt><dd>"+
					"<input type='hidden' id='plusMoneyOne00' value='' >换购价："+
					"<b class='cartInitialize' cartindex='0' presentindex='0' id='plusMoney00' ></b>"+item["changePrice"]+"元<br/>"+
					"<input type='hidden' id='isSelect_00'>也买价："+item["yemaiPrice"]+"元<br/><span style='color:#777777;'>数&nbsp;&nbsp;量:</span>"+
					"<span><input type='text' name='giftCountB0' value='1' style='width:28px' maxlength='6' ><br/></span><b>"+item["num"]+"</b>瓶</dd>"+
					"<dd><span class='span-addtocart'><a class='presentAddGoods'>加入购物车</a></span></dd></dl></li>"
				);
			});
		}
	});
	
}

$(document).ready(function(){

	//温馨提示 关闭
	new ListCartClose();
	//购物车
	new IsShopCart();
	//购物车  tab 选项卡 cart_change_tab
	new CartChangeTab();
	
});