// create a variable for the map
var map = L.map('map').setView([51.975, 7.61], 12);

// add the base map
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
        rectangle: true,
        polygon: true,
        circle: false,
        circlemarker: false,
        marker: false
    }
})) 

// Event-Handler for drawing polygons
map.on("draw:created", function(event){
    var layer = event.layer;
    drawnFeatures.addLayer(layer);
})

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);


// Funktionen für die Aktionen des Menüs
//Wenn dies die erste Funktion wird, über die Sentinal-2 Daten erhalten werden können, müssen folgende vorbeidnungen beachtet/erfüllt/hier im code abgefangen werden
//1. Funktion darf nur ausgeführt werden, wenn auch ein AOI über das Rechteck ausgewählt wurde.
//2. Funktion darf nicht ausgeführt werden, wenn ein AOI über ein Polygon ausgewählt wurde. (Wenn möglich)
//3. Funktion darf nicht ausgeführt werden, wenn kein AOI gewählt wurde
function showAlert1() {
    alert('Option 1 wurde geklickt!');
  }

  function showAlert2() {
    alert('Option 2 wurde geklickt!');
  }

  function showAlert3() {
    alert('Option 3 wurde geklickt!');
  }

  // Erstelle EasyButtons für die Aktionen des Menüs
  var button1 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/experimental_branch/public/images/sentinal_icon.png?token=GHSAT0AAAAAACKGDJTZMZOFUECJ56QXRFMIZKQYC6Q" style="width: 20px; height: 20px;">', showAlert1, 'Sentinal-2');
  var button2 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/experimental_branch/public/images/trainigsdaten_icon.png?token=GHSAT0AAAAAACKGDJTZODB7U6WN43DE5SAYZKQYD3Q" style="width: 20px; height: 20px;">', showAlert2, 'Trainigsdaten');
  var button3 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/experimental_branch/public/images/algorithmus_icon.png?token=GHSAT0AAAAAACKGDJTZQXL2SXNVR7X5DHTWZKQYDUQ" style="width: 20px; height: 20px;">', showAlert3, 'Algorithmus');
  
  // Erstelle den Haupt-Button (Burgermenü-Button)
  var toggleMenuButton = L.easyButton({
    position: 'topright',
    states: [{
      stateName: 'closed',
      icon: '<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/experimental_branch/public/images/menu_icon.png?token=GHSAT0AAAAAACKGDJTZM2L5FDBDNYDSUW6QZKQYERA" style="width: 20px; height: 20px;">',
      title: 'Öffne Menü',
      onClick: function (btn, map) {
        btn.state('open');
        button1.addTo(map).setPosition('topright');
        button2.addTo(map).setPosition('topright');
        button3.addTo(map).setPosition('topright');
      }
    }, {
      stateName: 'open',
      icon: '<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/experimental_branch/public/images/menu_icon.png?token=GHSAT0AAAAAACKGDJTZM2L5FDBDNYDSUW6QZKQYERA" style="width: 20px; height: 20px;">',
      title: 'Schließe Menü',
      onClick: function (btn, map) {
        btn.state('closed');
        button1.remove();
        button2.remove();
        button3.remove();
      }
    }]
  });

  // Füge den Haupt-Button zur Karte hinzu
  toggleMenuButton.addTo(map);

