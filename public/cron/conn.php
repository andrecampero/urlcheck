<?php
global $conn;

//Db
function cm_Connect()
{
  try
  {
    $username = "adsgru10_root";
	$password = "Zaq12wsx";

    $conn = new PDO('mysql:host=127.0.0.1;dbname=adsgru10_validador_url', $username, $password);
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