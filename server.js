// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(3000, function() {
    console.log('server connected on port:3000')
});

app.get('/', function(req, res) {
    res.send('index')
})

app.post('/', function(req, res) {
    projectData = {
        temp: req.body.temp,
        feelings: req.body.feelings
    }
    console.log(projectData)
    console.log(req.body)
})
app.get('/modified', function(req, res) {
    res.send(projectData)
})