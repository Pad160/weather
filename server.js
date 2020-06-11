// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000;

// Spin up the server
const server = app.listen(port, listening);

// Function for the Server to run
function listening(){
    console.log(`Weather Server is running on localhost: ${port}`);
}

// projectData = {
//     temperature: temperature.main.temp,
//     date: newDate,
//     feelings: feelings
// }

app.get('/weatherData', getAllInformation);

function getAllInformation(req, res){
   res.send(projectData);
   console.log(projectData);
}
 
const data = [];

app.get('/all', getData);

function getData(req, res){
    res.send(data);
    console.log(data);
}

// POST ROUTE

app.post('/addData', addData);

function addData(req,res){

    console.log(req.body);

  newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
  }

  data.push(newEntry);
  res.send(data);
  console.log(data);
}