<?php
 
mysqli_report(MYSQLI_REPORT_ERROR);
 
$con = mysqli_connect("localhost", "root", "","24198_loja");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
 
 
?>