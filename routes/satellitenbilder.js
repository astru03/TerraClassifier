var express = require('express');
var router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); //because Error: 'body-parser deprecated undefined extended'

// Post Router
router.post('/', function(req, res) 
{
    let AOICoordinates = req.body.coordinates;
    console.log(AOICoordinates);
    //Hierrüber kann ich die Satellitendaten vom AWS S3 bucket holen. Müsste aber über GET funktionieren
    //Oder ggf. ganz anders über AWS SDK für JavaScript??????????
    
})



module.exports = router;