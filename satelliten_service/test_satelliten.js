var express = require('express');
const app = express();
const port = 8080


app.get('/test_satelliten', (req, res) => {
    // Koordinaten aus der GET-Anfrage erhalten
    const Coor = req.query;
  
    // Beispiel: Wenn die Koordinaten im Terminal ausgegeben werden sollen
    console.log(`Erhaltene Koordinaten: (${Coor})`);
  
    // Hier könntest du die Logik zur Anzeige der Koordinaten im Popup-Fenster implementieren
    // ...
  
    res.sendStatus(200); // Erfolgreiche Antwort zurückgeben
  });



//Listener
app.listen(port, () => {
    console.log(`satelliten Service is running on port ${port}`)
  });