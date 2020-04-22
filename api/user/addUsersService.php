<?php
require_once('../condb.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$input = file_get_contents("php://input");
$postRequest = json_decode($input);

$PREFIX_ID = $postRequest->PREFIX_ID;
$NAME_TH = $postRequest->NAME_TH;
$SURNAME_TH = $postRequest->SURNAME_TH;
$DEPARTMENT = $postRequest->DEPARTMENT;
$LOCATION = $postRequest->LOCATION;
$EMAIL = $postRequest->EMAIL;
$NICKNAME = $postRequest->NICKNAME;
$IPAddress = $postRequest->IPAddress;
$TEL = $postRequest->TEL;
$STATUS_ID = $postRequest->STATUS_ID;


$sql = "SELECT COUNT(ID) AS COUNT_CODE FROM `employees`";
$result = mysqli_query($condb, $sql);
$row = mysqli_fetch_array($result);
$COUNT_CODE = $row['COUNT_CODE'] + 1;

$ID = GUID();
$EMPLOYEE_CODE = sprintf("CT%04d", $COUNT_CODE);;
$USERNAME = $EMPLOYEE_CODE;
$PASSWORD = '81dc9bdb52d04dc20036dbd8313ed055';

$sql = "INSERT INTO employees 
    (
        `ID`,
        `EMPLOYEE_CODE`,
        `USERNAME`,
        `PASSWORD`,
        `PREFIX_ID`,
        `NAME_TH`,
        `SURNAME_TH`,
        `DEPARTMENT`,
        `EMAIL`,
        `LOCATION`,
        `NICKNAME`,
        `IPAddress`,
        `TEL`,
        `STATUS_ID`
    )
     VALUES 
     (
        '" . $ID . "',
        '" . $EMPLOYEE_CODE . "',
        '" . $USERNAME . "',
        '" . $PASSWORD . "',
        '" . $PREFIX_ID  . "',
        '" . $NAME_TH  . "',
        '" . $SURNAME_TH  . "',
        '" . $DEPARTMENT  . "',
        '" . $EMAIL  . "',
        '" . $LOCATION  . "',
        '" . $NICKNAME  . "',
        '" . $IPAddress  . "',
        '" . $TEL  . "',
        '" . $STATUS_ID   . "'
    )";

    $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());

print_r($result);
