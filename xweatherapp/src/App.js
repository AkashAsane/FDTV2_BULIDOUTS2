import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [fetchweather, setFetchweather] = useState(null);
  const[loading,setLoading]=useState(false);

  const key = "a6cb99dab77945a6b5440758242902";

  useEffect(() => {
    if (fetchweather && city !== " ") {
      setLoading(true)
      axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
        .then((response) => {
          setWeatherdata(response.data);
          setFetchweather(false)
          setLoading(false)
         
          
        })
      .catch((e) => {
        alert("Failed to fetch weather data", e);
        setFetchweather(false);
      });
    }
  }, [city, fetchweather]);

  const handlesearch = () => {
    setFetchweather(true);
    setWeatherdata("")
  };

  return (
    <div className="wrapper">
      <div className="weatherwrapper">
        <div className="title">
        <input
          type="text"
          placeholder="enter the city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handlesearch}>Search</button>
        </div>
        { loading ? ( 
          <p>Loading data...</p>
          ):weatherdata ? (
          <div className="weather-cards">
          
            <p className="weather-card">Temperature <span>{weatherdata.current.temp_c}°C</span></p>
            <p className="weather-card">Humidity    <span>{weatherdata.current.humidity}</span></p>
            <p className="weather-card">Condition   <span>{weatherdata.current.condition.text}</span></p>
            <p className="weather-card">Wind Speed  <span>{weatherdata.current.wind_kph} kph</span></p>
          </div>
        ): null}
        
      </div>
    </div>
  );
}

export default App;
