/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/';	
const apiKey = '229bc6c8ca7f4bd02dbeb02c2ee9e906';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('#generate').addEventListener('click', performAction);	
	
function performAction(e){	
    const weather = 'weather';	
    const zipCode = document.querySelector('#zip').value;	
    const feelings = document.querySelector('#feelings').value;
	
    getWeather(url, weather, zipCode, apiKey)
	
    .then(function(data){
	
        postData('/addData', {temperature: data.main.temp, date: newDate, feelings: feelings })
    })
    .then(function(res){
      updateUI();
    })		
}

// POST DATA
const postData = async ( url = '', data = {})=>{	
    
      const response = await fetch(url, {	
      method: 'POST', 	
      credentials: 'same-origin',	
      headers: {	
          'Content-Type': 'application/json',	
      },	
     // Body data type must match "Content-Type" header        	
      body: JSON.stringify(data), 	
    });		
      try {	
        const newData = await response.json();	
        console.log(newData);	
          console.log(data);	
        return newData;	
        	
      }catch(error) {	
      console.log("error", error);	
      }	
  }	

const getWeather = async (url, weather, zipCode, apiKey) => {	
    const res = await fetch(`${url}${weather}?zip=${zipCode},us&appid=${apiKey}`)	

        try{	
            const data = await res.json();	
            return data;	
        } catch(error) {	
            console.log('error', error);	
        }	
    }	
    
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const temperature = allData.temperature;

        document.querySelector('#date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].feelings;
  
    }catch(error){
      console.log("error", error);
    }
  }