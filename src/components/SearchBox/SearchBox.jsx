// SearchBox.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter({ term: e.target.value }));
  };

  return (
    <input
      className={styles.searchBox}
      type="text"
      onChange={handleChange}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
