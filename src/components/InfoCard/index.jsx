import React from "react";
import styles from "./style.module.css";

const InfoCard = ({ details }) => {
  if (!details) return "loading...";
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <strong>{details.high}&deg;c</strong>High
        </li>
        <li>
          <strong>{details.wind} kph</strong>Wind
        </li>
        <li>
          <strong>{details.sunrise}</strong>Sunrise
        </li>
        <li>
          <strong>{details.low}&deg;c</strong>Low
        </li>
        <li>
          <strong>{details.rain}%</strong>Rain
        </li>
        <li>
          <strong>{details.sunset}</strong>Sunset
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;
