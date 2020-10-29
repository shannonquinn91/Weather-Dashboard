# Weather-Dashboard
This project was to create a weather application using the Open Weather Map API. The user is able to search for a city and is presented with current weather data for the city as well as a five day forecast. The user's search history should be available using local storage.

I started by creating HTML elements within the bootstrap framework. I knew where on the page I wanted the data from the API to appear and gave the elements descriptive ids so I would understand which data was supposed to appear there. 

Most of the code appears in the event click listener applied to the search button. The first function prevents the search button from refreshing the page (its default behavior).