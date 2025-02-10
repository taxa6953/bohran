// تنظیمات نقشه
const map = L.map('map').setView([29.4968, 60.8629], 13); // مختصات مرکز زاهدان

// اضافه کردن تایل‌های OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// اضافه کردن قابلیت مسیریابی
const routingControl = L.Routing.control({
    waypoints: [
        L.latLng(29.4968, 60.8629), // مبدا (مختصات نمونه)
        L.latLng(29.5000, 60.8700)  // مقصد (مختصات نمونه)
    ],
    routeWhileDragging: true,
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1' // سرویس مسیریابی OSRM
    }),
    show: false // پنل مسیریابی را مخفی کنید
}).addTo(map);

// تابع محاسبه مسیر
function calculateRoute() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    // تبدیل آدرس به مختصات (با استفاده از سرویس Nominatim)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
        .then(response => response.json())
        .then(data => {
            const startCoords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
                .then(response => response.json())
                .then(data => {
                    const endCoords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };

                    // به‌روزرسانی مسیر
                    routingControl.setWaypoints([
                        L.latLng(startCoords.lat, startCoords.lng),
                        L.latLng(endCoords.lat, endCoords.lng)
                    ]);
                });
        });
}