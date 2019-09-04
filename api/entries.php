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
// $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$data = json_decode(file_get_contents("php://input"));
$request = $data->request;

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $id = $_GET['id'];
      $sql = "select * from entries".($id?" where id=$id":'');
      break;
    case 'POST':
      if($request == 1) {
        // throw new \Exception("formData " . print_r($data, true));

        $date = $data->formData->entry_date;
        $description = $data->formData->description;
        $startTime = $data->formData->start_time;
        $endTime = $data->formData->end_time;
        $hours = (integer) $data->FormData->hours;

        $sql = "insert into entries (entry_date, description, start_time, end_time, hours) values ('$date', '$description', '$startTime', '$endTime', '$hours')";
      } elseif ($request == 2) {
        $id = $data->id;

        $sql = "delete from entries where id=$id";
      }
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(400);
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
  } elseif($method == 'delete') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

mysqli_close($con);
