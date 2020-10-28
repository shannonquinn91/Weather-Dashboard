var currentDay = $("#date");
let m = moment();
currentDay.text(m.format("dddd[,] LL"));
var APIkey = "3dc2fb0f58e00d68a8cdc408568026d4"
var searchCity;


$("#searchBtn").on("click", function(event){
    //Prevent search button from refreshing page by default
    event.preventDefault();
    //AJAX request for weather in city user enters in search box
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
        
        //AJAX request for UV index based on latitude and longitude
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uviURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey; 

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response){
          var uvi = response.value;
          $("#uv-index").text("UV Index: " + uvi);
          if (uvi <= 2){
            $("#uv-index").css("background-color", "green")
          } else if (uvi >= 3){
              $("#uv-index").css("background-color", "yellow")
            } else if (uvi > 5) {
              $("#uv-index").css("background-color", "red")
            }
          })
        })

        //AJAX request for five-day forecast 
        var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIkey;
        $.ajax({
          url: fiveDayURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          //Extract dates and assign to variable
          var dayOne = response.list[0].dt_txt;
          var dayTwo = response.list[2].dt_txt;
          var dayThree = response.list[10].dt_txt;
          var dayFour = response.list[18].dt_txt;
          var dayFive = response.list[26].dt_txt;
          //Set text content to date variable
          $("#dateOne").text(dayOne);
          $("#dateTwo").text(dayTwo);
          $("#dateThree").text(dayThree);
          $("#dateFour").text(dayFour);
          $("#dateFive").text(dayFive);
          //Extract forecast icon and assign to variable
          var iconOne = response.list[0].weather[0].icon;
          var iconTwo = response.list[2].weather[0].icon;
          var iconThree = response.list[10].weather[0].icon;
          var iconFour = response.list[18].weather[0].icon;
          var iconFive = response.list[26].weather[0].icon;
          //Append icon to appropriate day's forecast
          $("#iconOne").append(`<img src="http://openweathermap.org/img/wn/${iconOne}@2x.png">`);
          $("#iconTwo").append(`<img src="http://openweathermap.org/img/wn/${iconTwo}@2x.png">`);
          $("#iconThree").append(`<img src="http://openweathermap.org/img/wn/${iconThree}@2x.png">`);
          $("#iconFour").append(`<img src="http://openweathermap.org/img/wn/${iconFour}@2x.png">`);
          $("#iconFive").append(`<img src="http://openweathermap.org/img/wn/${iconFive}@2x.png">`);
          //Extract forecasted temp and assign to variable
          var tempOne = (response.list[0].main.temp - 273.15) * 1.80 + 32;
          var tempTwo = (response.list[2].main.temp - 273.15) * 1.80 + 32;
          var tempThree = (response.list[10].main.temp - 273.15) * 1.80 + 32;
          var tempFour = (response.list[18].main.temp - 273.15) * 1.80 + 32;
          var tempFive = (response.list[26].main.temp - 273.15) * 1.80 + 32;
          //Set text content of temperature div on appropriate day's forecast
          $("#tempOne").text("Temperature: " + tempOne.toFixed(1) + " F");
          $("#tempTwo").text("Temperature: " + tempTwo.toFixed(1) + " F");
          $("#tempThree").text("Temperature: " + tempThree.toFixed(1) + " F");
          $("#tempFour").text("Temperature: " + tempFour.toFixed(1) + " F");
          $("#tempFive").text("Temperature: " + tempFive.toFixed(1) + " F");
          //Extract forecasted humidity and assign to variable
          var humidOne = response.list[0].main.humidity;
          var humidTwo = response.list[2].main.humidity;
          var humidThree = response.list[10].main.humidity;
          var humidFour = response.list[18].main.humidity;
          var humidFive = response.list[26].main.humidity;
          //Set text content of humidity div on appropriate day's forecast
          $("#humidOne").text("Humidity: " + humidOne + "%");
          $("#humidTwo").text("Humidity: " + humidTwo + "%");
          $("#humidThree").text("Humidity: " + humidThree + "%");
          $("#humidFour").text("Humidity: " + humidFour + "%");
          $("#humidFive").text("Humidity: " + humidFive + "%");
        })
      });
