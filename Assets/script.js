const apiKey = '9895c7afaec1f0dce2c066c3da2f0ae2'; // Replace with your actual API key
const latitude = 44.34;
const longitude = 10.99;

// Construct the API URL
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

// Make the GET request to the API
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((weatherData) => {
    // Now you can work with the weather data as needed
    console.log(weatherData);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  })
  .then((weatherData) => {
    // Extract information for New York
    const newYorkData = weatherData.list.filter((forecast) => {
      // Assuming "New York" is in the city name or description
      return forecast.name.toLowerCase().includes('new york') || forecast.weather[0].description.toLowerCase().includes('new york');
    });

    // Now you can work with the New York-specific weather data as needed
    console.log(newYorkData);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });


  //pass a filter like you did for the genrens in the  live local app 