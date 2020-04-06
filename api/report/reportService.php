<?php
require_once('../condb.php');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$input = file_get_contents("php://input");
$postRequest = json_decode($input);

@$START_DATE = $postRequest->START_DATE;
@$END_DATE = $postRequest->END_DATE;




$data = array();

try {


    $query = "SELECT e.ID,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
    e.EMPLOYEE_CODE , ";

    if ($START_DATE && $END_DATE) {
        $query .= "
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS total_work,
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS Standard,
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS NonStandard,
       (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "' ) AS AVG
      ";
    }else{
        $query .= "
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS total_work,
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5) AS Standard,
       (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5) AS NonStandard,
       (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS AVG
      ";
    }
   
    $query .= " FROM employees AS e  WHERE STATUS_ID = 'C7FFD4D943CB48C2BB2BEC3D350D7B7F'
    ORDER BY e.EMPLOYEE_CODE ";


    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {

    echo $e->getMessage();
}
