// const currentW = document.querySelector('#weather');
console.log("Going to GET WEATHER data");

// CREATE REQUIRED VARIABLES FOR THE WEATHER URL
const myKey = "f44c25e8ddaccc184445b81307d5458e";
const myLat = "10.156421";
const myLong = "-67.999718";

// weatherUrl that includes the API request for my Provo-home data
const weatherUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch(url) {
// First:  await fetch(weatherUrl);      for the web page to responsd
// Second: await response.json(); for the web page to send us the requested data
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);    // testing only
            if (url == weatherUrl) {
                displayCurrentWeather(data);
            } else if (url == forecastUrl) {
                // console.log("Going to display Forecast");
                // console.log(`list[0].dt VALUE IS: ${data.list[0].dt}`);
                displayForecast(data);
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
};

function displayCurrentWeather(data) {
    console.log("displayCurrentWeather function called");
    // console.log(data);

    let todayDiv = document.querySelector('#weather1');
    todayDiv.innerHTML = `<section">
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" width="100" height="100">
    <div>
    <p>The current temperature in Valencia, Carabobo is</p>
    <h3>${data.main.temp.toFixed(0)}&deg;F</h3>
    <p>${data.weather[0].description}</p>
    </div>
    </section>`;
};

function displayForecast(data) {
    console.log("displayForecast function called");
        
    // Select forecast-id HTML elements in the document
    let day1Div = document.querySelector('#forecast1');
    let day2Div = document.querySelector('#forecast2');
    let day3Div = document.querySelector('#forecast3');

    // console.log(data);
    dateArray = createDatesArray();
    const arrayFromObject = Object.values(data.list); 
    let filteredDay1 = filterArray(arrayFromObject, dateArray[1]);
    let filteredDay2 = filterArray(arrayFromObject, dateArray[2]);
    let filteredDay3 = filterArray(arrayFromObject, dateArray[3]);
    // console.log(filteredDay1);

    let day1 = returnDayInfo(filteredDay1, dateArray[1]);
    // console.log(`Day 1 INFO is: ${day1}`);
    day1Div.innerHTML = createForecastCard(day1);

    let day2 = returnDayInfo(filteredDay2, dateArray[2]);
    // console.log(`Day 2 INFO is: ${day2}`);
    day2Div.innerHTML = createForecastCard(day2);

    let day3 = returnDayInfo(filteredDay3, dateArray[3]);
    // console.log(`Day 3 INFO is: ${day3}`);
    day3Div.innerHTML = createForecastCard(day3);

    // console.log(day1[1]);
    // console.log(day2[1]);
    // console.log(day3[1]);
}  

function formatDate (date) {
    const options = {
        year:  "numeric",
        month: "2-digit",
        day:   "2-digit"
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const [month, day, year] = formattedDate.split("/");
    newDate = `${year}-${month}-${day}`;
    // console.log(`=========================================`);
    // console.log(`===== The NEW formattedDate: ${newDate} =====`);
    return newDate;
};

function createDatesArray () {
    const today = new Date();
    const newday = new Date();
    const dateArray = [];
    for (i=0; i<4; i++ ){
        dateArray[i] = formatDate(newday.setDate(today.getDate() + i));
        // console.log(`SHOWING dateArray[${i}]: ${dateArray[i]}`);
    }
    return dateArray;
};
    
function filterArray(array, requestedDate) {
// Process array items searching for matching dates and 
// store them into the filtered array
    // console.log(array);
    // console.log(requestedDate);
    const filteredArray = array.filter((item) => {
        // console.log(`START: ${item.dt_txt}`);  // TODO - DEBUG
        const itemDay = new Date(item.dt_txt);
        // console.log(`FROM filterArray function: ${itemDay}`);
        let itemDate = formatDate(itemDay);
        // console.log(`itemDate:      ${itemDate}`);
        // console.log(`requestedDate: ${requestedDate}`);
        if (itemDate == requestedDate) {
            // console.log(`PASS:  ${item.dt_txt}`);  // TODO - DEBUG
            return item;
        // } else {
            // console.log(`FAIL:  ${item.dt_txt}`);  // TODO - DEBUG
        };
    });
    // console.log(filterArray);
    return filteredArray;
}

function returnDayInfo (array, dateString) {
    let max = 0;
    let desc = "";
    let date = dateString;
    let icon = "initialIcon";
    let returnData = [max, desc, date, icon];
    // console.log(`INITIAL returnData values: ${returnData}`)

    // console.log(returnData);
    // console.log(array.length);
    // console.log(array[0].main.temp_max);
    for (let i=0; i<array.length; i++) {
        if (array[i].main.temp_max > max) {
            max = array[i].main.temp_max;
            // console.log(`for-loop temp_max is ${array[i].main.temp_max}`);
        }
        desc = array[i].weather[0].description;
        // console.log(array[i].weather[0].description);

        icon = array[i].weather[0].icon;
        // console.log(array[i].weather[0].description);
    };

    returnData[0] = icon;
    returnData[1] = getFullDate(dateString);
    returnData[2] = desc;
    returnData[3] = max.toFixed(0);
    // console.log(`FINAL returnData values: ${returnData}`);
    return returnData;
};

function getFullDate(dt) {
    const day = new Date(dt);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return day.toLocaleString("en-us", options);
}

function createForecastCard(info) {
    return `<section">
    <img src="https://openweathermap.org/img/wn/${info[0]}@2x.png" alt="${info[2]}" width="100" height="100">
    <div>
    <h4>${info[1]}</h4>
    <p class="weather-desc">${info[2]}</p>
    <p>High: ${info[3]}&deg;F</p>
    </div>
    </section>`
};

apiFetch(weatherUrl);
apiFetch(forecastUrl);