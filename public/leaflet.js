var map = L.map('map').setView([51.975, 7.61], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Add Leaflet.draw-Plugin
// Layer on which the User can draw a shape
var drawnFeatures = new L.FeatureGroup();
map.addLayer(drawnFeatures);

// Adding a Leaflet.Draw Toolbar
map.addControl(new L.Control.Draw( {
    edit: {featureGroup: drawnFeatures},
    // Only rectangle and point draw function is needed
    draw: {
        polyline: false, 
        polygon: true,
        circle: false,
        circlemarker: false,
        marker: true,
        rectangle: false
    }
})) 

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);