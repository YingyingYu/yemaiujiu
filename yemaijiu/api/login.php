<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		$_SESSION["mobile"]=null;
		if($_SESSION["mobile"]==null || $_SESSION["mobile"]=="undefined"){
			$user=0;
			if(isSet($_POST["mobile"]) && isSet($_POST["pwd"])){
				$conn=new mysqli("localhost","root","root","yemaijiuuser");
				mysqli_query($conn,"set character set 'utf8'");//读库
				mysqli_query($conn,'set names utf8');//写库
				$result=$conn->query("select * from t_user where mobile='".$_POST["mobile"]."' and pwd='".$_POST["pwd"]."';");
				while($row = mysqli_fetch_assoc($result)){
					$user=$row["mobile"];
					$_SESSION["mobile"]=$row["mobile"];
				}
				$conn->close();
			}
			echo $user;
		}else{
			echo $_SESSION["mobile"];
		}
    }
    doPost();
?>