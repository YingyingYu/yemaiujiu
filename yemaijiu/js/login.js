

//登录 E-mail 或 手机号
function User(){
	
	var _reg = {
		"mobile":/^1[345678]\d{9}$/g,
		"email":/^\w+@([a-z0-9-]+\.)+[a-z]+$/g
	};
	
	$(".login .box-main form .txt-user").focus(function(){
		$(".login .box-main form .txt-user").removeClass("hint-user");
	});
	
	$(".login .box-main form .txt-user").blur(function(){
		_reg.mobile.lastIndex = 0;
		_reg.email.lastIndex = 0;
		
		if($(this).val() == ""){
			$(".login .box-main form .txt-user").addClass("hint-user");
			
			if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
				$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
				$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
			}else{
				$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
				$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
			}
		}else{
			$(".login .box-main form .txt-user").removeClass("hint-user");

			if(_reg.mobile.test($(this).val()) || _reg.email.test($(this).val())){

				$(".login .box-main form dl:nth-child(1) dd span").html("");
				$(".login .box-main form dl:nth-child(1) dd span").addClass("hidden");

			}else{
				if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
					$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
					$(".login .box-main form dl:nth-child(1) dd span").html("请输入正确的E-mail地址或手机号");
				}else{
					$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
					$(".login .box-main form dl:nth-child(1) dd span").html("请输入正确的E-mail地址或手机号");
				}
				
			}
		}
	});	
}

//验证码
function RandCode(){
	
	var _n = 0;
	var _num = 0;
	var _randCode = "";
	var _inputCode = "";
	var _self = this;
	
	$(".login .box-main form #login_code .txt-rand").focus(function(){
		$(".login .box-main form #login_code .txt-rand").removeClass("hint-rand");
	});
	
	$(".login .box-main form #login_code .txt-rand").blur(function(){
		
		if($(".login .box-main form #login_code .txt-rand").val() == ""){
			$(".login .box-main form #login_code .txt-rand").addClass("hint-rand");
		}else{
			$(".login .box-main form #login_code .txt-rand").removeClass("hint-rand");
		}
	});

	$(".login .box-main form #login_code .btn-refreshrand").click(function(){
		_randCode = "";
		for (var i=0; i<4; i++) {
			_randCode += _self.pan();
			$(".login .box-main form #login_code .rand-code").html(_randCode);
		}
	});
//	console.log("--"+$(".login .box-main form .rand-code").html().charCodeAt(0));
	//验证
	this.prove = function(){
		_inputCode = $(".login .box-main form .txt-rand").val();
		_randCode = $(".login .box-main form .rand-code").html();
		if(_inputCode.length>4 || _inputCode.length<=0 ){
			
			//判断是否有span(已知有一个span)
			if($(".login .box-main form dl#login_code dd p span.error").length > 0){
				$(".login .box-main form dl#login_code dd p span.error").removeClass("hidden");
				$(".login .box-main form dl#login_code dd p span.error").html("验证码错误");
			}else{
				$(".login .box-main form dl#login_code dd p").append("<span class='error'></span>");
				$(".login .box-main form dl#login_code dd p span.error").html("验证码错误");
			}
			return "error";
		}else{
			for (var i=0; i<_randCode.length; i++) {
				if(_inputCode.charCodeAt(i) == _randCode.charCodeAt(i) || _inputCode.charCodeAt(i) == _randCode.charCodeAt(i)+32){
					if(_num%3==0 && _num!=0){
						
						if($(".login .box-main form dl#login_code dd p span.error").length > 0){
							$(".login .box-main form dl#login_code dd p span.error").addClass("hidden");
							$(".login .box-main form dl#login_code dd p span.error").html("");
						}
//						else{
//							$(".login .box-main form dl#login_code dd p dd").append("<span class='error'></span>");
//							$(".login .box-main form dl#login_code dd p span").html("");
//						}
						return "success";
					}else{
						_num++;
					}
				}else{
					
					//判断是否有span(已知有一个span)
					if($(".login .box-main form dl#login_code dd p span.error").length > 0){
						$(".login .box-main form dl#login_code dd p span.error").removeClass("hidden");
						$(".login .box-main form dl#login_code dd p span.error").html("验证码错误");
					}else{
						$(".login .box-main form dl#login_code dd p").append("<span class='error'></span>");
						$(".login .box-main form dl#login_code dd p span.error").html("验证码错误");
					}
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
//密码
function Pwd(){
	
	$(".login .box-main form .txt-pass").focus(function(){
		$(".login .box-main form .txt-pass").removeClass("hint-password");
	});
	
	$(".login .box-main form .txt-pass").blur(function(){
		
		if($(".login .box-main form .txt-pass").val() == ""){
			$(".login .box-main form .txt-pass").addClass("hint-password");
		}else{
			$(".login .box-main form .txt-pass").removeClass("hint-password");
		}
	});
		
}

//登录
function Login(){
	
	$(".login .box-main form .btn-login").click(function(){
		var mobile = $(".login .box-main form .txt-user").val();
		var pwd = $(".login .box-main form .txt-pass").val();
		var _params = {
			"mobile":mobile,
			"pwd":pwd
		}
		//从数据库里查找  用户名 和 密码
		$.post("../api/login.php",_params, function(data, textStatus){
			try{
				if(data == "0"){
					//登录失败  回到登录界面   密码是错的
					if(mobile == ""){
						if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
							$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
							$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
						}else{
							$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
							$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
						}
//						alert("请输入E-mail地址或手机号");
					}
					if(pwd == "" && mobile != ""){
						if($(".login .box-main form dl:nth-child(2) dd span").length > 0){
							$(".login .box-main form dl:nth-child(2) dd span").removeClass("hidden");
							$(".login .box-main form dl:nth-child(2) dd span").html("请输入密码");
						}else{
							$(".login .box-main form dl:nth-child(2) dd").append("<span class='error'></span>");
							$(".login .box-main form dl:nth-child(2) dd span").html("请输入密码");
						}
//						alert("请输入密码");
					}
					if(mobile != "" && pwd != ""){
						if(new RandCode().prove() == "error"){
							new RandCode().prove();
//							alert("验证码错误");
						}else{
							if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
								$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
								$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
							}else{
								$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
								$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
							}
//							alert("账号或密码错误");
						}
						
					}	
				}else{
					window.location.href="../index.html";
					
				}
			}catch(e){
				//忘记密码了  没写密码
				if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
					$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
					$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
				}else{
					$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
					$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
				}
				//验证码
				if(new RandCode().prove() == "error"){
					new RandCode().prove();
				}
			}
		});
		
		
//		if(mobile != "" && pwd != "" && new RandCode().prove() == "success"){
//			//从数据库里查找  用户名 和 密码    验证密码  用户名
//			$.post("../api/login.php",_params, function(data, textStatus){
//				try{
//					if(data == "0"){
//						//登录失败  回到登录界面
//						if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
//							$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
//							$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
//						}else{
//							$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
//							$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
//						}
//					}else{
//						window.location.href="../index.html";
//					}
//				}catch(e){
//					//忘记密码了
//					if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
//						$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
//						$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
//					}else{
//						$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
//						$(".login .box-main form dl:nth-child(1) dd span").html("账号或密码错误");
//					}	
//				}
//			});
//			
//		}else{
//			if(mobile == ""){
//				if($(".login .box-main form dl:nth-child(1) dd span").length > 0){
//					$(".login .box-main form dl:nth-child(1) dd span").removeClass("hidden");
//					$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
//				}else{
//					$(".login .box-main form dl:nth-child(1) dd").append("<span class='error'></span>");
//					$(".login .box-main form dl:nth-child(1) dd span").html("请输入E-mail地址或手机号");
//				}
//			}
//			if(pwd == ""){
//				if($(".login .box-main form dl:nth-child(2) dd span").length > 0){
//					$(".login .box-main form dl:nth-child(2) dd span").removeClass("hidden");
//					$(".login .box-main form dl:nth-child(2) dd span").html("请输入密码");
//				}else{
//					$(".login .box-main form dl:nth-child(2) dd").append("<span class='error'></span>");
//					$(".login .box-main form dl:nth-child(2) dd span").html("请输入密码");
//				}
//			}
//			if(new RandCode().prove() == "error"){
//				new RandCode().prove();
//			}
////			window.location.href="login.html";
//		}
		
	});
	
	
	
	
}


$(document).ready(function(){
	
	//登录 E-mail 或 手机号
	new User();
	//验证码
	new RandCode();
	//密码
	new Pwd();
	// 登录  带着用户名
	new Login();
	
});