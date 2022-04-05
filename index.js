// set-up config and import stuff as needed
// the actual code will go in this file

// write your JS here
import { APP_ID, WEATHER_ICONS } from './config.js';

const city = document.getElementById('city-input');
const searchBtn = document.getElementById('goBtn');
const displayContainer = document.getElementById('weather-container');

const getWeatherData = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}&units=metric`;
  const resp = await fetch(url);

  const data = await resp.json();
  return data;
};

const getWeatherImage = (description) => {
  let img = './images/undraw_Weather_app_re_kcb1.png';

  if (description.includes('rain')) {
    img = './images/undraw_Raining_re_4b55.png';
  } else if (description.includes('cloud')) {
    img = './images/undraw_i_can_fly_7egl.png';
  } else if (description.includes('snow')) {
    img = './images/undraw_snow_games_ohkc.png';
  } else if (description.includes('clear')) {
    img = './images/undraw_sunny_day_bk3m.png';
  }

  return img;
};

const errorCardHtml = (errorMsg, errorCode) => {
  const str = `<div class="card bg-light mt-3 mb-3">
      <div class="card-body">
        <h2 class="card-title text-danger">Oops!</h3>
          <h4 class="card-text">We ran into some error...</h4>
          <p class="card-text text-muted">Error code: ${errorCode}</p>
          <p class="card-text text-muted">Error Message: ${errorMsg}</p>
      </div>
      <img src="./images/undraw_warning_cyit.png" class="card-img" alt="...">
    </div>`;

  return str;
};

const createCardHtml = (cityName, temp, feelsLikeTemp, weatherDesc, weatherIcon) => {
  const weatherImg = getWeatherImage(weatherDesc);
  const htmlString = `<div class="text-center card">
      <div class="row no-gutters ">
        <div class="col-md-5">
              <img src="${weatherImg}" class="card-img mt-4" alt="...">
          </div>
          <div class="col-md-7 card-body mt-5">
              <h5 class="card-title">${cityName} (${WEATHER_ICONS[weatherIcon]})</h5>
              <p class="card-text">The temperature is ${temp}, and it feels like ${feelsLikeTemp}°C</p>
              <p class="card-text">The weather is: ${weatherDesc}</p>
          </div>
        </div>
      </div>`;
  return htmlString;
};

const createWeatherCard = async () => {
  const cityName = city.value;
  const data = await getWeatherData(cityName);
  let htmlString = '';
  if (data.cod === 200) {
    const { temp } = data.main;
    const feelsLikeTemp = data.main.feels_like;
    const weatherDesc = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    htmlString = createCardHtml(cityName, temp, feelsLikeTemp, weatherDesc, weatherIcon);
  } else {
    // process error
    const errorMsg = data.message;
    const errorCode = data.cod;
    htmlString = errorCardHtml(errorMsg, errorCode);
  }
  displayContainer.innerHTML = htmlString;
};

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  await createWeatherCard();
  // console.log( );
});
