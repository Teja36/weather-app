import React from "react";
import styles from "./style.module.css";

const WeatherCard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Newyork, US</h1>
      <p className={styles.p1}>Wednesday 1 April</p>
      <h2 className={styles.h2}>5&deg;</h2>
      <p className={styles.p}>Overcast clouds</p>
    </div>
  );
};

export default WeatherCard;
