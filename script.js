var APIkey = "3dc2fb0f58e00d68a8cdc408568026d4"
var searchCity;

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    searchCity = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIkey; 
    console.log(searchCity);
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
})