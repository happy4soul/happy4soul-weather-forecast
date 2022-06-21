const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req,res){
  var query = req.body.cityName;
  var appid = "88cf95f7cf94614c9f4a97c683c838c8";
  var units = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const weatherdescription = weatherData.weather[0].description;
      const weathericon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      console.log(temp);
      console.log(weatherdescription);
      res.write("<p>The weather description of " + query + " is " + weatherdescription + "</p>");
      res.write("<h1> The temperature of " + query + " is " + temp + " degrees celcius </h1>");
      res.write("<img src = " + imageUrl + ">"); /*we inserted the imageUrl inside the image tag in the res.write section, so that the image will be displayed*/
      res.send();


    })
  })
})


app.listen(3000, function(req, res) {
  console.log("The server is listening on the channel 3000");
})
