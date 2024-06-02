import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const[cities,setCities]=useState([]);

  const [selectedcountries, setSelectedcountries] = useState("");
  const [selectedstate, setSelectedstate] = useState("");
  const[selectedCity,setSelectedcity]=useState("")

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((e) => console.log("error in fecting data", e));
  }, []);

  useEffect(() => {
    if(selectedcountries){
    axios
      .get(
        `https://crio-location-selector.onrender.com/country=${selectedcountries}/states`
      )
      .then((response) => {
        setStates(response.data);
        setSelectedstate("")
        setCities([])
        
      })
      .catch((e) => console.log("error in fetching states", e));
    }
  }, [selectedcountries]);

  useEffect(()=>{
         if(selectedcountries && selectedstate)
          {
            axios
            .get(
              `https://crio-location-selector.onrender.com/country=${selectedcountries}/state=${selectedstate}/cities`
            )
            .then((response) => {
              setCities(response.data);
              setSelectedcity("")
              
            })
            .catch((e) => console.log("error fetching city", e));

          }
  },[selectedcountries,selectedstate])


  return (
    <div className="wrapper">
      <h1>Select Location</h1>

      <div className="selecttabs">
        <select
          value={selectedcountries}
          onChange={(e) => setSelectedcountries(e.target.value)}
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>
        <select value={selectedstate}
         onChange={(e)=>setSelectedstate(e.target.value)}
        >
          <option value="" disabled>Select State</option>
          {
            states.map((state)=>(
                <option key={state} value={state}>
                  {state}
                </option>
            ))
          }
        </select>
        <select value={selectedCity}
         onChange={(e)=>setSelectedcity(e.target.value)}
        >
          <option value="" disabled>Select City</option>
          {
            cities.map((city)=>(
              <option key={city} value={city}>
                {city}
              </option>
            ))
          }
        </select>
      </div>
      {
        selectedCity  &&(
          <h2>You selected {selectedCity},{selectedstate},{selectedcountries} </h2>
        )
      }
    </div>
  );
}

export default App;
