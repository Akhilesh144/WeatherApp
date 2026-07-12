import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const inputRef = useRef("");

  async function fetchWeather(city) {
    if (city.trim() === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const respone = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"80b73ef1c5c976ca90ae0ed4f142594f"}`,
      );
      let data = await respone.json();
      if (data.cod === "404") {
        alert("City not found");
        setWeather(null);
        return;
      }
      console.log(data);
      
      setWeather(data);
    } catch (error) {
      alert("Error in fetching City");
      setWeather(null);
    }
  }
  useEffect(() => {
    fetchWeather("London");
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <input type="text" placeholder="Enter City Name" ref={inputRef} />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => {
              fetchWeather(inputRef.current.value);
              inputRef.current.value = "";
            }}
          ></i>
        </div>
        {weather && (
          <>
            <div className="data">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <div>{weather.weather[0].description}</div>

              <h1>{weather.name}</h1>
              <span>
                {weather.main.temp}
                <sup>o</sup> C
              </span>
            </div>
            <div className="footer">
              <div className="left">
                <i className="fa-solid fa-water"></i>
                <p>{weather.main.humidity} %</p>
                <span>Humidity</span>
              </div>
              <div className="right">
                <i className="fa-solid fa-wind"></i>
                <p>{weather.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
