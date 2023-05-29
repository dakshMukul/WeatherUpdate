// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=4c153e3b4639b91c10cfedbb3c9ddc0d

const bg = document.querySelector(".main-container");

const weatherApi = {
    key: "4c153e3b4639b91c10cfedbb3c9ddc0d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

// Event Listner on keypress
const searchInputBox = document.querySelector("#input-box");

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);

        getWeatherReport(searchInputBox.value)
    }
});


// Get weather repost
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => { return weather.json();})
        .then(showWeatherReport);
}

// Show weather report
function showWeatherReport(weather) {
    console.log(weather);
    //show city name----------------------------------
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    //show tempreture in deg C

    let temp = document.getElementById('temp-deg')
    temp.innerHTML = ` ${Math.round(weather.main.temp)}&deg;C`
    // show temprature

    let weatherType = document.querySelector(".temp-type")
    weatherType.innerText = `${weather.weather[0].main}`

    // show weather icon
    let weatherIcon = document.getElementById('weather-icon');



    //set min-max------------------------------------------

    let minTemp = document.querySelector(".temp-min");
    let maxTemp = document.querySelector(".temp-max");

    minTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg; C  (min) `;
    maxTemp.innerHTML = `${Math.floor(weather.main.temp_max)}&deg; C (max)`;

    //show weather information----------------------
    let windspeed = document.getElementById('wind');
    let humidity = document.getElementById('humidity');
    let presssure = document.getElementById('pressure');

    windspeed.innerHTML = `${weather.wind.speed} mph`
    humidity.innerHTML = `${weather.main.humidity}% `
    presssure.innerHTML = `${weather.main.pressure} in`


    let date = document.querySelector(".date");
    let todaysDate = new Date();
    date.innerHTML = dateManage(todaysDate);

    // Changin the backgorund color dynamically
    if (weatherType.textContent == 'Smoke') {
        bg.style.backgroundImage ="url('img/fog.jpg')";
    } else if (weatherType.textContent == 'Clouds') {
        bg.style.backgroundImage = "url('img/cloudy.jpg')";
    } else if (weatherType.textContent == 'Clear') {
        bg.style.backgroundImage = "url('img/clear.jpg')";
    }else if (weatherType.textContent == 'Haze') {
        bg.style.backgroundImage = "url('img/haze.jpg')";
    } else if (weatherType.textContent == 'Rainy') {
        bg.style.backgroundImage = "url('img/rainy.jpg')";
    } else if (weatherType.textContent == 'Snow') {
        bg.style.backgroundImage = "url('img/snow.jpg')";
    } else if (weatherType.textContent == 'Sunny') {
        bg.style.backgroundImage = "url('img/sunny.jpg')";
     }


    // Date manage
    function dateManage(dataArg) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Satruday"]

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let year = dataArg.getFullYear();
        let month = months[dataArg.getMonth()];
        let date = dataArg.getDate();
        let day = days[dataArg.getDay()];

        return `${date} ${month} (${day}), ${year}`;
    }
}