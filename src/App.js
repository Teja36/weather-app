import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { SearchBar, WeatherCard, InfoCard, ForecastCard } from "./components";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherDetails, setWeatherDetails] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCityName(`${position.coords.latitude},${position.coords.longitude}`);
      },
      (err) => {
        console.log(err);
        setError(true);
      }
    );
  }, []);

  useEffect(() => {
    if (!cityName) return;

    const getWeatherForecast = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=28d9969fec674aa8b18195045220308&q=${cityName}&days=1&aqi=no&alerts=no`
        );

        const data = await res.json();

        const currentWeather = {
          city: data.location.name,
          country: data.location.country,
          currentTemp: data.current.temp_c,
          currentCondition: data.current.condition,
          dateInWords: generateDateInWords(data.forecast.forecastday[0].date),
        };

        const info = {
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c,
          wind: data.forecast.forecastday[0].day.maxwind_kph,
          rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
          sunrise: data.forecast.forecastday[0].astro.sunrise,
          sunset: data.forecast.forecastday[0].astro.sunset,
        };

        const forecastInfo = data.forecast.forecastday[0].hour.map((obj) => {
          const datetime = obj.time.split(" ");
          return {
            date: datetime[0],
            time: datetime[1],
            temp: obj.temp_c,
            icon: obj.condition.icon,
          };
        });

        setWeatherDetails({
          weatherCard: currentWeather,
          infoCard: info,
          forecastCard: forecastInfo,
        });
      } catch (err) {
        console.error(err);
      }
    };

    getWeatherForecast();
  }, [cityName]);

  const handleSubmit = (text) => {
    setCityName(text);
  };

  const generateDateInWords = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = date.split("-");

    const dateObj = new Date(+year, month - 1, +day);

    return `${days[dateObj.getDay()]} ${day} ${
      months[dateObj.getMonth()]
    }, ${year}`;
  };
  return (
    <div className={styles.container}>
      <p className={styles.p}>Weather App</p>
      <div className={styles.searchBar}>
        <SearchBar handleSubmit={handleSubmit} />
      </div>
      {error && !cityName ? (
        <div className={styles.errorMessage}>
          <h2>Please enable location access.</h2>
        </div>
      ) : (
        <>
          <div className={styles.weatherContainer}>
            <WeatherCard details={weatherDetails.weatherCard} />
            <InfoCard details={weatherDetails.infoCard} />
          </div>

          <ForecastCard details={weatherDetails.forecastCard} />
        </>
      )}
    </div>
  );
}

export default App;
