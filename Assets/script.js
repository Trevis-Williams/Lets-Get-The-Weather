const today = new Date();
var citynames = JSON.parse(localStorage.getItem('selectedCity')) || []



// Function to update the recently searched cities UI
let recentlySearchedCities = [];

// Reference to the history div in your HTML
const historyDiv = document.getElementById('history');

// Function to update the recently searched cities UI
function updateRecentlySearchedUI() {
  // Clear the previous list
  historyDiv.innerHTML = '';

  recentlySearchedCities.forEach((cityName) => {
    const cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    cityButton.className = 'bg-gray-300 text-white p-2 rounded-lg mb-2';

    // Add a click event listener to the button to fetch weather data
    cityButton.addEventListener('click', function () {
      fetchAndDisplayWeatherForCity(cityName);
    });

    // Append the button to the "Recently Searched" section
    historyDiv.appendChild(cityButton);
  });
}

// Function to add a city to the list of recently searched cities
function addCityToRecentlySearched(cityName) {
  recentlySearchedCities.unshift(cityName); // Add to the beginning of the array
  if (recentlySearchedCities.length > 5) {
    recentlySearchedCities.pop(); // Keep only the last 5 cities
  }
  // Update the UI
  updateRecentlySearchedUI();
}



// Call the function to load and display recently searched cities when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadRecentlySearchedCities();
});


document.addEventListener('DOMContentLoaded', function () {

  const buttonsContainer = document.getElementById('buttonsContainer');



  // Get references to all the buttons by their IDs
  const atlantaButton = document.getElementById('AtlantaButton');
  const newYorkButton = document.getElementById('newYorkButton');
  const denverButton = document.getElementById('denverButton');
  const seattleButton = document.getElementById('seattleButton');
  const sanFranciscoButton = document.getElementById('sanFranciscoButton');
  const orlandoButton = document.getElementById('orlandoButton');
  const redmondButton = document.getElementById('redmondButton');
  const bendButton = document.getElementById('bendButton');

  for (let i = 0; i < citynames.length; i++) {
      var newBtn = document.createElement("button");
      newBtn.textContent = citynames[i];
      newBtn.classList = "bg-gray-300 text-white p-2 rounded-lg mb-2 w-1/5 mt-12"
      newBtn.style.display = "block"; // Set display property to "block"
      newBtn.addEventListener('click', function (event) {
        fetchAndDisplayWeatherForCity(event.target.textContent);
      });

      document.querySelector("#history").append(newBtn)
  }

  atlantaButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Atlanta');
  });

  newYorkButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('New York');
  });

  denverButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Denver');
  });

  seattleButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Seattle');
  });

  sanFranciscoButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('San Francisco');
  });

  orlandoButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Orlando');
  });

  redmondButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Redmond');
  });

  bendButton.addEventListener('click', function () {
    fetchAndDisplayWeatherForCity('Bend');
  });

  // Add a click event listener to a parent container for delegation
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName === '') {
      alert('Please enter a city name.'); 
      return;
    }
    citynames.push(cityName)
    localStorage.setItem('selectedCity', JSON.stringify( citynames));
    fetchAndDisplayWeatherForCity(cityName);
    document.querySelector("#history").innerHTML = "" 
    for (let i = 0; i < citynames.length; i++) {
      var newBtn = document.createElement("button");
      newBtn.textContent = citynames[i];
      newBtn.classList = "bg-gray-300 text-white p-2 rounded-lg mb-2 w-1/5 mt-12"
      newBtn.style.display = "block"; // Set display property to "block"
      newBtn.addEventListener('click', function (event) {
        fetchAndDisplayWeatherForCity(event.target.textContent);
      });

      document.querySelector("#history").append(newBtn)
  }

  });

  function saveCity(event) {
    if (event.target.tagName === 'BUTTON') {
      const cityName = event.target.textContent.trim();
      // Store the selected city in localStorage
      localStorage.setItem('selectedCity', cityName);
      fetchAndDisplayWeatherForCity(cityName);
    }
  }

  // Function to fetch and display weather data for a specific city
  function fetchAndDisplayWeatherForCity(city) {
    const apiKey = '9895c7afaec1f0dce2c066c3da2f0ae2';
  
    // Construct the API URL for the 6-day forecast for the selected city
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((weatherData) => {
        console.log('Received weather data:', weatherData);
  
        
    

    const todayWindSpeed = weatherData.list[0].wind.speed;
 const tommorowWindSpeed = weatherData.list[1].wind.speed;
 const thirdWindSpeed = weatherData.list[2].wind.speed;
 const forthWindSpeed = weatherData.list[3].wind.speed;
 const fithWindSpeed = weatherData.list[4].wind.speed;
 const sixthWindSpeed = weatherData.list[5].wind.speed;


 document.getElementById('wind0').textContent = `Wind: ${todayWindSpeed.toFixed(1)} m/s`;
 document.getElementById('wind3').textContent = `Wind: ${tommorowWindSpeed.toFixed(2)} m/s`;
 document.getElementById('wind1').textContent = `Wind: ${thirdWindSpeed.toFixed(3)} m/s`;
 document.getElementById('wind2').textContent = `Wind: ${forthWindSpeed.toFixed(4)} m/s`;
 document.getElementById('wind4').textContent = `Wind: ${fithWindSpeed.toFixed(5)} m/s`;
 document.getElementById('wind5').textContent = `Wind: ${sixthWindSpeed.toFixed(6)} m/s`;


 const todayHumidity = weatherData.list[0].main.humidity;
 const tommorowHumidity = weatherData.list[1].main.humidity;
 const thirdHumidity = weatherData.list[2].main.humidity;
 const forthHumidity = weatherData.list[3].main.humidity;
 const fithHumidity = weatherData.list[4].main.humidity;
 const sixthHumidity = weatherData.list[5].main.humidity;


  
    document.getElementById('humidity0').textContent = `Humidity: ${todayHumidity.toFixed(1)}%`;
    document.getElementById('humidity1').textContent = `Humidity: ${tommorowHumidity.toFixed(2)}%`;
    document.getElementById('humidity2').textContent = `Humidity: ${thirdHumidity.toFixed(3)}%`;
    document.getElementById('humidity3').textContent = `Humidity: ${forthHumidity.toFixed(4)}%`;
    document.getElementById('humidity4').textContent = `Humidity: ${fithHumidity.toFixed(5)}%`;
    document.getElementById('humidity5').textContent = `Humidity: ${sixthHumidity.toFixed(6)}%`;
   


    const cityInfo = {
      name: weatherData.city.name,
      country: weatherData.city.country,
    };

    const todayWeatherCode = weatherData.list[0].weather[0].icon;
    const tommorowWeatherCode = weatherData.list[1].weather[0].icon;
    const thirdWeatherCode = weatherData.list[2].weather[0].icon;
    const forthWeatherCode = weatherData.list[3].weather[0].icon;
    const fithWeatherCode = weatherData.list[4].weather[0].icon;
    const sixthWeatherCode = weatherData.list[5].weather[0].icon;

    const iconElement0 = document.getElementById('icon0');
    const iconElement1 = document.getElementById('icon1');
    const iconElement2 = document.getElementById('icon2');
    const iconElement3 = document.getElementById('icon3');
    const iconElement4 = document.getElementById('icon4');
    const iconElement5 = document.getElementById('icon5');

    iconElement0.src = `https://openweathermap.org/img/wn/${todayWeatherCode}.png`;
    iconElement1.src = `https://openweathermap.org/img/wn/${tommorowWeatherCode}.png`;
    iconElement2.src = `https://openweathermap.org/img/wn/${thirdWeatherCode}.png`;
    iconElement3.src = `https://openweathermap.org/img/wn/${forthWeatherCode}.png`;
    iconElement4.src = `https://openweathermap.org/img/wn/${fithWeatherCode}.png`;
    iconElement5.src = `https://openweathermap.org/img/wn/${sixthWeatherCode}.png`;
    iconElement0.alt = `Weather Icon for today`;


    // Extract today's temperature from the first item in the list
    const todayTempInKelvin = weatherData.list[0].main.temp;
    const tommorowTempInKelvin = weatherData.list[1].main.temp;
    const thirdTempInKelvin = weatherData.list[2].main.temp;
    const forthTempInKelvin = weatherData.list[3].main.temp;
    const fithTempInKelvin = weatherData.list[4].main.temp;
    const sixthTempInKelvin = weatherData.list[5].main.temp;


    const todayTempInFahrenheit = (todayTempInKelvin - 273.15) * 9/5 + 32;
    const tomorowTempInFahrenheit = (tommorowTempInKelvin - 273.15) * 9/5 + 32;
    const thirdTempInFahrenheit = (thirdTempInKelvin - 273.15) * 9/5 + 32;
    const forthTempInFahrenheit = (forthTempInKelvin - 273.15) * 9/5 + 32;
    const fithTempInFahrenheit = (fithTempInKelvin - 273.15) * 9/5 + 32;
    const sixthTempInFahrenheit = (sixthTempInKelvin - 273.15) * 9/5 + 32;

    document.getElementById('city0').textContent = `Today in: ${cityInfo.name}, ${cityInfo.country}`;
    document.getElementById('temp0').textContent = `Temp: ${todayTempInFahrenheit.toFixed(1)}°F`;
    document.getElementById('temp1').textContent = `Temp: ${tomorowTempInFahrenheit.toFixed(2)}°F`;
    document.getElementById('temp2').textContent = `Temp: ${thirdTempInFahrenheit.toFixed(3)}°F`;
    document.getElementById('temp3').textContent = `Temp: ${forthTempInFahrenheit.toFixed(4)}°F`;
    document.getElementById('temp4').textContent = `Temp: ${fithTempInFahrenheit.toFixed(5)}°F`;
    document.getElementById('temp5').textContent = `Temp: ${sixthTempInFahrenheit.toFixed(6)}°F`;
    
    

  
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }


    
    buttonsContainer.addEventListener('click',saveCity );
  
   
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
      fetchAndDisplayWeatherForCity(selectedCity);
    }

    const tomorrow = new Date();
tomorrow.setDate(today.getDate() );
const tomorrowDateString = tomorrow.toISOString().split('T')[0];


document.getElementById('date0').textContent = `${tomorrowDateString}`;

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrowDateString = dayAfterTomorrow.toISOString().split('T')[0];


document.getElementById('date1').textContent = `${dayAfterTomorrowDateString}`;


const thirdDay = new Date();
thirdDay.setDate(today.getDate() + 2);


const thirdDayDateString = thirdDay.toISOString().split('T')[0];


document.getElementById('date2').textContent = `${thirdDayDateString}`;

const fourthDay = new Date();
fourthDay.setDate(today.getDate() + 3); 


const fourthDayDateString = fourthDay.toISOString().split('T')[0];


document.getElementById('date3').textContent = `${fourthDayDateString}`;


const fifthDay = new Date();
fifthDay.setDate(today.getDate() + 4); 


const fifthDayDateString = fifthDay.toISOString().split('T')[0];


document.getElementById('date4').textContent = `${fifthDayDateString}`;

  })

  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function () {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
  
    if (cityName === '') {
      alert('Please enter a city name.');
      return;
    }
  
    // Store the entered city in localStorage
    localStorage.setItem('selectedCity', cityName);
  
    // Fetch and display weather data for the entered city
    fetchAndDisplayWeatherForCity(cityName);
  });

// Function to update the recently searched cities
function updateRecentlySearched(cityName) {
  // Get the "Recently Searched" section
  const recentlySearchedSection = document.querySelector('.recently-searched-section');
  
  // Create a new button element for the recently searched city
  const cityButton = document.createElement('button');
  cityButton.textContent = cityName;
  cityButton.className = 'bg-gray-300 text-white p-2 rounded-lg mb-2';
  
  // Add a click event listener to the button to fetch weather data
  cityButton.addEventListener('click', function () {
      fetchAndDisplayWeatherForCity(cityName);
  });
  
  // Append the button to the "Recently Searched" section
  recentlySearchedSection.appendChild(cityButton);
}

// ...

// Inside the event listener for the search button click
searchButton.addEventListener('click', function () {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();

  if (cityName === '') {
      alert('Please enter a city name.');
      return;
  }

  // Store the entered city in localStorage
  localStorage.setItem('selectedCity', cityName);
  
  // Update the recently searched cities
  updateRecentlySearched(cityName);
  
  // Fetch and display weather data for the entered city
  fetchAndDisplayWeatherForCity(cityName);
});


// Function to load and display recently searched cities from local storage
// Function to load and display recently searched cities from local storage
function loadRecentlySearchedCities() {
  // Get the "Recently Searched" section
  const recentlySearchedSection = document.querySelector('.recently-searched-section');
  
  // Clear the existing content of the section
  recentlySearchedSection.innerHTML = '';
  
  // Get the recently searched cities from local storage
  const recentlySearchedCities = JSON.parse(localStorage.getItem('recentlySearchedCities')) || [];
  
  // Iterate through the recently searched cities and create buttons
  recentlySearchedCities.forEach((cityName) => {
      const cityButton = document.createElement('button');
      cityButton.textContent = cityName;
      cityButton.className = 'bg-gray-300 text-white p-2 rounded-lg mb-2';
      
      // Add a click event listener to the button to fetch weather data
      cityButton.addEventListener('click', function () {
          fetchAndDisplayWeatherForCity(cityName);
      });
      
      // Append the button to the "Recently Searched" section
      recentlySearchedSection.appendChild(cityButton);
  });
}


// Call the function to load and display recently searched cities when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadRecentlySearchedCities();
});

// ...

// Inside the event listener for the search button click
searchButton.addEventListener('click', function () {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();

  if (cityName === '') {
    alert('Please enter a city name.');
    return;
  }

  // Get the previously searched cities from local storage
const previouslySearchedCities = JSON.parse(localStorage.getItem('recentlySearchedCities')) || [];

// Add the new city to the list of previously searched cities
previouslySearchedCities.push(cityName);

// Store the updated list in local storage
localStorage.setItem('recentlySearchedCities', JSON.stringify(previouslySearchedCities));


  // Fetch and display weather data for the entered city
  fetchAndDisplayWeatherForCity(cityName);
});