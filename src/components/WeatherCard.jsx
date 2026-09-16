function WeatherCard({ weather, unit, onToggleUnit }) {
  if (!weather) return null

  // Unix timestamp (seconds) lai readable time (HH:MM) ma convert garne
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <button className="unit-toggle" onClick={onToggleUnit}>
        Show in {unit === 'metric' ? '°F' : '°C'}
      </button>

      <div className="weather-card fade-in">
        <h2>{weather.name}</h2>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p className="temp">
          {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </p>
        <p className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
        </p>
        <p className="desc">{weather.weather[0].description}</p>
        <div className="details">
          <span>Humidity: {weather.main.humidity}%</span>
          <span>Wind: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
        </div>
        <div className="sun-times">
          <span>☀️ Sunrise: {formatTime(weather.sys.sunrise)}</span>
          <span>🌙 Sunset: {formatTime(weather.sys.sunset)}</span>
        </div>
      </div>
    </>
  )
}

export default WeatherCard