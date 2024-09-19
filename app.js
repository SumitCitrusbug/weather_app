require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));

const axios = require("axios");

// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";

// const mepBox = async () => {
//   try {
//     const response = await axios.request({
//       method: "GET",
//       url: geocodeURL,
//     });
//     console.log();
//     return response.body.features[0];
//   } catch (error) {
//     console.error(error);
//   }
// };

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/data", async (req, res) => {
  console.log(req.query);
  const location = req.query.location || "New Delhi"; // Default to "New Delhi" if no location is provided
  // fetch:ip fro your location and location fro text loction
  const weatherOptions = {
    method: "GET",
    url: "https://api.weatherstack.com/current",
    params: {
      access_key: process.env.WEATHER_APP_KEY,
      query: location,
    },
  };
  try {
    const weatherResponse = await axios.request(weatherOptions);
    const weatherData = weatherResponse.data;

    
    console.log(weatherData);
    res.render("index", {
      temperature: weatherData.current.temperature,
      feelslike: weatherData.current.feelslike,
      location: weatherData.location.country,
      region: weatherData.location.region,
      humidity: weatherData.current.humidity,
      description: weatherData.current.weather_descriptions[0],
    });
  } catch (error) {
    console.log(error);
    res.render("index", { error: "not found" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
