import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    setLoading(true);
    try {
      setError("");

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }

      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Weather App
        </h1>

        <div className="flex gap-3">
          <input
  type="text"
  placeholder="Enter city..."
  value={city}
  onChange={(e) => setCity(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  }}
          />

          <button
            onClick={getWeather}
            className="bg-blue-500 hover:bg-blue-600 transition px-5 py-3 rounded-xl text-white font-semibold"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-center mt-5">
            {error}
          </p>
        )}

        {weather && (
          <div className="mt-8 text-center text-white">
            <h2 className="text-3xl font-bold">
              {weather.name}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />

            <h1 className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°C
            </h1>

            <p className="text-xl mt-2 capitalize">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-gray-300">Humidity</p>
                <h3 className="text-2xl font-bold">
                  {weather.main.humidity}%
                </h3>
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-gray-300">Wind Speed</p>
                <h3 className="text-2xl font-bold">
                  {weather.wind.speed} km/h
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;