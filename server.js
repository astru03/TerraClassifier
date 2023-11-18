const express = require('express');
const app = express()
const port = 3000

//Parser for Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
var satellitenbilderRouter = require('./routes/satellitenbilder.js'); //require add router
//Usages (mainly routers)
app.use('/satellitenbilder', satellitenbilderRouter);


//Folders
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//Gets
app.get("/", (req, res) => { res.sendFile(__dirname + "/public/startseite.html"); });
app.get("/klassifikation", (req, res) => { res.sendFile(__dirname + "/public/klassifikation.html"); });
app.get("/beispiel", (req, res) => { res.sendFile(__dirname + "/public/beispiel.html"); });
app.get("/dokumentation", (req, res) => { res.sendFile(__dirname + "/public/dokumentation.html"); });
app.get("/impressum", (req, res) => { res.sendFile(__dirname + "/public/impressum.html"); });


//Listener
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})