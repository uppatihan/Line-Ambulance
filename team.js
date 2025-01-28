

document.addEventListener("DOMContentLoaded", function () {
    
    console.log("running script team" );
    
    // TEAM
    const container = document.getElementById('team');
    // วนลูปเพิ่ม 6 ครั้ง GRID
    for (let i = 1; i <= 3; i++) {
        // firstDiv IMG
        const firstDiv = document.createElement('div');
        firstDiv.id = 'team';
        const img1 = document.createElement('img');
        img1.className = 'h-auto max-w-full rounded-lg hover:scale-150 transition-transform relative hover:z-10';
        img1.src = 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg';
        // img1.alt = '';
        const p1 = document.createElement('p');
        p1.id = 'text-img';
        p1.className = 'text-center text-name';
        p1.textContent = `NAME`;

        firstDiv.appendChild(img1);
        firstDiv.appendChild(p1);

        // secondDiv IMG
        const secondDiv = document.createElement('div');
        secondDiv.id = 'team';
        const img2 = document.createElement('img');
        img2.className = 'h-auto max-w-full rounded-lg hover:scale-150 transition-transform relative hover:z-10';
        img2.src = 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg';
        // img2.alt = '';
        const p2 = document.createElement('p');
        p2.className = 'text-center text-name';
        p2.textContent = `NAME`;

        secondDiv.appendChild(img2);
        secondDiv.appendChild(p2);


        // Create DIV IMG 
        container.appendChild(firstDiv);
        container.appendChild(secondDiv);
    }
});

