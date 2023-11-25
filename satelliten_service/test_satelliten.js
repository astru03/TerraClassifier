const express = require('express');
const app = express();
const port = 8080

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware für CORS aktivieren
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // Hier können die erlaubten Origin-Domains spezifiziert werden
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/coordinates', (req, res) => {
    const receivedCoordinates = req.body.coordinates;
    // Beispiel: Wenn die Koordinaten im Terminal ausgegeben werden sollen
    console.log(`Erhaltene Koordinaten: (${receivedCoordinates})`);

    //Verändern der erhaltenden daten und wieder zurücksenden an Hauptseite(Client)
    let modifiedRecCoord = { popupDisplayed: true, value: receivedCoordinates, status: 'updated', message: 'Popup wird angezeigt'}
    console.log(modifiedRecCoord);
    if (modifiedRecCoord != null ) {
      res.json(modifiedRecCoord);
    } else {
      res.status(400).json({ error: 'Ungültige Anfrage' });
    }
  });




app.post('/markerCoordinates', (req, res) => {
    const receivedMarkerCoordinates = req.body.markerCoordinates;

    // Beispiel: Wenn die Koordinaten im Terminal ausgegeben werden sollen
    console.log(`Erhaltene Koordinaten: (${receivedMarkerCoordinates})`);
    
    if (receivedMarkerCoordinates != null ) {
      res.json({ popupDisplayed: true, message: 'Popup wird angezeigt' })
    } else {
      res.status(400).json({ error: 'Ungültige Anfrage' });
    }
  });

//Listener
app.listen(port, () => {
    console.log(`satelliten Service listening at http://localhost:${port}`)
  });

  