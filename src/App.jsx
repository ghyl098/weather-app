import './App.css'
import useWeather from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import RecentSearches from './components/RecentSearches'
import WeatherCard from './components/WeatherCard'
import ForecastList from './components/ForecastList'

function App() {
  const {
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
  } = useWeather()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getWeather()
    }
  }

  const handleRecentClick = (cityName) => {
    setCity(cityName)
    getWeather(unit, cityName)
  }

return (
  <div className={`app-wrapper ${getBackgroundClass()} ${darkMode ? 'dark' : ''}`}>
    <div className="app">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <h1>Weather App</h1>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => getWeather()}
          onKeyDown={handleKeyDown}
          loading={loading}
        />

        <RecentSearches
          searches={recentSearches}
          onCityClick={handleRecentClick}
          onClear={clearHistory}
        />

        {error && <p className="error">{error}</p>}

        <WeatherCard weather={weather} unit={unit} onToggleUnit={toggleUnit} />
        <ForecastList forecast={forecast} unit={unit} />
      </div>
    </div>
  )
}

export default App