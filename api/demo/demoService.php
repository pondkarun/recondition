<?php
require_once('../condb.php');
$START_DATE = null;
$END_DATE = null;

$query = "SELECT  e.ID,
CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
e.EMPLOYEE_CODE , ";

if ($START_DATE && $END_DATE) {
    $query .= "
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS total_work,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS Standard,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS NonStandard,
   (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "' ) AS AVG
  ";
} else {
    $query .= "
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS total_work,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5) AS Standard,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5) AS NonStandard,
   (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS AVG
  ";
}

$query .= " FROM employees AS e  WHERE STATUS_ID = 'C7FFD4D943CB48C2BB2BEC3D350D7B7F'
ORDER BY e.EMPLOYEE_CODE LIMIT 3";


$result = $condb->query($query) or die($condb->error);

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$temp1 = json_encode($data);


$query2 = "SELECT  e.ID,
CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS Name,
e.EMPLOYEE_CODE , ";
if ($START_DATE && $END_DATE) {
    $query2 .= "
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS total_work,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS Standard,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5 AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "') AS NonStandard,
   (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND CreateDate BETWEEN  '" . $START_DATE . "' AND  '" . $END_DATE . "' ) AS AVG
  ";
} else {
    $query2 .= "
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS total_work,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) <= 5) AS Standard,
   (SELECT COUNT(ID) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID AND DATEDIFF(END_DATE , START_DATE) > 5) AS NonStandard,
   (SELECT AVG(SATISFACTION) FROM services WHERE STATUS = 'จบงาน' AND STAF_ID = e.ID) AS AVG
  ";
}

$query2 .= " FROM employees AS e  WHERE STATUS_ID = 'C7FFD4D943CB48C2BB2BEC3D350D7B7F'
ORDER BY e.EMPLOYEE_CODE LIMIT 3";


$result2 = $condb->query($query2) or die($condb->error);

while ($row2 = $result2->fetch_assoc()) {
    $data2[] = $row2;
}

$temp2 = json_encode($data2);

$data3[] = $data;
$data3[] = $data2;

echo json_encode($data3);
