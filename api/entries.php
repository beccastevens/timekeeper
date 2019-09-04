<?php
$host = "timekeeper_mysql_1";
$user = "root";
$password = "password";
$dbname = "timekeeper";
$port = "3306";
$socket = "/var/run/mysqld/mysqld.sock";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname, $port, $socket);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//$input = json_decode(file_get_contents('php://input'),true);

if (!$con) {
  mysqli_close($con);
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $id = $_GET['id'];
      $sql = "select * from entries".($id?" where id=$id":'');
      break;
    case 'POST':
      $date = $_POST["entry_date"];
      $description = $_POST["description"];
      $startTime = $_POST["start_time"];
      $endTime = $_POST["end_time"];
      $hours = $_POST["hours"];

      $sql = "insert into entries (entry_date, description, start_time, end_time, hours) values ('$date', '$description', '$startTime', '$endTime', '$hours')";
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(400);
  mysqli_close($con);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

mysqli_close($con);
