function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  const apiKey = "07dc75f4c9f12927508aad5b6bc4777f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        updateWeatherUI(response);
      } else {
        document.getElementById("weather").innerHTML =
          '<p style="color: red;">City not found</p>';
      }
    }
  };
  xhr.send();
}

function updateWeatherUI(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Condition: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
}
