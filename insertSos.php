<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
date_default_timezone_set('Asia/Bangkok');

include 'db_connect.php';

$input = json_decode(file_get_contents("php://input"), true);

$name= empty($input['name']) ? "-" : $input['name'];
$phone = empty($input['phone']) ? "-" : $input['phone'];
$accident = empty($input['accident']) ? "-" : $input['accident'];
$house_number = empty($input['house_number']) ? "none" : $input['house_number'];
$building = empty($input['building']) ? "none" : $input['building'];
$floor = empty($input['floor']) ? "none" : $input['floor'];
$village = empty($input['village']) ? "none" : $input['village'];
$alley = empty($input['alley']) ? "none" : $input['alley'];
$road = empty($input['road']) ? "none" : $input['road'];
$subdistrict = empty($input['subdistrict']) ? "none" : $input['subdistrict'];
$district = empty($input['district']) ? "none" : $input['district'];
$description = empty($input['description']) ? "none" : $input['description'];
$status = "อยู่ระหว่างดำเนินการ";
$currentDate = date('Y-m-d H:i:s');
$type = $input['type'];

// $filename = 'data.txt';
$path = dirname(__FILE__); // รับ path ของโฟลเดอร์ปัจจุบัน
$filename = $path . "/location_data.txt"; // สร้าง path สำหรับไฟล์ location_data.txt

if ($name != null && $phone != null && $accident != null) {
    if($type === "insert"){
        $file = fopen($filename, "a"); // เปิดไฟล์ในโหมด append (เพิ่มข้อมูลที่มีอยู่แล้ว)
    
        $lastId = getLastId($filename); // ดึง ID ล่าสุด
        $lastId++; // เพิ่ม ID ใหม่ (เพิ่มทีละ 1)

        // เขียนข้อมูลลงในไฟล์
        $data = "id: $lastId | name: $name | phone: $phone | accident: $accident | house_number: $house_number | building: $building | floor: $floor | village: $village | alley: $alley | road: $road | subdistrict: $subdistrict | district: $district | description: $description | status: $status | created_date: $currentDate | updated_date: $currentDate \n";
        
        fwrite($file, $data); // เขียนข้อมูลลงในไฟล์
        fclose($file); // ปิดไฟล์

        echo json_encode([
            "status" => "success",
            "message" => "Inserted Data Successfully",
            "type" => $type ,
            "data" => $data ,
            "id" => $lastId
        ]);
    }else{
        // $file = fopen($filename, "r"); // เปิดไฟล์ในโหมดอ่าน

        $fileContent = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($fileContent === false) {
            die("ไม่สามารถอ่านไฟล์ได้");
        }

        $inputId = $input['id'];
        $targetField = 'created_date'; 
        $isDuplicate = false;
        $fieldValue = null;


        foreach ($fileContent as $key => $line) {
            // ค้นหา id ที่ตรงกัน
            if (preg_match('/id:\s*' . $inputId . '\s*\|/', $line)) {
                if (preg_match('/' . $targetField . ':\s*([^|]+)/', $line, $matches)) {
                    $fieldValue = trim($matches[1]); // ดึงค่าที่พบ
                }
                $line = preg_replace('/name:\s*[^|]+/', 'name: ' . $name. ' ', $line);
                $line = preg_replace('/phone:\s*[^|]+/', 'phone: ' . $phone. ' ', $line);
                $line = preg_replace('/accident:\s*[^|]+/', 'accident: ' . $accident. ' ', $line);
                $line = preg_replace('/house_number:\s*[^|]+/', 'house_number: ' . $house_number. ' ', $line);
                $line = preg_replace('/building:\s*[^|]+/', 'building: ' . $building. ' ', $line);
                $line = preg_replace('/floor:\s*[^|]+/', 'floor: ' . $floor. ' ', $line);
                $line = preg_replace('/village:\s*[^|]+/', 'village: ' . $village. ' ', $line);
                $line = preg_replace('/alley:\s*[^|]+/', 'alley: ' . $alley. ' ', $line);
                $line = preg_replace('/road:\s*[^|]+/', 'road: ' . $road. ' ', $line);
                $line = preg_replace('/subdistrict:\s*[^|]+/', 'subdistrict: ' . $subdistrict. ' ', $line);
                $line = preg_replace('/district:\s*[^|]+/', 'district: ' . $district. ' ', $line);
                $line = preg_replace('/description:\s*[^|]+/', 'description: ' . $description. ' ', $line);
                $line = preg_replace('/updated_date:\s*[^|]+/', 'updated_date: ' . $currentDate. ' ', $line);

                $fileContent[$key] = $line; // เขียนค่าที่แก้ไขแล้วกลับเข้าไป
                // unset($fileContent[$key]);
                $isDuplicate = true;
                $data = explode(' | ', $fileContent[$key]);  // แยกข้อมูลด้วย "|"
               
                break; 
            }
        }
        
        if ($isDuplicate) {
            file_put_contents($filename, implode(PHP_EOL, $fileContent));

            // echo json_encode([
            //     "status" => "success",
            //     "message" => "Updated Data Successfully",
            //     "type" => $type ,
            //     "data" => $fieldValue ,
            // ]);
            echo json_encode([
                "status" => "success",
                "message" => "Updated Data Successfully",
                "type" => $type ,
                "data" => $data ,
                "input" => $input ,
    
            ]);
        } else {
            echo json_encode([
                "status" => "failed",
                "message" => "Updated Data Failed",
                "type" => $type ,
            ]);
        }
        

    }
    
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Missing data or Incorrect input"
    ]);
}

// ฟังก์ชันเพื่อดึง ID ล่าสุดจากไฟล์
function getLastId($filename) {
    if (!file_exists($filename)) {
        return 0; // ถ้าไฟล์ยังไม่มี ให้เริ่มจาก ID 0
    }

    $lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); // อ่านข้อมูลในไฟล์
    $lastLine = end($lines); // บรรทัดสุดท้าย

    if (preg_match('/^id: (\d+)/', $lastLine, $matches)) {
        return (int)$matches[1]; // ดึง ID ล่าสุด
    }

    return 0; // ถ้าไม่มี ID ให้คืนค่าเป็น 0
}
