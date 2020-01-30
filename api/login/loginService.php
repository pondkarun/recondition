<?php
session_start();
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$USERNAME = $postRequest->USERNAME;
$PASSWORD = md5($postRequest->PASSWORD);


$sql = "SELECT * FROM `employees` WHERE USERNAME = '" . $USERNAME . "' AND PASSWORD = '" . $PASSWORD . "' ";
$result = $condb->query($sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $response['statusLogin'] = 'loggedin';
    $response['USERNAME'] = $row["USERNAME"];
    $response['EMPLOYEE_CODE'] = $row["EMPLOYEE_CODE"];
    $response['ID'] = $row["ID"];

    $_SESSION['ID'] = $response['ID'];
    $_SESSION['USERNAME'] = $USERNAME;
} else {
    $response['status'] = 'error';
}

echo json_encode($response);
/*
print_r($_POST);*/
// }
