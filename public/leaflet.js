var map = L.map('map').setView([51.975, 7.61], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);