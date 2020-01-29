<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


// $input = file_get_contents("php://input");
// $postRequest = json_decode($input);

// $ID = $postRequest->ID;
// $SUPPLIES_NAME = $postRequest->SUPPLIES_NAME;
// $PRICE = $postRequest->PRICE;

// if ($ID) {
//     $sql = " UPDATE supplies SET 
//     SUPPLIES_NAME = '$SUPPLIES_NAME',
//     PRICE = '$PRICE'
//     WHERE ID = '$ID '";

//     $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
// } else {
//     $sql = "INSERT INTO supplies (SUPPLIES_NAME , PRICE) VALUES ('$SUPPLIES_NAME' , '$PRICE')";
//     $result = mysqli_query($condb, $sql) or die("Error in query: $sql" . mysqli_error());
// }

$result = "sdsd";
print_r($result);
