import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WatherApi = () => {

    const color = ["#B3CFDD"]
    const [ climate, setClimate ] = useState({});
    const [ temp, setTemp ] = useState(0)
    console.log(climate);
    const success = position => {   
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=adc32b7dca3ab0c562154e8cbded87a3`) 
            .then(res => {
                setClimate(res.data) 
                setTemp(res.data?.main.temp)
            })
    } 
    const [Celcius, setCelcius] = useState(true);
    const [Fahrenheit, setFahrenheit] = useState(false);

    const soCelcius = () =>{
      setCelcius(!Celcius);
      setFahrenheit(false);
    }

    const soFahrenheit = () =>{
      setFahrenheit(!Fahrenheit);
      setCelcius(false);
    }

    const Units = (temp) => {
        temp = parseInt(temp);
        if (Celcius === false && Fahrenheit === false) {
          return temp.toFixed();
        } else if (Celcius) {
          temp = (temp - 273.15);
          return temp.toFixed();
        } else if (Fahrenheit) {
          temp = ((temp - 273.15) * (9 / 5) + 32);
          return temp.toFixed();
        }
      };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    },[])
    
    document.body.style = `background: ${color}`

    console.log(climate)

    return (
        <div className='card'>
            <p> <b>Weather App</b> </p>
            <p><i className='fa-solid fa-earth-americas'></i> {climate.name}, {climate.sys?.country}</p>
            <img src={ `http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`} alt="" />
            <b> <p  className='Temp'>{Units(temp)}°</p> </b>
            <button className='button' onClick={soCelcius}> <b> {Celcius ? `°C` : `°C`} </b></button>
            <button className='button' onClick={soFahrenheit}> <b>{Fahrenheit ? `°F`: `°F`}</b>  </button>
            <p> <b>'{climate.weather?.[0].description}'</b> </p>
            <p> <i className='fa-solid fa-wind'></i> <b>Wind speed:</b> {climate.wind?.speed}</p>
            <p> <i className='fa-solid fa-cloud'></i> <b>Clouds:</b> {climate.clouds?.all}%</p>
            <p> <i className='fa-solid fa-droplet'></i> <b>Humidity:</b> {climate.main?.humidity}</p>
        </div>
    );
};

export default WatherApi;