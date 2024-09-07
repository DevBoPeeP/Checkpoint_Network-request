const fetchBtn = document.getElementById("getWeatherButton");
const weatherDiv = document.querySelector(".forecast-div");

const fetchWeatherHandler = () => {
  if (!navigator.geolocation) {
    weatherDiv.innerHTML = "<h3>Geolocation not supported by browser</h3>";
    return;
  }

  //Getting the current geolocation
  navigator.geolocation.getCurrentPosition(
    async () => {
      const city = document.getElementById("cityInput").value;
      // const apiKey = "YOUR APIKEY GOES HERE";
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const location = data.name;

      document.getElementById("weatherResult").innerHTML = `
          <h2>Weather in ${location}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
      `;
    },
    (error) => {
      weatherDiv.innerHTML = ` <h3>Error getting geolocation: ${error.message}</h3>`;
    }
  );
};

fetchBtn.addEventListener("click", fetchWeatherHandler);
