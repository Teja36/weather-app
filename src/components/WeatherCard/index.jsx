import React from "react";
import styles from "./style.module.css";

const WeatherCard = ({ details }) => {
  if (!details) return "loading";
  else
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>
          {details?.city},{" "}
          {details.country === "United States of America"
            ? "USA"
            : details.country}
        </h1>
        <p className={styles.p1}>{details.dateInWords}</p>
        <div className={styles.tempContainer}>
          <img
            className={styles.img}
            src={details.currentCondition.icon}
            alt="weather-icon"
          />
          <h2 className={styles.h2}>{details.currentTemp}&deg;c</h2>
          <p className={styles.p}>{details.currentCondition?.text}</p>
        </div>
      </div>
    );
};

export default WeatherCard;
