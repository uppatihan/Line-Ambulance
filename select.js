
$(document).ready(function () {
    const ok = document.getElementById('ok');

    ok.addEventListener('click', function() {
        $.get("get_users.php", function (data, status) {
            console.log("ok");

            if (status === "success") {
                // แปลงข้อมูล JSON
                const response = JSON.parse(data);

                if (response.status === "ok") {
                    console.log("data: " , response);
                    
                    // let output = "<ul>";
                    // response.data.forEach(emp => {
                    //     output += `<li>ID: ${emp.id}, Name: ${emp.first_name} ${emp.last_name}</li>`;
                    // });
                    // output += "</ul>";
                    // $("#employee-data").html(output);
                } else {
                    console.log("no data");
                    // $("#employee-data").html("ไม่มีข้อมูลพนักงาน");
                }
            } else {
                alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            }
        });
    });

});
