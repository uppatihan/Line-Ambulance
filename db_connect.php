<?php
// ข้อมูลสำหรับการเชื่อมต่อ
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ambulance"; // ชื่อฐานข้อมูล

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
// if ($conn->connect_error) {
//     die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
// }
// echo "เชื่อมต่อฐานข้อมูลสำเร็จ!";
?>
