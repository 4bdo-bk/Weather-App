const weatherform = document.getElementById("WeatherForm");
const city =  document.getElementById("CityInput");
const card = document.getElementById("Card")
const ApiKey = "4d0ff744af57b2feea77ca4d113c7bd3"

weatherform.addEventListener("submit" , async event =>{
    event.preventDefault();

    if(city.value){
        try{
            const weatherInfo = await getWeatherData(city.value);
            console.log(weatherInfo);
            displayWeatherInfo(weatherInfo);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
})

async function getWeatherData(city){
    const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d0ff744af57b2feea77ca4d113c7bd3`;
    const response = await fetch(ApiUrl); 
    if(!response.ok){
        throw new Error("Could not find city");
        //displayError("Could not find city");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    let Emoji = getWeatherEmoji(id);
    let content = `
            <h2 id="CityDisplay">${city}</h2>
            <p id="temp">${ (temp-273).toFixed(1)}°C</p>
            <p id="humidity">Humidity : ${humidity}%</p>
            <p id="Description">${description}</p>
            <p id="Emoji">${Emoji}</p>
        `

    document.getElementById("Card").innerHTML = content;
}

function displayError(message){

    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay) 
}

function getWeatherEmoji(id){
    switch(true){
        case(id>=200 && id<300) : return "⛈️"
        case(id>=300 && id<400) : return "🌧️"
        case(id>=500 && id<600) : return "🌧️"
        case(id>=600 && id<700) : return "❄️"
        case(id>=700 && id<800) : return "🌫️"
        case(id === 800) : return "☀️"
        case(id>=801 && id<810) : return "☁️"

        default:
            return "❓";
    }
}