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
        polygon: false,
        circle: false,
        circlemarker: false,
        marker: true
    }
})) 

var rectangleCoordinates = null;
var markerCoordinates = null;

// Event-Handler for drawing rectangle
map.on("draw:created", function(event){
  var type = event.layerType,
    layer = event.layer;

    if (type == 'rectangle') {
      rectangleCoordinates = layer.getBounds().toBBoxString();
      console.log(rectangleCoordinates); 
    }
    if (type == 'marker') {
      markerCoordinates = layer.getLatLng().toString();
      console.log(markerCoordinates); 
    }

    drawnFeatures.addLayer(layer);
})
// Event-Handler for editing rectangle
map.on("draw:edited", function(event){
  var layers = event.layers;
  layers.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      rectangleCoordinates = layer.getBounds().toBBoxString();
      console.log('Edited Rectangle Coordinates:', rectangleCoordinates);
    }
    if (layer instanceof L.Marker) {
      markerCoordinates = layer.getLatLng();
      const markerCoordinates = `Latitude: ${markerCoordinates.lat}, Longitude: ${markerCoordinates.lng}`;
      console.log('Edited Marker Coordinates:', markerCoordinates); 
    }
  });
})

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);





// Funktionen für die Aktionen des Menüs
//Wenn dies die erste Funktion wird, über die Sentinal-2 Daten erhalten werden können, müssen folgende vorbeidnungen beachtet/erfüllt/hier im code abgefangen werden
//1. Funktion darf nur ausgeführt werden, wenn auch ein AOI über das Rechteck ausgewählt wurde.
//2. Funktion darf nicht ausgeführt werden, wenn ein AOI über ein Polygon ausgewählt wurde. (Wenn möglich)
//3. Funktion darf nicht ausgeführt werden, wenn kein AOI gewählt wurde
//4. Der Funktion müssen die Koordinaten des gezeichneten Rechtecks übergeben werden
async function showAlert1(coordinates) {
  console.log(coordinates);
  try {
    const response = await fetch('http://localhost:8080/coordinates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coordinates })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Interpretiere die Antwort des Microservices im Frontend
    const data = await response.json();
    //console.log(data);
    if (data.popupDisplayed) {
      console.log('Popup wurde erfolgreich angezeigt:', data.message);
      // Logik um das Popup anzuzeigen
      var popup = document.getElementById('popup');
      popup.style.display = 'block';
      var rectangleCoords = document.getElementById('rectangleCoords');
      rectangleCoords.innerHTML = data.status + ' Koordinaten des Rechtecks: ' + data.value;

    } else {
      console.log('Popup konnte nicht angezeigt werden:', data.message);
    }
  } catch (error) {
    console.error('Es gab einen Fehler:', error);
  }
/*

/* Beispiel. Es können auch Objekte übergeben werden
  fetch(`http://satelliten_service:8080/test_satelliten?Coor=${coordinates}`)
    .then(response => {
      if (response.ok) {
        // Erfolgreiche Antwort erhalten
        console.log('Koordinaten erfolgreich übermittelt');
      } else {
        // Fehler bei der Antwort
        console.error('Fehler beim Senden der Koordinaten:', response.statusText);
      }
    })
    .catch(error => {
      // Fehler beim Senden der Anfrage
      console.error('Fehler beim Senden der Anfrage:', error);
    }); */
   
}
  
async  function showAlert2(markerCoordinates) {
    try {
      const response = await fetch('http://localhost:8080/markerCoordinates', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ markerCoordinates })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Interpretiere die Antwort des Microservices im Frontend
      if (data.popupDisplayed) {
        console.log('popupMarker wurde erfolgreich angezeigt:', data.message);
        // Logik um das Popup anzuzeigen
        var popup = document.getElementById('popupMarker');
        popup.style.display = 'block';
        var markerCoords = document.getElementById('markerCoords');
        markerCoords.innerHTML = 'Koordinaten des Rechtecks: ' + markerCoordinates;
      } else {
        console.log('Popup konnte nicht angezeigt werden:', data.message);
      }
    } catch (error) {
      console.error('Es gab einen Fehler:', error);
    }
  }

function showAlert3() {
    alert('Option 3 wurde geklickt!');
}
  
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}
function closeMarkerPopup() {
    var popup = document.getElementById('popupMarker');
    popup.style.display = 'none';
}

  // Erstelle EasyButtons für die Aktionen des Menüs
  var button1 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/main/public/images/sentinal_icon.png" style="width: 20px; height: 20px;">', function() {
    if(rectangleCoordinates) {
      //console.log(rectangleCoordinates);
      showAlert1(rectangleCoordinates)
      } else {
        console.log("Es wurde kein Rechteck gezeichnet!");
      }
}, 'Sentinal-2');

  var button2 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/main/public/images/trainigsdaten_icon.png" style="width: 20px; height: 20px;">', function() {
  if(markerCoordinates) { 
      console.log(markerCoordinates)
      showAlert2(markerCoordinates)
      } else {
        console.log("Es wurde kein Marker gezeichnet!");
      }
}, 'Trainigsdaten');


  var button3 = L.easyButton('<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/main/public/images/algorithmus_icon.png" style="width: 20px; height: 20px;">', showAlert3, 'Algorithmus');
  
  // Erstellt den Haupt-Button (Burgermenü-Button)
  var toggleMenuButton = L.easyButton({
    position: 'topright',
    states: [{
      stateName: 'closed',
      icon: '<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/main/public/images/menu_icon.png" style="width: 20px; height: 20px;">',
      title: 'Öffne Menü',
      onClick: function (btn, map) {
        btn.state('open');
        button1.addTo(map).setPosition('topright');
        button2.addTo(map).setPosition('topright');
        button3.addTo(map).setPosition('topright');
      }
    }, {
      stateName: 'open',
      icon: '<img src="https://raw.githubusercontent.com/astru03/TerraClassifier/main/public/images/menu_icon.png" style="width: 20px; height: 20px;">',
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

