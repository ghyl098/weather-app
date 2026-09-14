import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [unit, setUnit] = useState('metric') // metric = C, imperial = F

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const getWeather = async (searchUnit = unit) => {
    setError('')
    setWeather(null)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${searchUnit}&appid=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error('City fela parena')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

const toggleUnit = () => {
  const newUnit = unit === 'metric' ? 'imperial' : 'metric'
  setUnit(newUnit)
  if (weather) {
    getWeather(newUnit)
  }
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    getWeather()
  }
}

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter city" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => getWeather()} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {weather && (
        <button className="unit-toggle" onClick={toggleUnit}>
          Show in {unit === 'metric' ? '°F' : '°C'}
        </button>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temp">
            {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="details">
            <span>Humidity: {weather.main.humidity}%</span>
            <span>Wind: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App