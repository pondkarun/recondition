<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$ID = file_get_contents('php://input');
$START_DATE = date('Y-m-d');
try {
    $sql3 = "SELECT STATUS_READ  FROM `services` WHERE ID = '".$ID."' ";
    $result3 = mysqli_query($condb, $sql3);
    $row = mysqli_fetch_array($result3);
    if ($row['STATUS_READ'] == 'false') {
        $sql2 = "UPDATE `services` SET  `STATUS_READ` = 'true' , START_DATE = '".$START_DATE."'  WHERE ID = '".$ID."' ";
        $result = mysqli_query($condb, $sql2) or die("Error in query: $sql2".mysqli_error());
    }

    $sql = "SELECT 
    s.ID,
    s.SERVICES_CODE,
    s.CreateDate,
    p.TYPE_ID,
    CONCAT(p.PERIPETEIA , ' ' ,  s.DETAIL) AS DETAIL,
    s.REMARK,
    s.STATUS,
    s.ANALYZE,
    s.MANAGER_STATUS,
    s.MANAGER_REMARK,
    s.PERIPETEIA_ID,
    s.START_DATE,
    s.END_DATE,
    e.DEPARTMENT AS DEPARTMENTStaff,
    ee.DEPARTMENT AS DEPARTMENTUser,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = e.PREFIX_ID) ,e.NAME_TH  , ' ' ,  e.SURNAME_TH) AS NameStaff,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = ee.PREFIX_ID) ,e.NAME_TH  , ' ' ,  ee.SURNAME_TH) AS NameUser,
    CONCAT((SELECT DATA_TOPICS FROM data_topics WHERE ID = m.PREFIX_ID) ,e.NAME_TH  , ' ' ,  m.SURNAME_TH) AS NameMANAGER
    FROM services AS s 
    INNER JOIN peripeteias AS p ON s.PERIPETEIA_ID = p.ID
    INNER JOIN data_topics AS d ON p.TYPE_ID = d.ID
    INNER JOIN employees AS e ON s.STAF_ID = e.ID
    INNER JOIN employees AS ee ON s.USER_ID  = ee.ID
    LEFT JOIN employees AS m ON m.ID = s.MANAGER_ID 
    
    
    WHERE s.ID = '".$ID."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['ID'] = $row['ID'];
        $response['NameStaff'] = $row['NameStaff'];
        $response['NameUser'] = $row['NameUser'];
        $response['NameMANAGER'] = $row['NameMANAGER'];
        $response['DEPARTMENTStaff'] = $row['DEPARTMENTStaff'];
        $response['DEPARTMENTUser'] = $row['DEPARTMENTUser'];
        $response['SERVICES_CODE'] = $row['SERVICES_CODE'];
        $response['CreateDate'] = $row['CreateDate'];
        $response['TYPE_ID'] = $row['TYPE_ID'];
        $response['DETAIL'] = $row['DETAIL'];
        $response['START_DATE'] = $row['START_DATE'];
        $response['END_DATE'] = $row['END_DATE'];
        $response['REMARK'] = $row['REMARK'];
        $response['STATUS'] = $row['STATUS'];
        $response['ANALYZE'] = $row['ANALYZE'];
        $response['MANAGER_STATUS'] = $row['MANAGER_STATUS'];
        $response['MANAGER_REMARK'] = $row['MANAGER_REMARK'];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
