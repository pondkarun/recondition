<?php
session_start();
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$ID_STATUS_EM = $postRequest;

$sql = "SELECT 
MENU_ICON,
MENU_NAME,
ROUTEP
FROM menu AS a
INNER JOIN menu_map AS b ON a.ID = b.MENU_ID
WHERE b.ID_STATUS_EM = 'C7FFD4D943CB48C2BB2BEC3D350D7B7F'
WHERE b.ID_STATUS_EM = '" . $ID_STATUS_EM . "'";
$result = $condb->query($sql);

if (mysqli_num_rows($result) == 1) {
    $row = mysqli_fetch_array($result);
    $response['MENU_ICON'] = $row["MENU_ICON"];
    $response['MENU_NAME'] = $row["MENU_NAME"];
    $response['ROUTEP'] = $row["ROUTEP"];
} else {
    $response['status'] = 'error';
}

echo json_encode($response);
/*
print_r($_POST);*/
// }
