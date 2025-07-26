const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="1ff4ed5e4abf9293259a5d7b6498f5aa";

weatherform.addEventListener("submit", async event =>{
   event.preventDefault();
   const city=cityinput.value;

  if(city){
    try{
      const weatherdata= await getweatherdata(city);
      weatherdatainfo(weatherdata);
      
    }
    catch(error){
      errorDisplay(error);
    }

  }
  else{
     errorDisplay("please enter a city");
  }

});

async function getweatherdata(city){

  const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
   const response=await fetch(apiurl);

   if(!response.ok){
    throw new Error("could not fetch the data");
   }

   return await response.json();
}

function weatherdatainfo(data){

      const {name:city,
        main:{temp,humidity}, 
        weather:[{description,id}]}=data;

      card.textContent="";
      card.style.display="flex";

  

      const citydisplay=document.createElement("h1");
      const tempdisplay=document.createElement("p");
      const humiditydisplay=document.createElement("p");
      const descdisplay=document.createElement("p");
      const weatheremojidisplay=document.createElement("p");
    

      citydisplay.textContent=city;
      citydisplay.classList.add("cityname");
      card.appendChild(citydisplay);
      

      tempdisplay.textContent=`${(temp-273.15).toFixed(1)}° C`;
      tempdisplay.classList.add("tempdis");
      card.appendChild(tempdisplay);

      humiditydisplay.textContent=`humiduty: ${humidity}%`;
      humiditydisplay.classList.add("humdityDispaly");
      card.appendChild(humiditydisplay);

     descdisplay.textContent=description;
      descdisplay.classList.add("desDisplay");
      card.appendChild(descdisplay);

      weatheremojidisplay.textContent=emojidisplay(id);
      weatheremojidisplay.classList.add("emojiDisplay");
      card.appendChild(weatheremojidisplay);
   


}

function emojidisplay(weatherId){

  switch(true){

    
    case (weatherId >= 200 && weatherId < 300):
    
    return "⛈️";
    
    case (weatherId >= 300 && weatherId < 400):
    
    return "🌧️";
    
    case (weatherId >= 500 && weatherId < 600):
    
    return "🌧️";
    
    case (weatherId >= 600 && weatherId < 700):
    
    return "❄️";
    
    case (weatherId >= 700 && weatherId < 800):
    
    return "💨";
    
    case (weatherId === 800):
    
    return "☀️"
    
    case (weatherId >= 801 && weatherId < 810):
    
    return "☁️"
    
    default:
    
    return "?";

}
}

function errorDisplay(message){

  const errorDisplay=document.createElement("p");
  errorDisplay.textContent=message;
  errorDisplay.classList.add("errorDisplays");

  card.textContent="";
  card.style.display="flex";
  card.appendChild(errorDisplay);
  console.log(message);

}
