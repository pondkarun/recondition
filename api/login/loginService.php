<?php
session_start();
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$USERNAME = $postRequest->USERNAME;
$PASSWORD = $condb->real_escape_string($postRequest->PASSWORD);

$sql = "SELECT 
e.ID,
e.USERNAME,
e.EMPLOYEE_CODE,
CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS NAME_TH,
e.STATUS_ID, 
dt.DATA_TOPICS AS STATUS
FROM employees AS e 
INNER JOIN data_topics AS dt ON dt.ID = e.STATUS_ID 
WHERE USERNAME = '" . $USERNAME . "' AND PASSWORD = '" . $PASSWORD . "' ";
$result = $condb->query($sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $response['ID'] = $row["ID"];
    $response['USERNAME'] = $row["USERNAME"];
    $response['NAME_TH'] = $row["NAME_TH"];
    $response['EMPLOYEE_CODE'] = $row["EMPLOYEE_CODE"];
    $response['STATUS_ID'] = $row["STATUS_ID"];
    $response['STATUS'] = $row["STATUS"];
    $response['statusLogin'] = 'loggedin';
} else {
    $response['status'] = 'error';
}

echo json_encode($response);
/*
print_r($_POST);*/
// }
