//酒具  main 轮播
function JiujuLunBo(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel-jiuju .section .main .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel-jiuju .section .main .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel-jiuju .section .main .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel-jiuju .section .main .channel-slider .slide-index span").removeClass("active");
			$(".channel-jiuju .section .main .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

//老酒  main 轮播
function LaojiuLunBo(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel-laoju .section .main .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel-laoju .section .main .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel-laoju .section .main .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel-laoju .section .main .channel-slider .slide-index span").removeClass("active");
			$(".channel-laoju .section .main .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

//白酒  main 轮播
function BaijiuLunBo(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel-baijiu .section .main .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel-baijiu .section .main .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel-baijiu .section .main .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel-baijiu .section .main .channel-slider .slide-index span").removeClass("active");
			$(".channel-baijiu .section .main .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

//洋酒，烈酒  main 轮播
function YangjiuLunBo(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel-yangjiu .section .main .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel-yangjiu .section .main .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel-yangjiu .section .main .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel-yangjiu .section .main .channel-slider .slide-index span").removeClass("active");
			$(".channel-yangjiu .section .main .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

//洋酒，烈酒  main 轮播
function WineLunBo(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel-wine .section .main .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel-wine .section .main .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel-wine .section .main .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel-wine .section .main .channel-slider .slide-index span").removeClass("active");
			$(".channel-wine .section .main .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

//酒友品鉴
function Winetasting(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 1;
	var _width = $(".section .main .mod-winetasting .bd li:nth-child(1)").width()*3;

	//向后点击
	$(".section .main .mod-winetasting .hd .minipage .btn-next").click(function(){
			
		if(_num < 11){
			_num++;
			$(".section .main .mod-winetasting .bd ul").animate({"margin-left":_width * (_num-1) * (-1)},'slow',function(){
	
				$(".section .main .mod-winetasting .hd .minipage .btn-prev").removeClass("disabled");
				$(".section .main .mod-winetasting .bd li").removeClass("e-childload");
				if(_num == 11){
					$(".section .main .mod-winetasting .hd .minipage .btn-next").addClass("disabled");
				}
				$(".section .main .mod-winetasting .hd .minipage .txt-page").html(_num + "/11");
				
			});
		}
	
	});
	//向前点击
	$(".section .main .mod-winetasting .hd .minipage .btn-prev").click(function(){
	
		if(_num > 1){
			_num--;
			
			$(".section .main .mod-winetasting .bd ul").animate({"margin-left":_width * (_num-1) * (-1)},'slow',function(){
	
				$(".section .main .mod-winetasting .hd .minipage .btn-next").removeClass("disabled");
				$(".section .main .mod-winetasting .bd li").removeClass("e-childload");
				if(_num == 1){
					$(".section .main .mod-winetasting .hd .minipage .btn-prev").addClass("disabled");
				}
				$(".section .main .mod-winetasting .hd .minipage .txt-page").html(_num + "/11");
				
			});
		}
	});
}

//刚刚被好评过的
function HaoPinLeft(){
	
	var _self = this;
	_self.flag = true;
	this.timer = 0;
	var _num = 0;
	var _width = $(".channel .hao_pin_left .channel-slider .slide-items li:nth-child(1)").width();
	var _length = $(".channel .hao_pin_left .channel-slider .slide-items li").length;
	//添加计时器
	this.start = function(){
		window.clearTimeout(_self.timer);
		_self.timer = window.setTimeout(_self.move,3000);
	}
	this.move = function(){
		if(_self.flag == false){
			_num++;
			if(_num == 0){
				_self.flag = true;
			}
		}else{
			_num--;
			if(_num == -1*(_length-1)){
				_self.flag = false;
			}
		}
		$(".channel .hao_pin_left .channel-slider .slide-items").animate({"margin-left":_width * _num},'slow',function(){
			window.clearTimeout(_self.timer);
			//下面的 1，2，3...
			$(".channel .hao_pin_left .channel-slider .slide-index span").removeClass("active");
			$(".channel .hao_pin_left .channel-slider .slide-index span:nth-child("+(-1*_num+1)+")").addClass("active");
			_self.timer = window.setTimeout(_self.move,3000);
		});
	}
}

$(document).ready(function(){
	
	//刚刚被好评过的
	new HaoPinLeft().start();
	//酒友品鉴
	new Winetasting();
	//进口葡萄酒  main 轮播
	new WineLunBo().start();
	//洋酒，烈酒  main 轮播
	new YangjiuLunBo().start();
	//白酒  main 轮播
	new BaijiuLunBo().start();
	//老酒  main 轮播
	new LaojiuLunBo().start();
	//酒具  main 轮播
	new JiujuLunBo().start();
	
});