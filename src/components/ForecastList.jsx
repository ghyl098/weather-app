import { useState } from 'react'

function ForecastList({ forecast, unit }) {
  const [openDay, setOpenDay] = useState(null)

  if (forecast.length === 0) return null

  const getDayName = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const getHour = (dtTxt) => {
    const date = new Date(dtTxt)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
  }

  const handleDayClick = (date) => {
    setOpenDay(openDay === date ? null : date)
  }

  const openDayData = forecast.find((d) => d.date === openDay)

  return (
    <div className="forecast-section">
      <div className="forecast-list">
        {forecast.map((day) => (
          <button
            key={day.date}
            className={`forecast-day ${openDay === day.date ? 'active' : ''}`}
            onClick={() => handleDayClick(day.date)}
          >
            <p className="forecast-day-name">{getDayName(day.date)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.summary.weather[0].icon}.png`}
              alt={day.summary.weather[0].description}
            />
            <p className="forecast-temp">
              {Math.round(day.summary.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
          </button>
        ))}
      </div>

      {openDayData && (
        <div className="hourly-panel fade-in">
          <p className="hourly-title">
            {new Date(openDayData.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <div className="hourly-scroll">
            {openDayData.hours.map((h) => (
              <div key={h.dt} className="hourly-item">
                <span className="hourly-time">{getHour(h.dt_txt)}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
                  alt={h.weather[0].description}
                />
                <span className="hourly-temp">
                  {Math.round(h.main.temp)}°
                </span>
                <span className="hourly-desc">{h.weather[0].main}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ForecastList