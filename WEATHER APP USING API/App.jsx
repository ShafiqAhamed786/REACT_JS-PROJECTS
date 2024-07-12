import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';

import SearchIcon from './assets/search.png';
import ClearIcon from './assets/clear.png';
import CloudIcon from './assets/cloud.png';
import DizzleIcon from './assets/drizzle.png';
import RainIcon from './assets/rain.png';
import Windicon from './assets/wind.png';
import SnowIcon from './assets/snow.png';
import humidityIcon from './assets/humidity.png';


const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className='temp'>{temp}&deg;C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>

      <div className='data-container'>
        <div className='elemnt'>
          <img src={humidityIcon} alt="Humidity Icon" className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='elemnt'>
          <img src={Windicon} alt="Wind Icon" className='icon' />
          <div className='data'>
            <div className='wind-percent'>{wind} Km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
};

function App() {
  const api_key = "d09f5ffb548e881ca236d853bb0f5af4";
  const [text, setText] = useState("London");
  const [icon, setIcon] = useState(SnowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": DizzleIcon,
    "03n": DizzleIcon,
    "04d": RainIcon,
    "04n": RainIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);

      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country); // Fixed typo: data.sys.Country -> data.sys.country
      setLat(data.coord.lat);
      setLog(data.coord.lon); // Fixed typo: data.coord.log -> data.coord.lon
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || ClearIcon);
      setCityNotFound(false);

    } catch (error) {
      console.error("An Error Occurred", error.message);
      setError("An Error Occurred While Fetching Weather Data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div className='container'>
      <div className="input-container">
        <input
          type="text"
          className='cityInput'
          placeholder='Search City'
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className='Search-Icon' onClick={search}>
          <img src={SearchIcon} alt="Search" className='search' />
        </div>
      </div>

      {loading && <div className='loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound && <div className='city-not-found'>City Not Found</div>}

      {!loading && !cityNotFound && (
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      )}

      <p className='copyright'>Designed By <span>SHAFIQ AHAMED</span></p>
    </div>
  );
}

export default App;
