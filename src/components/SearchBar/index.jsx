import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";
import styles from "./style.module.css";

const SearchBar = ({ handleSubmit }) => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);
  const divRef = useRef("null");

  useEffect(() => {
    if (!debouncedText) {
      destroyList();
      return;
    }

    const getSuggestions = async () => {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=28d9969fec674aa8b18195045220308&q=${debouncedText}`
        );
        const data = await res.json();
        const values = data.map((val) => val.name);
        constructList(values);
      } catch (err) {
        console.error(err);
      }
    };

    getSuggestions();
  }, [debouncedText]);

  const constructList = (values) => {
    destroyList();

    if (!values || values.length <= 0) return;

    const ul = document.createElement("ul");

    for (let i = 0; i < values.length; i++) {
      const li = document.createElement("li");
      li.textContent = values[i];
      li.addEventListener("click", () => handleSelect(values[i]));
      ul.appendChild(li);
    }

    divRef.current.appendChild(ul);
  };

  const destroyList = () => {
    if (divRef.current.children[0])
      divRef.current.removeChild(divRef.current.children[0]);
  };

  const handleSelect = (value) => {
    setText(value);
    handleBlur();
  };

  const handleFocus = () => {
    divRef.current.classList.add(styles.visible);
  };

  const handleBlur = () => {
    divRef.current.classList.remove(styles.visible);
    destroyList();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleBlur();
    text && handleSubmit(text);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className={styles.form}>
      <input
        type="text"
        name="city-name"
        value={text}
        placeholder="Enter city name..."
        onChange={(e) => setText(e.target.value)}
        onFocus={handleFocus}
        onBlur={() => setTimeout(handleBlur, 200)}
        className={styles.input}
      />
      <div className={styles.autoComplete} ref={divRef}></div>
      <button onClick={(e) => handleFormSubmit(e)} className={styles.button}>
        <i className="fa fa-search fa-2x" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchBar;
