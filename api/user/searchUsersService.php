<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);


@$EMPLOYEE_CODE = $postRequest->EMPLOYEE_CODE;
@$Name = $postRequest->Name;



$data = array();

try {


    $query = "SELECT 
    e.ID,
    e.EMPLOYEE_CODE,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS NAME_TH,
    e.PASSWORD,
    e.SURNAME_TH,
    e.DEPARTMENT,
    e.LOCATION,
    e.EMAIL,
    e.NICKNAME,
    e.IPAddress,
    e.TEL
    FROM employees AS e
    WHERE e.IS_USES = 'true' ";

    if ($EMPLOYEE_CODE) {
        $query .= " AND (e.EMPLOYEE_CODE like '%" . $EMPLOYEE_CODE . "%') ";
    }

    if ($Name) {
        $query .= " AND (CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) ) LIKE  '%" . $Name . "%' ";
    }

    $query .= " ORDER BY e.EMPLOYEE_CODE ";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
