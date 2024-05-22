
function updateDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    const dateElement = document.getElementById('date');
    dateElement.innerHTML = `${day}/${month}/${year}  ${time}`;
}
updateDate();
setInterval(updateDate, 1000);

// setting up the api
let place = "sitia";

const cityName = document.getElementById('cityName');
const conditions= document.getElementById('weatherCondition');
const conIcon = document.getElementById('apiIcon1');
let temp = document.getElementById('temp');  //current temp
let feelTemp = document.getElementById('feelTemp');   //feels like temp
const humidity = document.getElementById('humidityNow');
const wind = document.getElementById('windNow');
const pressure = document.getElementById('pressureNow');

const dayAfterIcon= document.getElementById('apiIcon3');
let dayAfterTemp= document.getElementById('temp3'); //day after tomorrow's temp
const dayAfterHumid= document.getElementById('humid3');
const dayAfterWind= document.getElementById('wind3');

const tomorrowIcon= document.getElementById('apiIcon2');
let tomorrowTemp= document.getElementById('temp2'); //tomorrow's temp
const tomorrowHumid= document.getElementById('humid2');
const tomorrowWind= document.getElementById('wind2');





function fetchWeather(place){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${place}&appid=b4d3f82695b7dffee13fce47ea5d6770`;
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();

    })

    .then(data => {
        console.log(data);
        
        let conditions1 = data.weather[0].main; //e.g Clouds
        let conIcon1 = data.weather[0].icon;    //e.g 04d
        let temp1 = Math.floor(data.main.temp) ; //e.g 20
        let feelTemp1 = Math.floor(data.main.feels_like); //e.g 19.5
        let humidNow1 = data.main.humidity; //e.g 50
        let windNow1 = data.wind.speed; //e.g 3.1
        let pressureNow1 = data.main.pressure; //e.g 1013
        let city = data.name; //e.g Athens
        let country = data.sys.country; //e.g GR


        cityName.innerHTML=city +", " +country; // changing the city name
        conIcon.src=`http://openweathermap.org/img/wn/${conIcon1}.png`; // changing the icon of the weather
        temp.innerHTML=temp1 
        feelTemp.innerHTML=feelTemp1
        humidity.innerHTML=humidNow1
        wind.innerHTML=windNow1
        pressure.innerHTML=pressureNow1
        conditions.innerHTML=conditions1    
    })

}


function fetcForecast(place) {
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=b4d3f82695b7dffee13fce47ea5d6770`;
    fetch(apiUrl2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();

    })

    .then(data => {
        console.log(data);
        //data.list[0].main.temp = today's temp , data.list[1].main.temp = tomorrow's temp
        //datas.list[1].weather[0].main = tomorrow's weather condition
        let wcIcon2 = data.list[1].weather[0].icon;
        let wcIcon3 = data.list[2].weather[0].icon;
        let temp2 = Math.floor(data.list[1].main.temp) ;
        let temp3 = Math.floor(data.list[2].main.temp);
        let humid2 = data.list[1].main.humidity ;
        let humid3 = data.list[2].main.humidity ;
        let wind2 = data.list[1].wind.speed ;
        let wind3 = data.list[2].wind.speed ;
    

        tomorrowIcon.src=`http://openweathermap.org/img/wn/${wcIcon2}.png`;
        tomorrowTemp.innerHTML=temp2
        tomorrowHumid.innerHTML=humid2
        tomorrowWind.innerHTML=wind2

        dayAfterIcon.src=`http://openweathermap.org/img/wn/${wcIcon3}.png`;
        dayAfterTemp.innerHTML=temp3
        dayAfterHumid.innerHTML=humid3
        dayAfterWind.innerHTML=wind3

        console.log(wcIcon2,wcIcon3,temp2,temp3,humid2,humid3,wind2,wind3 );
    })
}

fetchWeather(place);
fetcForecast(place);


    //celcius to fahrenheit conversion

    const fahr = document.getElementById('far');
    const cel = document.getElementById('cel');

    console.log(temp.innerHTML*2); 
    cel.addEventListener('click', function(){
        cel.style.backgroundColor="white";
        cel.style.color="black";
        fahr.style.backgroundColor="unset"; 
        fahr.style.color="white";

        temp.innerHTML= Math.floor((temp.innerHTML-32)/1.8)  ; 
        feelTemp.innerHTML= Math.floor((feelTemp.innerHTML-32)/1.8) ;
        tomorrowTemp.innerHTML= Math.floor((tomorrowTemp.innerHTML-32)/1.8) ;
        dayAfterTemp.innerHTML= Math.floor((dayAfterTemp.innerHTML-32)/1.8) ;
    });

    far.addEventListener('click', function(){
        far.style.backgroundColor="white";
        far.style.color="black";
        cel.style.backgroundColor="unset"; 
        cel.style.color="white";

        temp.innerHTML= Math.floor((temp.innerHTML*1.8)+32) ; 
        feelTemp.innerHTML= Math.floor((feelTemp.innerHTML*1.8)+32) ;
        tomorrowTemp.innerHTML= Math.floor((tomorrowTemp.innerHTML*1.8)+32) ;
        dayAfterTemp.innerHTML= Math.floor((dayAfterTemp.innerHTML*1.8)+32) ;
    });


    const cityForm = document.getElementById('cityForm');

    cityForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const cityInput = document.getElementById('searchBar').value;


        fetchWeather(cityInput);
        fetcForecast(cityInput);

    })