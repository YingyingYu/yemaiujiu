<?php
    header("Content-type:text/html;charset=utf-8");//忽略php的警告
    function doPost(){
		session_start();
		//$_SESSION["mobile"]=null;//由于电脑关机后重启，$_SESSION["mobile"]数据会变为null
		if($_SESSION["mobile"]==null || $_SESSION["mobile"]=="undefined"){
			$count = 0;
			$conn=new mysqli("localhost","root","root","yemaijiuuser");
			mysqli_query($conn,"set character set 'utf8'");//读库
			mysqli_query($conn,'set names utf8');//写库
			$result=$conn->query("select COUNT(*) AS count FROM t_user WHERE id='0';");
			while($row = mysqli_fetch_assoc($result)){
				$count = $row['count'];//记录数据库里面有几条数据
			}
			echo $count."s";
		}else{
			echo $_SESSION["mobile"];
		}
    }
    doPost();
?>