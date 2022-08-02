import { useState } from "react";
import styles from "./App.module.css";
import { SearchBar, WeatherCard, InfoCard, ForecastCard } from "./components";

function App() {
  const [cityName, setCityName] = useState("newyork");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.container}>
      <p className={styles.p}>Weather App</p>
      <div className={styles.searchBar}>
        <SearchBar
          cityName={cityName}
          handleSubmit={handleSubmit}
          setCityName={setCityName}
        />
      </div>
      <div className={styles.weatherContainer}>
        <WeatherCard />
        <InfoCard />
      </div>

      <ForecastCard />
    </div>
  );
}

export default App;
