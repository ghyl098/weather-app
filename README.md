# Weather App

A weather app built with React and the OpenWeatherMap API. Search any city to see real-time conditions, a 5-day forecast, and hourly details — with dark mode, recent searches, and auto-detected location.

## Features

- 🔍 City search with Enter key support
- 📍 Auto-detects your location on load (with manual search fallback)
- 🌡️ Real-time temperature, conditions, humidity, and wind speed
- 🔁 Switch between °C and °F
- 🕐 5-day forecast — click any day to see an hourly breakdown
- 🌅 Sunrise/sunset times and "feels like" temperature
- 🎨 Background color changes based on current weather
- 🌙 Dark mode (remembers your choice)
- 📝 Recent searches, saved locally, with a clear-history option
- 📱 Responsive layout

## Tech stack

- **React** (Vite)
- **OpenWeatherMap API** — current weather + 5-day/3-hour forecast
- **localStorage** — recent searches and dark mode preference
- Plain CSS (no framework)

## Project structure

```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── RecentSearches.jsx
│   ├── WeatherCard.jsx
│   └── ForecastList.jsx
├── hooks/
│   └── useWeather.js       # all weather logic and state
├── App.jsx
├── App.css
└── main.jsx
```

## Running locally

1. Clone the repo:
   ```
   git clone https://github.com/ghyl098/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api), then create a `.env` file in the project root:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the dev server:
   ```
   npm run dev
   ```

5. Open `http://localhost:5173`

## Notes

- New OpenWeatherMap API keys can take 10–15 minutes to activate.
- `.env` is git-ignored — never commit your API key.