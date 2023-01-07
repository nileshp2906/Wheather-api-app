var API_KEY = `f10110e48c259871ac11df143700c30c`;


var searchCity = document.getElementById("search");
var temp = document.querySelector(".temp-celcius");
var tempStatus = document.querySelector(".temp-status");
var pressure = document.getElementById("pressure")
var form = document.querySelector("form");
var visibility = document.getElementById("visibility");
var humidity = document.getElementById("humidity");
var cityName = document.querySelectorAll(".main-txt");
var imageShow = document.getElementById("online-img");
var backgroundShow = document.getElementById("wheather-display");
var airSpeed = document.querySelector(".air-speed");

var getwheather = async  (city) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url)
    if(response.status == 404){
        console.log("city not found");
        temp.innerHTML = 0 + "<sup>0</sup>" + "C";
        cityName.innerHTML = "city not found";
        tempStatus.innerHTML = "not found";
        humidity.innerHTML = 0 + "%";
        pressure.innerHTML = 0 + "mb";
        visibility.innerHTML = 0 + "km";
    }
    else {
        const data = await response.json();
        displayWheather(data);
    }
    console.log(response.status);
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(searchCity.value);
    getwheather(searchCity.value);
})

function displayWheather(data){
    temp.innerHTML = data.main.temp + "<sup>0</sup>" + "C";
    tempStatus.innerHTML = data.weather[0].description;
    humidity.innerHTML = data.main.humidity + "%";
    pressure.innerHTML = data.main.pressure + "mb";
    cityName.forEach((e)=>{
        e.innerHTML = searchCity.value;
    });

    airSpeed.innerHTML = data.wind.speed*3.6;
    visibility.innerHTML = data.visibility/1000 + "km";
    console.log( data)
    console.log(data.weather[0].description)

    if(data.main.temp > 30 && data.main.temp < 40 ) {
        backgroundShow.style.backgroundImage = `url(${"./assets/img/forest.jpg"})`;
        console.log("greater than 30")
    }

    else if(data.main.temp < 30 && data.main.temp > 20 ) {
        backgroundShow.style.backgroundImage = `url(${"./assets/img/coludy.jpg"})`;
    }

    else if(data.main.temp>40) {
        backgroundShow.style.backgroundImage = `url(${"./assets/img/desertjpg.jpg"})`;
    }

    else {
        backgroundShow.style.backgroundImage = `url(${"./assets/img/ice.jpg"})`;
    }

}