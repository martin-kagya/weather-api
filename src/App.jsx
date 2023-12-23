import { useState, useEffect } from "react";
import Details from "./Details.jsx"
import "./index.css"

function App()
{
  const [icon, setIcon] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [description, setDescription] = useState(null)
  const [Data, setData] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [city, setCity] = useState(null)
  const [location, setLocation] = useState(null)
  const time = new Date().toLocaleTimeString().slice(0, 2);
  const date = new Date().toLocaleDateString();
  
  async function getData (e, city)
    {
      searchbar.blur()
      window.localStorage.setItem("location", location)
      if(e){
        e.preventDefault()
      }
      try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=502edef82faa368dd2b7d1f1449672de`)
        const data = await response.json()
        const details = data.main
        setData(data)
        setTemperature(details.temp - 273.15)
        setDescription(data.weather[0].description)
        setHumidity(details.humidity)

        console.log(data.weather[0].description)
    }
  catch(error){
      console.log(error)
    }
  }
  function iconChange(description, temperature) {
    const iconMappings = {};
    if (String(description).includes("thunderstorm")){
      iconMappings[description] = "https://img.icons8.com/fluency/48/storm.png";
    }
    if ((String(description).includes("rain") || String(description).includes("drizzle"))){
      iconMappings[description] = "https://img.icons8.com/color/48/000000/rain.png";
    }
    if (String(description).includes("clouds")){
      if(time <= 17 && time >= 5){
        iconMappings[description] = "https://img.icons8.com/office/80/partly-cloudy-day--v1.png" 
      }else{
      iconMappings[description] = "https://img.icons8.com/external-icongeek26-flat-icongeek26/64/external-Cloud-Moon-weather-icongeek26-flat-icongeek26.png";
    }
  }
    if (String(description).includes("clear")){
      if(time >= 17 || time <= 5){
        iconMappings[description] = "https://img.icons8.com/emoji/48/crescent-moon-emoji.png";
      }
      else{
        iconMappings[description] = "https://img.icons8.com/color/48/000000/summer.png";
      }
      
    }

    if(String(description).includes("haze")){
      if(time >= 17 || time <= 5){
        iconMappings[description] = "https://img.icons8.com/arcade/64/fog-night.png"
      }
      else{
        iconMappings[description] = "https://img.icons8.com/arcade/64/fog-day.png"
      }
    }

    if (String(description).includes("rain") && time <= 17){
      iconMappings[description] = "https://img.icons8.com/arcade/64/downpour.png";
    }
    if (String(description).includes("snow")){
      iconMappings[description] = "https://img.icons8.com/color/48/000000/snow.png";
    }
  
    const iconUrl = iconMappings[description] || "https://img.icons8.com/color/48/000000/summer.png";
    setIcon(iconUrl);
  }

useEffect(() => {
  if(location){
  const storedLocation = window.localStorage.getItem("location")
  getData(null, storedLocation)
  }
  iconChange(description)
  setBackground(time)
  if (temperature < 0)
  {
    setIcon("https://img.icons8.com/color/48/snow--v1.png")
  }
}, [temperature, description, time])
function setBackground(time)
{
  if (time <= 17 && time >=5){
    const body = document.querySelector("body");
    body.classList.add("background-day")
  }
  else if(time >= 17 || time < 5)
  {
    const body = document.querySelector("body")
    body.classList.add("background-night")
  }
}
const searchbar = document.querySelector(".search");

if (isSearchActive) {
  searchbar.classList.add("searchFocus"); 
}


  return(
    <>
    <div className="container top-4  app absolute text-white md:text-4xl text-2xl lg:text-4xl">
      <form onSubmit={(e) => {getData(e, city); setIsSearchActive(false)}} className="flex justify-center form" name="get-data">
        <div className="search-icon text-2xl">
          <img height="10px" width="20px" src="https://img.icons8.com/color/48/search--v1.png" className="absolute m-1 top-4 searchIcon right-1">
          </img>
        </div>
          <input type="text" className="search top-4 flex justify-center items-center absolute text-2xl rounded-lg" required
          placeholder={isSearchActive ? "Enter City" : ""}
          onFocus={() => setIsSearchActive(true)}
          onChange={e => {setCity(e.target.value); setLocation(e.target.value)}}>
          </input>
      </form>
      {!temperature && (
      <div className="flex justify-center items-center mt-6 h-48">
        <h2 className="italic">Click the icon above to enter a city</h2>

      </div>
      )}
      {
        temperature && (
          <>
            <div className="flex flex-col items-center justify-center mt-32">
              <h1 className="text-4xl font-bold p-6 calistoga">{city}</h1>
              <p>{description}</p>
              <img src={icon} alt="icon" className="w-24 h-24"/>
              <h1 className="text-7xl">{Math.round(temperature)}°</h1>
            </div>
            <Details
              data = {Data}
              date={date}
              humidity={humidity}
            />
          </>
        )
      }
      </div>
      <footer className="italic text-xs">Made by Martin</footer>
    </>
  )


}

export default App