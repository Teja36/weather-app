import styles from "./style.module.css";

const SearchBar = ({ cityName, setCityName, handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="city-name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className={styles.input}
      />
    </form>
  );
};

export default SearchBar;
