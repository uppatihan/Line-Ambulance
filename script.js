// Location PathFile
var pathname = window.location.pathname;
// ใช้ split() เพื่อแยกชื่อไฟล์ออกจาก path
var filename = pathname.split('/').pop();
// ตัดชื่อไฟล์ออก โดยใช้ slice เพื่อเอาส่วนที่ไม่รวมชื่อไฟล์
var Path = "http://localhost/Line-Ambulance/";

document.addEventListener("DOMContentLoaded", function () {
    console.log("running default script");
    // Location PathFile
    // var pathname = window.location.pathname;
    // ใช้ split() เพื่อแยกชื่อไฟล์ออกจาก path
    // var filename = pathname.split('/').pop();

    if (filename == 'sos.html') {
        console.log("JS is active for sos.html");
    }

    if (filename == 'show.html') {
        const id = getIdFromUrl();
        // console.log("show", id);
        if (!id) {
            //
        } else {
            // อ่านไฟล์ txt และค้นหา ID
            fetch(Path + "location_data.txt")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching data: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    const lines = data.split("\n"); // แยกข้อมูลแต่ละบรรทัด
                    const result = lines.find(line => line.includes(`id: ${id}`)); // ค้นหา ID
                    if (result) {
                        // แยกข้อมูลแต่ละฟิลด์ด้วยเครื่องหมาย ' | '
                        const fields = result.split(' | ');

                        // สร้างอ็อบเจ็กต์เพื่อเก็บ key-value
                        const item = {};

                        fields.forEach(field => {
                            // แยก key และ value ด้วย ': '
                            const [key, value] = field.split(': ');
                            if (key && value) {
                                item[key.trim()] = value.trim(); // เก็บ key-value ในอ็อบเจ็กต์
                            }
                        });

                        showSos(item);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
});

function showSos(data) {
    // console.log(data);
    const no = document.getElementById("no");
    const num = data.id.padStart(5, "0"); // ถ้า data.id มีน้อยกว่า 5 ตัว จะเพิ่ม "0"
    no.innerHTML = "รหัสขอความช่วยเหลือ: " + num;
    const id = document.getElementById("id");
    id.value = data.id;

    const status = document.getElementById("status");
    if (data.status == "อยู่ระหว่างดำเนินการ") {
        status.innerHTML = data.status;
        status.classList.add('bg-red-100');
        status.classList.add('text-red-800');
        status.classList.add('dark:bg-red-900');
        status.classList.add('dark:text-red-300');
    } else {
        status.innerHTML = data.status;
        status.classList.add('bg-green-100');
        status.classList.add('text-green-800');
        status.classList.add('dark:bg-green-900');
        status.classList.add(' dark:text-green-300');
    }
    status.innerHTML = data.status

    const fields = ['name', 'phone', 'accident', 'house_number'
        , 'building', 'floor', 'village', 'alley', 'road'
        , 'subdistrict', 'district', 'description'];

    fields.forEach(field => {
        if (data[field] == "none") {
            console.log("Field:", data[field]);
        } else {
            document.getElementById(field).value = data[field];
        }
    });

}



function scrollProfile() {
    const detail = document.getElementById('detail');
    if (filename !== 'index.html') {
        window.location.href = 'index.html#detail';
    } else {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function submitInput(event) {
    // หยุดการรีโหลดของฟอร์ม
    event.preventDefault();
    // console.log(event);

    const fields = [
        document.getElementById('name'),
        document.getElementById('phone'),
        document.getElementById('accident')
    ];

    let allValid = true;  // กำหนดตัวแปรที่ใช้ตรวจสอบว่า ทุกฟิลด์ถูกต้องหรือไม่

    // ตรวจสอบฟิลด์แต่ละตัว
    fields.forEach(function (field) {
        if (field.value.trim() === "") {
            // ลบคลาสที่ไม่ต้องการ
            field.classList.remove('border-gray-300');
            field.classList.remove('focus:border-blue-500');
            field.classList.remove('dark:border-gray-600');

            // เพิ่มความหนาของเส้นขอบและเปลี่ยนสีขอบ
            field.classList.add('border-4');
            field.classList.add('border-red-800');
            field.classList.add('focus:border-red-800');
            field.classList.add('dark:border-red-800');
            field.classList.add('dark:focus:border-red-800');

            allValid = false;  // ถ้ามีฟิลด์ใดๆ ที่ไม่ถูกต้อง จะตั้งค่าเป็น false
        } else {
            // ลบคลาสที่ไม่ต้องการ
            field.classList.add('border-gray-300');
            field.classList.add('focus:border-blue-500');
            field.classList.add('dark:border-gray-600');

            // เพิ่มความหนาของเส้นขอบและเปลี่ยนสีขอบ
            field.classList.remove('border-4');
            field.classList.remove('border-red-800');
            field.classList.remove('focus:border-red-800');
            field.classList.remove('dark:border-red-800');
            field.classList.remove('dark:focus:border-red-800');
        }
    });

    // ตรวจสอบ checkbox ว่าถูกติ๊กหรือไม่
    const check = document.getElementById('check');
    if (!check.checked) {
        allValid = false;  // ถ้า checkbox ไม่ถูกติ๊ก จะทำให้ allValid = false
        // เพิ่มการเปลี่ยนแปลงสไตล์ให้ checkbox
        check.classList.add('border-4');
        check.classList.add('border-red-800');
        check.classList.add('focus:border-red-800');
        check.classList.add('dark:border-red-800');
        check.classList.add('dark:focus:border-red-800');
    }

    // ถ้าทุกฟิลด์ถูกต้อง
    if (allValid) {

        const house_number = document.getElementById('house_number').value.trim();
        const building = document.getElementById('building').value.trim();
        const floor = document.getElementById('floor').value.trim();
        const village = document.getElementById('village').value.trim();
        const alley = document.getElementById('alley').value.trim();
        const road = document.getElementById('road').value.trim();
        const subdistrict = document.getElementById('subdistrict').value.trim();
        const district = document.getElementById('district').value.trim();
        const description = document.getElementById('description').value.trim();

        // สร้างอ็อบเจ็กต์ข้อมูลที่จะส่ง
        const data = {
            name: fields[0].value,
            phone: fields[1].value,
            accident: fields[2].value,
            house_number: house_number,
            building: building,
            floor: floor,
            village: village,
            alley: alley,
            road: road,
            subdistrict: subdistrict,
            district: district,
            description: description,
            type: "insert"
        };
        insertData(data)

    } else {
        console.log("ข้อมูลไม่ครบถ้วน หรือ no check");
    }
}

function updateInput(event) {
    // หยุดการรีโหลดของฟอร์ม
    event.preventDefault();
    // console.log(event);

    const fields = [
        document.getElementById('name'),
        document.getElementById('phone'),
        document.getElementById('accident')
    ];

    let allValid = true;  // กำหนดตัวแปรที่ใช้ตรวจสอบว่า ทุกฟิลด์ถูกต้องหรือไม่

    // ตรวจสอบฟิลด์แต่ละตัว
    fields.forEach(function (field) {
        if (field.value.trim() === "") {
            // ลบคลาสที่ไม่ต้องการ
            field.classList.remove('border-gray-300');
            field.classList.remove('focus:border-blue-500');
            field.classList.remove('dark:border-gray-600');

            // เพิ่มความหนาของเส้นขอบและเปลี่ยนสีขอบ
            field.classList.add('border-4');
            field.classList.add('border-red-800');
            field.classList.add('focus:border-red-800');
            field.classList.add('dark:border-red-800');
            field.classList.add('dark:focus:border-red-800');

            allValid = false;  // ถ้ามีฟิลด์ใดๆ ที่ไม่ถูกต้อง จะตั้งค่าเป็น false
        } else {
            // ลบคลาสที่ไม่ต้องการ
            field.classList.add('border-gray-300');
            field.classList.add('focus:border-blue-500');
            field.classList.add('dark:border-gray-600');

            // เพิ่มความหนาของเส้นขอบและเปลี่ยนสีขอบ
            field.classList.remove('border-4');
            field.classList.remove('border-red-800');
            field.classList.remove('focus:border-red-800');
            field.classList.remove('dark:border-red-800');
            field.classList.remove('dark:focus:border-red-800');
        }
    });

    // ถ้าทุกฟิลด์ถูกต้อง
    if (allValid) {

        const house_number = document.getElementById('house_number').value.trim();
        const building = document.getElementById('building').value.trim();
        const floor = document.getElementById('floor').value.trim();
        const village = document.getElementById('village').value.trim();
        const alley = document.getElementById('alley').value.trim();
        const road = document.getElementById('road').value.trim();
        const subdistrict = document.getElementById('subdistrict').value.trim();
        const district = document.getElementById('district').value.trim();
        const description = document.getElementById('description').value.trim();

        const id = document.getElementById('id').value;

        // สร้างอ็อบเจ็กต์ข้อมูลที่จะส่ง
        const data = {
            id: id,
            name: fields[0].value,
            phone: fields[1].value,
            accident: fields[2].value,
            house_number: house_number,
            building: building,
            floor: floor,
            village: village,
            alley: alley,
            road: road,
            subdistrict: subdistrict,
            district: district,
            description: description,
            type: "update"

        };
        insertData(data)

    } else {
        console.log("ข้อมูลไม่ครบถ้วน");
    }
}


function formatPhone(input) {
    // ลบตัวอักษรที่ไม่ใช่ตัวเลข
    let phone = input.value.replace(/\D/g, '');

    // จัดรูปแบบเป็น "XXX-XXX-XXXX"
    if (phone.length > 3 && phone.length <= 6) {
        input.value = phone.slice(0, 3) + '-' + phone.slice(3);
    } else if (phone.length > 6) {
        input.value = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6, 10);
    } else {
        input.value = phone; // กรณีที่ตัวเลขยังไม่เกิน 3 ตัว
    }
}

function insertData(data) {
    console.log("ข้อมูลที่ส่งไป:", data);

    fetch(Path + "insertSos.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())  // ใช้ text() ก่อนเพื่อตรวจสอบคำตอบ
        .then(result => {
            if(result.type == "insert"){
                document.getElementById('form_sos').reset();
                showSuccessAlert(result.id)
            }else{
                // console.log("Raw UPDATE: ", result); 
                // window.location.reload();
                editSuccessAlert();
            }
            // try {
            //     const result = JSON.parse(text);  // แปลงเป็น JSON
            //     console.log("Parsed response:", result);
            // } catch (error) {
            //     console.error("ไม่สามารถแปลงคำตอบเป็น JSON:", error);
            // }
        })
        .catch(error => {
            console.error("เกิดข้อผิดพลาด:", error);
        });

}

function editSuccessAlert() {
    let alertContent = `
  <div id="alert-additional-content-3" class="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert" style="position: fixed; top: 1px; left: 4px; right: 4px; z-index: 9999;">
    <div class="flex items-center">
      <svg class="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <h3 class="text-lg font-medium">แก้ไขข้อมูล</h3>
    </div>
    <div class="mt-2 mb-4 text-sm">
      ดำเนินการแก้ไขข้อมูลเรียบร้อย.
    </div>
    <div class="flex">
    <button onclick="closeAlert()" type="button" class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close" style="margin-left: auto;" >
        ปิด
    </button>
    </div>
  </div>
`;
    document.body.insertAdjacentHTML("afterbegin", alertContent);

}

function showSuccessAlert(id) {
    let alertContent = `
  <div id="alert-additional-content-3" class="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert" style="position: fixed; top: 1px; left: 4px; right: 4px; z-index: 9999;">
    <div class="flex items-center">
      <svg class="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <h3 class="text-lg font-medium">ขอความช่วยเหลือสำเร็จ</h3>
    </div>
    <div class="mt-2 mb-4 text-sm">
      รอเจ้าหน้าที่ดำเนินการสักครู่ จะมีการติดต่อกลับไปในไม่ช้า.
    </div>
    <div class="flex">
    <button onclick="location.href='show.html?id=' +  ${id};" type="button" class="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
        </svg>
        ดูรายละเอียดที่ขอความช่วยเหลือ
    </button>
    <button onclick="closeAlert()" type="button" class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close" style="margin-left: auto;" >
        ปิด
    </button>
    </div>
  </div>
`;
    document.body.insertAdjacentHTML("afterbegin", alertContent);

}

function closeAlert() {
    var alert = document.getElementById("alert-additional-content-3");

    // กำหนด transition ให้กับ alert
    alert.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";  // เลื่อนขึ้นและลดความโปร่งใส
    alert.style.transform = "translateY(-100%)";  // เลื่อนขึ้น
    alert.style.opacity = "0";  // ลดความโปร่งใสจนหายไป

    // เมื่อ animation เสร็จแล้วให้ซ่อน
    setTimeout(function () {
        alert.style.display = "none";
    }, 500);  // ใช้เวลา 0.5 วินาทีหลังจากการเลื่อนขึ้น
}

function goBack() {
    document.getElementById('form_sos').reset();
    window.location.href = 'sos.html';  
}

function getIdFromUrl() {
    // ดึง query string จาก URL
    const queryString = window.location.search;

    // แปลง query string เป็น object
    const urlParams = new URLSearchParams(queryString);

    // ดึงค่าพารามิเตอร์ id
    const id = urlParams.get('id');

    // คืนค่าหรือใช้งาน id
    return id;
}