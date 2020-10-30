var currentDay = $("#date");
let m = moment();
currentDay.text(m.format("dddd[,] LL"));
var APIkey = "3dc2fb0f58e00d68a8cdc408568026d4"
var searchCity;
var searchHistory = $("#searchHistory");

//Page loads, get all data from the object to local storage
var searchItem = JSON.parse(localStorage.getItem("searchTerm")) || {};

$("#searchBtn").on("click", function(event){
    //Prevent search button from refreshing page by default
    event.preventDefault();
    searchCity = $("#searchInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey; 
    //Local storage- needs help
    var city = $(this).attr("key", "city");
    searchItem[city] = searchCity;
    localStorage.setItem("searchTerm", JSON.stringify(searchItem));
    //create HTML element when appending
    searchHistory.append(`<p> ${searchItem[city]} </p>`);
    //AJAX request for weather in city user enters in search box
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response);
        //Display to user the city they searched for
        $("#city").text("Current Weather in " + searchCity);
        //Extract current weather icon and store in variable
        var icon = response.weather[0].icon;
        //Append icon to appear next to the name of the city
        $("#city").append(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`)
        //Extract current temperature and do math on it to convert to F 
        var tempF = (response.main.temp - 273.15) *1.80 + 32;
        //Set text of temperature h2 on HTML
        $("#temp").text("Current Temperature: " + tempF.toFixed(1) + " F");
        //Set text of humidity h2 on html with humidity data from response
        $("#temp").text("Current Temperature: " + tempF.toFixed(1) + " F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        //Set text of wind speed h2 on html with wind speed data from response
        $("#wind-speed").text("Current Wind Speed: " + response.wind.speed + " mph")
        
        //AJAX request for UV index based on latitude and longitude
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey; 

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response){
          //Extract value of the UV index and store in a variable
          var uvi = response.value;
          //Set text of UV index h2 on html
          $("#uv-index").text("UV Index: " + uvi);
          //Change background of UV index h2 depending on value- needs work
          if (uvi <= 3){
            $("#uv-index").css("background-color", "green")
          } else if (uvi >= 3){
              $("#uv-index").css("background-color", "yellow")
            } else if (uvi > 5) {
              $("#uv-index").css("background-color", "red")
            }
          })
        })

        //AJAX request for five-day forecast 
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIkey;
        $.ajax({
          url: fiveDayURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          //Extract dates and store in variables
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
          //Extract forecast icon and store in variables
          var iconOne = response.list[0].weather[0].icon;
          var iconTwo = response.list[2].weather[0].icon;
          var iconThree = response.list[10].weather[0].icon;
          var iconFour = response.list[18].weather[0].icon;
          var iconFive = response.list[26].weather[0].icon;
          //Append icon to appropriate day's forecast
          $("#iconOne").attr("src", "http://openweathermap.org/img/wn/" + iconOne + "@2x.png");
          $("#iconTwo").attr("src", "http://openweathermap.org/img/wn/" + iconTwo + "@2x.png");
          $("#iconThree").attr("src", "http://openweathermap.org/img/wn/" + iconThree + "@2x.png");
          $("#iconFour").attr("src", "http://openweathermap.org/img/wn/" + iconFour + "@2x.png");
          $("#iconFive").attr("src", "http://openweathermap.org/img/wn/" + iconFive + "@2x.png");
          //Extract forecasted temp and store in variables
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
          //Extract forecasted humidity and store in variables
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
