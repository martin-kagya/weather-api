import { useState, useEffect } from "react";
import "./index.css"

function App()
{
  const [icon, setIcon] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [description, setDescription] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [city, setCity] = useState(null)
  const time = new Date().toLocaleTimeString().slice(0, 2);
  async function getData (e)
    {
      e.preventDefault()
      try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=502edef82faa368dd2b7d1f1449672de`)
        const data = await response.json()
        const details = data.main
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
        iconMappings[description] = "https://img.icons8.com/fluency/48/crescent-moon.png";
      }
      else{
        iconMappings[description] = "https://img.icons8.com/color/48/000000/summer.png";
      }
      
    }
    if (String(description).includes("rain") && time <= 17){
      iconMappings[description] = "image/Sun cloud angled rain.png";
    }
    if (String(description).includes("snow")){
      iconMappings[description] = "https://img.icons8.com/color/48/000000/snow.png";
    }
  
    const iconUrl = iconMappings[description];
    setIcon(iconUrl);
  }

useEffect(() => {
  iconChange(description)
  if (temperature < 0)
  {
    setIcon("https://img.icons8.com/color/48/snow--v1.png")
  }
}, [temperature])



function handleInput(e)
{
  e.preventDefault()
  const newcity = e.target.value;
  setCity(newcity)
  getData()
}
  return(
    <>
    <div className="contain text-white">
      <form onSubmit={getData} className="flex justify-center items-center pt-8" name="get-data">
        <div className="search-icon">
          <img height="10px" width="20px" src="https://img.icons8.com/color/48/search--v1.png" className="absolute right-4 top-5">
          </img>
        </div>
          <input type="text" className="search flex justify-center items-center" required
          placeholder={isSearchActive ? "Enter City" : ""}
          onFocus={() => setIsSearchActive(true)}
          onChange={handleInput}></input>
      </form>

      {
        temperature && (
          <div className="flex flex-col items-center justify-center pt-8">
            <img src={icon} alt="icon" className="w-24 h-24"/>
            <h1 className="text-2xl font-bold p-6">{city}</h1>
            <h1 className="text-7xl">{Math.round(temperature)}°</h1>
            <h1 className="text-2xl font-bold p-8">{description}</h1>
            <h1 className="text-2xl font-bold">Humidity: {humidity}</h1>
          </div>
        )
      }
      </div>
    </>
  )


}

export default App