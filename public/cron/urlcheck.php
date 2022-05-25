<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/html; charset=UTF-8');

include('conn.php');
$conn = cm_Connect();

error_reporting(E_ALL);
ini_set('display_errors', 1);

function http_response_code_($code = NULL) {

	if ($code !== NULL) {
		switch ($code) {
			case 100: $text = 'Continue'; break;
			case 101: $text = 'Switching Protocols'; break;
			case 200: $text = 'OK'; break;
			case 201: $text = 'Created'; break;
			case 202: $text = 'Accepted'; break;
			case 203: $text = 'Non-Authoritative Information'; break;
			case 204: $text = 'No Content'; break;
			case 205: $text = 'Reset Content'; break;
			case 206: $text = 'Partial Content'; break;
			case 300: $text = 'Multiple Choices'; break;
			case 301: $text = 'Moved Permanently'; break;
			case 302: $text = 'Moved Temporarily'; break;
			case 303: $text = 'See Other'; break;
			case 304: $text = 'Not Modified'; break;
			case 305: $text = 'Use Proxy'; break;
			case 400: $text = 'Bad Request'; break;
			case 401: $text = 'Unauthorized'; break;
			case 402: $text = 'Payment Required'; break;
			case 403: $text = 'Forbidden'; break;
			case 404: $text = 'Not Found'; break;
			case 405: $text = 'Method Not Allowed'; break;
			case 406: $text = 'Not Acceptable'; break;
			case 407: $text = 'Proxy Authentication Required'; break;
			case 408: $text = 'Request Time-out'; break;
			case 409: $text = 'Conflict'; break;
			case 410: $text = 'Gone'; break;
			case 411: $text = 'Length Required'; break;
			case 412: $text = 'Precondition Failed'; break;
			case 413: $text = 'Request Entity Too Large'; break;
			case 414: $text = 'Request-URI Too Large'; break;
			case 415: $text = 'Unsupported Media Type'; break;
			case 500: $text = 'Internal Server Error'; break;
			case 501: $text = 'Not Implemented'; break;
			case 502: $text = 'Bad Gateway'; break;
			case 503: $text = 'Service Unavailable'; break;
			case 504: $text = 'Gateway Time-out'; break;
			case 505: $text = 'HTTP Version not supported'; break;
			default:
				$text = "Cód incorreto.";
			break;
		}
	} else {
		$text = "Cód incorreto.";
	}
	return $text;
}


try {
	
	$sql = "
		SELECT 
			*
		FROM tb_track tt WHERE 1 = 1
	";
	$data = $conn->query($sql);
	$data_fetch = $data->fetchAll(PDO :: FETCH_ASSOC);
	if($data_fetch)
	{
		foreach($data_fetch as $data_fetch_val)
		{
			$id_track = $data_fetch_val['id'];
			$url = $data_fetch_val['url_track'];
			
			$handle = curl_init($url);
			curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);
			$response = curl_exec($handle);
			$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
			$response_code = http_response_code_($httpCode);
			curl_close($handle);
			
			// Upd prot
			$sql_upd = "
				update tb_track set 
					status_code = '$httpCode',
					response_code = '$response_code',
					urlcheckedAt = NOW()
				where id = $id_track
			";
			if($conn->query($sql_upd))
			{
				echo "Upd: $url - $httpCode - $response_code <br>";
			}
		}
	}
	
} catch (Exception $e) {
	echo "Error: ".$e;
}

?>