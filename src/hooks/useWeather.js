import { useState, useEffect } from 'react'

function useWeather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [unit, setUnit] = useState('metric')
  const [recentSearches, setRecentSearches] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved === 'true'
  })

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByCoords(position.coords.latitude, position.coords.longitude)
        },
        () => {
          console.log('Location permission denied')
        }
      )
    }
  }, [])

  const saveToRecent = (cityName) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== cityName.toLowerCase()
      )
      const updated = [cityName, ...filtered].slice(0, 5)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      return updated
    })
  }

  const clearHistory = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  // Sabai 3-ghanta ko entries lai din anusar group garne, hourly breakdown ko lagi
  const getForecast = async (searchCity, searchUnit = unit) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=${searchUnit}&appid=${API_KEY}`
      )
      if (!response.ok) return

      const data = await response.json()

      const grouped = {}
      data.list.forEach((item) => {
        const dateKey = item.dt_txt.split(' ')[0]
        if (!grouped[dateKey]) {
          grouped[dateKey] = []
        }
        grouped[dateKey].push(item)
      })

      const days = Object.keys(grouped).map((dateKey) => {
        const hours = grouped[dateKey]
        const noon = hours.find((h) => h.dt_txt.includes('12:00:00')) || hours[0]
        return {
          date: dateKey,
          summary: noon,
          hours: hours,
        }
      })

      setForecast(days.slice(0, 5))
    } catch (err) {
      console.log('Forecast fetch failed')
    }
  }

  const getWeather = async (searchUnit = unit, searchCity = city) => {
    setError('')
    setWeather(null)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${searchUnit}&appid=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error('City fela parena')
      }

      const data = await response.json()
      setWeather(data)
      saveToRecent(data.name)
      getForecast(searchCity, searchUnit)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherByCoords = async (lat, lon, searchUnit = unit) => {
    setError('')
    setWeather(null)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${searchUnit}&appid=${API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Weather data fela parena')
      }

      const data = await response.json()
      setWeather(data)
      setCity(data.name)
      saveToRecent(data.name)
      getForecast(data.name, searchUnit)
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

  const getBackgroundClass = () => {
    if (!weather) return 'bg-default'
    const condition = weather.weather[0].main
    if (condition === 'Clear') return 'bg-clear'
    if (condition === 'Clouds') return 'bg-clouds'
    if (condition === 'Rain' || condition === 'Drizzle') return 'bg-rain'
    if (condition === 'Thunderstorm') return 'bg-thunder'
    if (condition === 'Snow') return 'bg-snow'
    return 'bg-default'
  }

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev
      localStorage.setItem('darkMode', newValue)
      return newValue
    })
  }

  return {
    city,
    setCity,
    weather,
    forecast,
    error,
    loading,
    unit,
    recentSearches,
    darkMode,
    toggleDarkMode,
    getWeather,
    toggleUnit,
    clearHistory,
    getBackgroundClass,
  }
}

export default useWeather