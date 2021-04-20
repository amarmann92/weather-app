const history = document.querySelector (".historydiv")
const today = document.querySelector (".today")
const forecast = document.querySelector (".forecast")

const api = "462e1590393042b6de4c11d6437c183d";
let city = "Los Angeles";
let queryToday = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api}`;


function getCurrent(){
    fetch(queryToday)
    .then (function (response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        const cityHeader = $("<h2>");
        const weather = $("<h3>");
        const temp = $("<h3>");
        const wind = $("<h3>");
        cityHeader.text(data.name);
        weather.text(data.weather[0].main);
        temp.text(data.main.temp);
        wind.text(data.wind.speed);
        $(today).append(cityHeader, weather, temp, wind);

        fiveforecast(data.coord.lon, data.coord.lat)
    })
}

function fiveforecast(lon, lat) {
    let query = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&exclude=minutely&appid=${api}`

    fetch(query)
    .then (function (response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        for (let i = 1; i < 6; i++) {
            const element = data.daily[i];
            const card = $("<div>");
            const date = $("<h2>");
            const weather = $("<h4>");
            const temp = $("<h4>");
            const wind = $("<h4>");
            const humidity = $("<h4>");
            weather.text(element.weather[0].description);
            temp.text(element.temp.day);
            wind.text(element.wind_speed);
            humidity.text(element.humidity);
            card.addClass("col")

            $(card).append(date, weather, temp, wind, humidity);
            $(forecast).append(card)
        }
    })
}


getCurrent()