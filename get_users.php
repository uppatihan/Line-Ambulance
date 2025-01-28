<?php
include 'db_connect.php';

$sql = "SELECT * FROM employee";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];

    // วนลูปดึงข้อมูลแต่ละแถว
    while ($row = $result->fetch_assoc()) {
        $data[] = $row; // เพิ่มข้อมูลลงใน array
    }

    // แปลง array เป็น JSON และส่งไปยังหน้าเว็บ
    echo json_encode([
        "status" => "ok",
        "data" => $data
    ]);
} else {
    // กรณีไม่มีข้อมูล
    echo json_encode([
        "status" => "bad",
        "data" => "no data"
    ]);
}

// ปิดการเชื่อมต่อ
$conn->close();
?>
