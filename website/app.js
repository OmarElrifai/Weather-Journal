/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API = "&appid=21ce10ca973440409fd9b7d7b60e4cd4&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

//getweather method for making a get request to the external api to get the corresponding weather temperature for entered zip no.  
const getweather = async (urll, zipy, APIi) => {
    const res = await fetch(urll + zipy + APIi)
    try {
        const weather = await res.json();
        const temp = weather.main.temp;
        //        console.log(temp);
        return temp;
    } catch (error) {
        console.log(error)
    }
}

//postobject method for passing the recieved temperature and the user feelings to the internal server endpoint
const postobject = async (url = '', data = {}) => {
    req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const data = await req.json();
        //        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}

//objectback method for recieving the enteries back from the internal api endpoint to be posted on the app webpage 
const objectback = async () => {
    const res = await fetch('/modified');
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
    }
}

//the eventlistener for the generate button that submit the enteries and posts them on the webpage 
document.getElementById("generate").addEventListener('click', function() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getweather(url, zip, API).then(function(temp) {
        postobject('/', {
            temp: temp,
            feelings: feelings
        })
    }).then(function() {
        objectback().then(function(data) {
            document.getElementById('date').innerHTML = "Date: " + newDate;
            document.getElementById('temp').innerHTML = "Temperature: " + data.temp + " Celsius";
            document.getElementById('content').innerHTML = "what's in my mind:<br> " + data.feelings;
        });
    })
})