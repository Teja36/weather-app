import React from "react";
import styles from "./style.module.css";

const InfoCard = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <strong>6&deg;</strong>High
        </li>
        <li>
          <strong>3.1mph</strong>Wind
        </li>
        <li>
          <strong>6:40</strong>Sunrise
        </li>
        <li>
          <strong>3&deg;</strong>Low
        </li>
        <li>
          <strong>70%</strong>Rain
        </li>
        <li>
          <strong>7:19</strong>Sunset
        </li>
      </ul>
    </div>
  );
};

export default InfoCard;
