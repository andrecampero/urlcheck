<?php
global $conn;

//Db
function cm_Connect()
{
  try
  {
    $username = "dbusername";
	  $password = "dbpassword";

    $conn = new PDO('mysql:host=127.0.0.1;dbname=dbname', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("SET NAMES 'utf8'");
    $conn->exec("SET CHARACTER SET 'utf8'");
	
	return $conn;
  }
  catch(PDOException $e)
  {
    $conn = null;
    return $conn;
    echo 'ERROR: ' . $e->getMessage();
  }
}
?>