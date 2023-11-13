var express = require('express');
var router = express.Router();

const { OpenEO } = require('@openeo/js-client');


//get Router
router.post('/', function(req, res, next)  {
    testfunction();
    console.log('test');
})

async function testfunction () {
    try {
        var con = await OpenEO.connect("https://jjdxlu8vwl.execute-api.eu-central-1.amazonaws.com/production");
        // Success
        var info = con.capabilities();
        console.log("API Version: ", info.apiVersion());
        console.log("Description: ", info.description());

    } catch (error) {
        // Error
    }
}







module.exports = router;