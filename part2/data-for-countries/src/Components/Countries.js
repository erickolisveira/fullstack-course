import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://api.weatherstack.com/current?access_key=535b1bc971132e0ffe2f0f5930a12d67&query='

const Country = ({ country }) => 
   country.name.concat("  ");

const BtnShowHide = ({isPressed, handleClick}) => 
   <button onClick={handleClick}>{isPressed ? 'hide' : 'show'}</button>

const ShowCountry = ({country}) => {
   const [isPressed, setIsPressed] = useState(false);
   return (
      <div>
         {
            isPressed 
            ? <CountryInfo country={country} /> 
            : <Country country={country} />
         }
         <BtnShowHide isPressed={isPressed} handleClick={() => setIsPressed(!isPressed)} />
      </div>
   );
}

const Languages = ({languages}) => 
   languages.map(language => <li key={language.name}>{language.name}</li>)

const Weather = ({capital, weather}) => {
   return (
      <div>
         <h2>Weather in {capital}</h2>
         <b>Temperature: </b> {weather.temperature} °C <br/>
         <img src={weather.weather_icons} alt="weather icon"/> <br/>
         {weather.weather_descriptions} <br />
         <b>Wind: </b> {weather.wind_speed} kph direction {weather.wind_dir}
      </div>
   );
}

const CountryInfo = ({ country }) => {
   const [weather, setWeather] = useState({
      current: {},
   });

   useEffect(() => {
      async function loadWeather() {
         const result = await axios.get(API + country.name);
         setWeather({current: result.data.current});
      }
      loadWeather();
   }, [country]);

   return (
      <div>
         <h2>{country.name}</h2>
         <div>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
         </div>
         <h3>Languages</h3>
         <ul> 
            <Languages languages={country.languages}/>
         </ul>
         <img src={country.flag}
            alt="Country flag"
            width="200" height="150" />
         <Weather capital={country.capital} weather={weather.current} />
      </div>
   );
}

const Countries = ({ countries }) => {
   let render;
   if (countries.length > 10) {
      render = <p>Too many countries, be more specific.</p>;
   } else if (countries.length > 1) {
      render = countries.map(country =>
         <ShowCountry key={country.name} country={country} />);
   } else if (countries.length === 1) {
      render = countries.map(country => 
         <CountryInfo key={country.name} country={country} />);
   }
   return (
      <div>
         {render}
      </div>
   );
};

export default Countries;