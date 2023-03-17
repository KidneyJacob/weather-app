import axios from "axios"
import { useState } from "react"
import "./Weather.css"
import { GoSearch } from "react-icons/go";




function Weather() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState("")

     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5e0ffc7f7ce653942c0132ccefda0590`

        const formSubmit = (event) => {
            event.preventDefault()
            if (location){
                axios.get(url).then((response) => {
                    setData(response.data)
                    console.log(response.data);
                })
            console.log("odesláno");
        }
    }

     const searchLocation = (event) => {
        if (event.key === "Enter"){
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data);
        })
        setLocation("")
        }
     }

  return (
    <div className="container">
        <div className="search" onSubmit={formSubmit}>
            <input
             placeholder="Location"
             value={location}
             onChange={event => setLocation(event.target.value)}
             onKeyPress={searchLocation}
            type="text" />
            <GoSearch type="submit" onClick={formSubmit} className="ico"/>
        </div>
    <div className="top">
        <div className="location">
            <p>{data.name}</p>
        </div>
        <div className="values">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="cloudy">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        
    </div>
    <div className="bottom">
        <div className="feels">
            <p>Feels like</p>
            {data.main ?<p className="values">{data.main.feels_like.toFixed()}°C</p> : null}
        </div>
        <div className="humidity">
            <p>Hummidity</p>
            {data.main ? <p className="values">{data.main.humidity}%</p> : null}
        </div>
        <div className="wind">
            <p>Wind</p>
            {data.wind ? <p className="values">{data.wind.speed.toFixed()}Km/h</p> : null}
        </div>
    </div>
    </div>
  )
}

export default Weather