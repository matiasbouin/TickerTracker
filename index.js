const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let http = {
        url: `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`,
        headers: {
            "x-ba-key": "YTNiYjJhMzk4MDdiNDQxNjg5OGNmNWU1ZjhjZjFmZDI"
        }
    };

    request(http, function(error, response, body){
        let data = JSON.parse(body);      
        let currentDate = data.display_timestamp;
        
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            console.log(result.last);
            console.log(currentDate);
            res.send(`<h1>Ticker ${crypto}/${fiat} on ${currentDate} is $${result.last}</h1>`);
        }else{
            console.log(error);
            res.send(error);
        }
    });

});

app.listen(3000, function() {
    console.log("Server running on port 3000.");
});