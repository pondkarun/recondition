<?php
error_reporting(E_ALL); //ถ้าปิด ใส่ 0

$localhost = "103.58.148.198";
$username_db = "smomscic";
$password_db = "Jj*5cQ6)ub5VK1";
$db_name = "smomscic_recond";

$conn = new mysqli($localhost, $username_db, $password_db, $db_name);
$conn->set_charset('utf8');
date_default_timezone_set('Asia/Bangkok');

if ($conn->connect_errno) {
    echo "Error : " . $conn->connect_error;
    exit();
}
