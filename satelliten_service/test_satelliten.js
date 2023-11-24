const express = require('express');
const app = express();
const port = 8080

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware für CORS aktivieren
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // Hier kannst du deine erlaubten Origin-Domains spezifizieren
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/coordinates', (req, res) => {
    // Koordinaten aus der GET-Anfrage erhalten
    //const Coor = req.query;
    const receivedCoordinates = req.body.coordinates;
  
    // Beispiel: Wenn die Koordinaten im Terminal ausgegeben werden sollen
    console.log(`Erhaltene Koordinaten: (${receivedCoordinates})`);
  
    // Hier könntest du die Logik zur Anzeige der Koordinaten im Popup-Fenster implementieren
    // ...
  
    res.sendStatus(200); // Erfolgreiche Antwort zurückgeben
  });



//Listener
app.listen(port, () => {
    console.log(`satelliten Service listening at http://localhost:${port}`)
  });

  