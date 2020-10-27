var currentDay = $("#date");
let m = moment();
currentDay.text(m.format("dddd[,] LL"));
var APIkey = "3dc2fb0f58e00d68a8cdc408568026d4"
var searchCity;


$("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchCity = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey; 
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response);
        $("#city").text("Current Weather in " + searchCity);
        var icon = response.weather[0].icon;
        $("#city").append(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`)
        var tempF = response.main.temp;
        tempF = (tempF - 273.15) * 1.80 + 32;
        $("#temp").text("Current Temperature: " + tempF.toFixed(1) + " F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Current Wind Speed: " + response.wind.speed + " mph")
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        //console.log(lat)
        var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey; 

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response){
            $("#uv-index").text(response.value);
        })
      });
      
})