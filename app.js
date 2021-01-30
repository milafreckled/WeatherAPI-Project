const express = require("express");
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const date = require(__dirname+"/date.js");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html");
});
app.post("/", (req, res) => {
    console.log("Post request received");
    const query = req.body.cityName;
    const APIKey = "";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APIKey+"&units=metric";

    https.get(url, function(response){
        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          if (weatherData.cod === 200){
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            let today = date.getDate();
            let time = date.getTime();
            res.render('weather', {currentTime: time, todaysDate: today, chosenCity: query, weather: description, temperature: temp, imageSource: imageURL});
          }else{
          res.send("City not found.");
      }
      });
    });
});
app.get("/archive", (req, res) =>{
  res.render('archive');
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
// https://guarded-mesa-62444.herokuapp.com/
