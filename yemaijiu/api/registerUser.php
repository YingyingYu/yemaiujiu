<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
        $success=0;
        $conn=new mysqli("localhost","root","root","yemaijiuuser");
        mysqli_query($conn,"set character set 'utf8'");//读库
        mysqli_query($conn,'set names utf8');//写库
        //$value="'".$_POST["user"]."','".$_POST["mobile"]."','".$_POST["mail"]."','".$_POST["secret"]."','".$_POST["name"]."'";
		$value="'".$_POST["mobile"]."','".$_POST["pwd"]."'";
        if($conn->query("insert into t_user (mobile,pwd) values (".$value.");")==true){
            $success=1;
        }
        $conn->close();
        echo $success;
    }
    doPost();
?>