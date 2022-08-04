import React from "react";
import styles from "./style.module.css";

const ForecastCard = ({ details }) => {
  if (!details) return "loading...";
  return (
    <div className={styles.container}>
      <h4 className={styles.h4}>Forecast</h4>
      <div className={styles.forecastContainer}>
        {details.map((card) => {
          return (
            <div className={styles.forecastItem} key={card.time}>
              {/* <p>{card.date}</p> */}
              <p>{card.time}</p>
              <img src={card.icon} alt="weather-img" />
              <p>{card.temp}&deg;c</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
