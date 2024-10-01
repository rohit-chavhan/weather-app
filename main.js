const locations = document.querySelector('.location');
const options = document.querySelector('.choose');

const h1Tag = document.querySelector('h1');
const img = document.querySelector('img');
const loaders = document.querySelector('.loading');

async function getApi(value = 'cat') {
  let giphy = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=NVj9aUimjYZS9lepoSNCrhrUOuHyNRCt&tag=${value}&rating=g`
  );
  let json = await giphy.json();
  img.src = json.data.images.original.url;
}

async function weatherApi(location, temp) {
  loaders.classList.add('loader');
  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${temp}&key=ZMX4HVGY268SR9HX6G247C9FV&contentType=json`
  );
  loaders.classList.remove('loader');
  let degrees = temp === 'us' ? 'Fahrenheit' : 'Celsius';
  let jsonify = await data.json();
  let currentWeather = jsonify.currentConditions.conditions;
  let currentTemp = jsonify.currentConditions.temp;
  await getApi(currentWeather);
  h1Tag.innerHTML = `current temperature is ${currentTemp} ${degrees} and current weather is ${currentWeather}`;
}

document.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  weatherApi(locations.value, options.value).catch(
    () => (h1Tag.innerHTML = 'hey you entered invalid location')
  );
});
