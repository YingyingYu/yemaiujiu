//我有vip升级码
function VipUpgrade(){
	var _num = 0;
	$(".login .box-main form #vip .chk-vip").mouseup(function(){
		_num++;
		if(_num == 1){
			$(".login .box-main form #vipinfo").css({display:"block"});
		}else{
			_num = 0;
			$(".login .box-main form #vipinfo").css({display:"none"});
		}
//margin:5px 10px;padding:10px 10px;border:solid 1px #eedaae; height:auto;
//		$(".login .box-main form #vipinfo").animate({display:"block"},1000);
	});
	$(".login .box-main form #vip span").mouseup(function(){
		_num++;
		if(_num == 1){
			$(".login .box-main form #vipinfo").css({display:"block"});
		}else{
			_num = 0;
			$(".login .box-main form #vipinfo").css({display:"none"});
		}
	});
	
}

//短信验证码
function NoteRandCode(){
	
	$(".login .box-main form .txt-smsCode").focus(function(){
		$(this).removeClass("hint-randcode");
	});
	
	$(".login .box-main form .txt-smsCode").blur(function(){
		if($(".login .box-main form .txt-smsCode").val() == ""){
			$(this).addClass("hint-randcode");
		}
	});
	
	$(".login .box-main form .btn-style").click(function(){
		
		//验证数据库是否注册过了
		$.post("../api/checkUser.php",{"condition":"mobile='"+$(".login .box-main form .txt-user").val()+"'"},function(data,textStatus){
			if(textStatus == "success" && parseInt(data) > 0){
				$(".login .box-main form .txt-user").removeClass("hint-user");
				$(".login .box-main form .registerMobileError").removeClass("hidden");
				if($(".login .box-main form .registerMobileError label").length > 0){
					$(".login .box-main form .registerMobileError label").html("该手机号已注册或绑定，请重新输入。如果您是该用户,请立刻 <a href='login.html'>登录</a>");
				}else{
					$(".login .box-main form .registerMobileError").append("<label for='registerPassword' class='error'></label>");
					$(".login .box-main form .registerMobileError label").html("该手机号已注册或绑定，请重新输入。如果您是该用户,请立刻 <a href='login.html'>登录</a>");
				}
				return;
			}else{
				$(".login .box-main form .txt-user").removeClass("error");
				$(".login .box-main form .txt-user").addClass("valid");
				$(".login .box-main form .registerMobileError label").remove();
				$(".login .box-main form .registerMobileError").addClass("hidden");
			}
			
			//验证码是否正确
			if(new RandCode().prove() == "error"){
				
			}else{
				if($(".login .box-main form .txt-smsCode").val() != ""){
					return;
				}
				
				$(".login .box-main form .btn-style").css({display:"none"});
				$(".login .box-main form .info").css({display:"block"});
				
				//获取120秒
				var mills = $(".login .box-main form .info em").html();
		//		alert(typeof mills == "string");
				var _self = this;
				this.timer = 0;
				
				this.noteTime = function(){
					window.clearTimeout(_self.timer);
					mills = parseInt(mills)-1;
					$(".login .box-main form .info em").html(mills);
		//			alert(typeof mills == "String");
		//			console.log($(".login .box-main form .txt-smsCode").val());
					if($(".login .box-main form .txt-smsCode").val() != ""){
						
						$(".login .box-main form .txt-smsCode").removeClass("hint-randcode");
						$(".login .box-main form .btn-style").css({display:"inline-block"});
						$(".login .box-main form .info").css({display:"none"});
						$(".login .box-main form .info em").html("120");
					}
					
					if(mills == 0){
						$(".login .box-main form .btn-style").css({display:"inline-block"});
						$(".login .box-main form .info").css({display:"none"});
						$(".login .box-main form .info em").html("120");
					}else{
						_self.timer = window.setTimeout(_self.noteTime,1000);
					}
				}
				//调用  短信验证码判断  倒计时
				_self.noteTime();
			}
		});
		
		
	});
}

//验证码
function RandCode(){
	
	var _n = 0;
	var _num = 0;
	var _randCode = "";
	var _inputCode = "";
	var _self = this;
	
	$(".login .box-main form .txt-imgCode").focus(function(){
		$(".login .box-main form .txt-imgCode").removeClass("hint-randcode");
	});
	
	if($(".login .box-main form .txt-imgCode").val() != ""){
		$(".login .box-main form .txt-imgCode").blur(function(){
			$(".login .box-main form .txt-imgCode").addClass("hint-randcode");
		});
	}

	$(".login .box-main form .rand-code").click(function(){
		_randCode = "";
		for (var i=0; i<4; i++) {
			_randCode += _self.pan();
			$(this).html(_randCode);
		}
	});
//	console.log("--"+$(".login .box-main form .rand-code").html().charCodeAt(0));
	//验证
	this.prove = function(){
		_inputCode = $(".login .box-main form #randCode").val();
		_randCode = $(".login .box-main form .rand-code").html();
		if(_inputCode.length>4 || _inputCode.length<=0 ){
			$(".login .box-main form .imgCodeError").removeClass("hidden");
			$(".login .box-main form .imgCodeError").html("验证码错误,请重新输入");
			return "error";
		}else{
			for (var i=0; i<_randCode.length; i++) {
				if(_inputCode.charCodeAt(i) == _randCode.charCodeAt(i) || _inputCode.charCodeAt(i) == _randCode.charCodeAt(i)+32){
					if(_num%3==0 && _num!=0){
						$(".login .box-main form .imgCodeError").addClass("hidden");
						return "success";
					}else{
						_num++;
					}
				}else{
					$(".login .box-main form .imgCodeError").removeClass("hidden");
					$(".login .box-main form .imgCodeError").html("验证码错误,请重新输入");
					return "error";
				}
			}
		}
	}
	this.pan = function(){
		_n = Math.floor(Math.random()*91);
		while(!((_n>=48 && _n<57) || (_n>=65 && _n<90))){
			_n = Math.floor(Math.random()*91);
		}
		return String.fromCharCode(_n);
	}	
}

//注册  手机号  和 密码
function Register(){
	var _reg = {
		"mobile":/^1[345678]\d{9}$/g, //验证手机号
		"pwd":/^[a-zA-Z\d]{6,20}$/g //验证密码
	}
    
    //手机号码
	$(".login .box-main form .txt-user").focus(function(){
		_reg.mobile.lastIndex = 0;
		if($(this).val() == ""){
			$(".login .box-main form .txt-user").removeClass("hint-user");
			$(".login .box-main form .registerMobileError").removeClass("hidden");
			$(".login .box-main form .registerMobileError label").html("请输入手机号");
		}else{
			if(_reg.mobile.test($(this).val())){
//				$(".login .box-main form .registerMobileError label").html("");
				$(".login .box-main form .txt-user").removeClass("error");
				$(".login .box-main form .txt-user").addClass("valid");
				$(".login .box-main form .registerMobileError label").remove();
				$(".login .box-main form .registerMobileError").addClass("hidden");
			}else{
				$(".login .box-main form .registerMobileError label").html("请输入正确手机号");
			}
		}
	}); 
	
	//密码
	$(".login .box-main form .txt-pass").focus(function(){
		_reg.pwd.lastIndex = 0;
//		console.log("11  "+$(this).val());
		if($(this).val() == ""){
			
			$(".login .box-main form .txt-pass").removeClass("hint-pass");
			$(".login .box-main form .registerPasswordError").removeClass("hidden");

			if($(".login .box-main form .registerPasswordError label").length > 0){
				$(".login .box-main form .registerPasswordError label").html("请输入密码");
			}else{
				$(".login .box-main form .registerPasswordError").append("<label for='registerPassword' class='error'></label>");
				$(".login .box-main form .registerPasswordError label").html("请输入密码");
			}
		}else{
			if(_reg.pwd.test($(this).val())){
				$(".login .box-main form .txt-pass").removeClass("error");
				$(".login .box-main form .txt-pass").addClass("valid");
				$(".login .box-main form .registerPasswordError label").remove();
				$(".login .box-main form .registerPasswordError").addClass("hidden");
			}else{
				$(".login .box-main form .registerPasswordError label").html("密码请设为6-16位字母或数字");
			}
		}	
	});
	
	//再次输入密码
	$(".login .box-main form .txt-pass2").focus(function(){
		$(".login .box-main form .txt-pass2").removeClass("hint-pass2");
		if($(".login .box-main form .registerPasswordRepeatError label").length > 0){
			
		}else{
			$(".login .box-main form .registerPasswordRepeatError").append("<label for='registerPasswordRepeat' class='error'></label>");
		}
	});
	
	$(".login .box-main form .txt-pass2").blur(function(){
		_reg.pwd.lastIndex = 0;
		
		if($(this).val() == ""){
			$(".login .box-main form .txt-pass2").removeClass("hint-pass2");
			$(".login .box-main form .registerPasswordRepeatError").removeClass("hidden");
			$(".login .box-main form .registerPasswordRepeatError label").html("请再次输入密码");
		}else{
			if(_reg.pwd.test($(this).val())){
//				console.log("--- "+$(".login .box-main form .txt-pass").val());
//				console.log("-22-- "+$(this).val());
				if($(".login .box-main form .txt-pass").val() == $(this).val()){
					$(".login .box-main form .txt-pass2").removeClass("error");
					$(".login .box-main form .txt-pass2").addClass("valid");
					$(".login .box-main form .registerPasswordRepeatError label").remove();
					$(".login .box-main form .registerPasswordRepeatError ").addClass("hidden");
				}else{
					$(".login .box-main form .txt-pass2").removeClass("hint-pass2");
					$(".login .box-main form .registerPasswordRepeatError").removeClass("hidden");
					$(".login .box-main form .registerPasswordRepeatError label").html("两次密码输入不一致");
				}
			}else{
				$(".login .box-main form .txt-pass2").removeClass("hint-pass2");
				$(".login .box-main form .registerPasswordRepeatError").removeClass("hidden");
				$(".login .box-main form .registerPasswordRepeatError label").html("密码请设为6-16位字母或数字");
			}
		}	
	});
	
	//点击 注册
	$(".login .box-main form #btn-register").click(function(){
//		console.log(new RandCode().prove());//验证码
//		console.log($(".login .box-main form .txt-smsCode").val());
		var pwd_f = $(".login .box-main form .txt-pass").val();
		var pwd_s = $(".login .box-main form .txt-pass2").val();
		if(pwd_f == pwd_s && new RandCode().prove() == "success" && $(".login .box-main form .txt-smsCode").val() != ""){
			var _params = {
				"mobile":$(".login .box-main form .txt-user").val(),
				"pwd":$(".login .box-main form .txt-pass").val()
			};
			_reg.mobile.lastIndex=0;
			_reg.pwd.lastIndex=0;
			if(_reg.mobile.test(_params.mobile) && _reg.pwd.test(_params.pwd)){
				$.post("../api/registerUser.php",_params,function(data,textStatus){
					if(textStatus == "success" && parseInt(data) > 0){
						//调转到首页  带着手机号
//						$.cookie("mobile",_params.mobile);
//						$.cookie("pwd",_params.pwd);
						window.location.href="login.html";
//						console.log("成功了");
					}else{
						//注册会员失败
						alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
					}
				});
			}else{
				//信息没填完
				alert("尊敬的用户您好，您的基本信息不完整，为了安全请完善！！");
			}
		}else{
			//密码不一样
			if($(".login .box-main form .txt-user").val() == ""){
				if($(".login .box-main form .registerMobileError label").length > 0){
					$(".login .box-main form .registerMobileError label").html("请输入手机号");
				}else{
					$(".login .box-main form .registerMobileError").append("<label for='registerMobile' class='error'></label>");
					$(".login .box-main form .registerMobileError label").html("请输入手机号");
				}
				$(".login .box-main form .registerMobileError").removeClass("hidden");
			}
			if($(".login .box-main form .txt-imgCode").val() == ""){
				if($(".login .box-main form .imgCodeError").length > 0){
					$(".login .box-main form .imgCodeError").html("");
				}
				if($(".login .box-main form .imgCodeError  label").length > 0){
					$(".login .box-main form .imgCodeError label").html("请输入验证码");
				}else{
					$(".login .box-main form .imgCodeError").append("<label for='imgCode' class='error'></label>");
					$(".login .box-main form .imgCodeError label").html("请输入验证码");
				}
				$(".login .box-main form .imgCodeError").removeClass("hidden");
			}
			if($(".login .box-main form .txt-smsCode").val() == ""){
				if($(".login .box-main form .smsCodeError  label").length > 0){
					$(".login .box-main form .smsCodeError label").html("请输入验证码");
				}else{
					$(".login .box-main form .smsCodeError").append("<label for='smsCode' class='error'></label>");
					$(".login .box-main form .smsCodeError label").html("请输入验证码");
				}
				$(".login .box-main form .smsCodeError").removeClass("hidden");
			}
			if($(".login .box-main form .txt-pass").val() == ""){
				if($(".login .box-main form .registerPasswordError label").length > 0){
					$(".login .box-main form .registerPasswordError label").html("请输入密码");
				}else{
					$(".login .box-main form .registerPasswordError").append("<label for='registerPassword' class='error'></label>");
					$(".login .box-main form .registerPasswordError label").html("请输入密码");
				}
				$(".login .box-main form .registerPasswordError").removeClass("hidden");
			}
			if($(".login .box-main form .txt-pass2").val() == ""){
				if($(".login .box-main form .registerPasswordRepeatError label").length > 0){
					$(".login .box-main form .registerPasswordRepeatError label").html("请再次输入密码");
				}else{
					$(".login .box-main form .registerPasswordRepeatError").append("<label for='registerPasswordRepeat' class='error'></label>");
					$(".login .box-main form .registerPasswordRepeatError label").html("请再次输入密码");
				}
				$(".login .box-main form .registerPasswordRepeatError").removeClass("hidden");
			}
		}
	});	
}

$(document).ready(function(){
	
	//验证码
	new RandCode();
	//短信验证码
	new NoteRandCode();
	//我有Vip升级码
	new VipUpgrade();
	//注册  手机号和密码
	new Register();
	
});