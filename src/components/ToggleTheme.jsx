import React, { useContext } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import ThemeContext from "../contexts/ThemeContext";

function ToggleTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="toggle-theme" type="button" onClick={toggleTheme}>
      {theme === "dark" ? <FiSun /> : <MdOutlineDarkMode />}
    </button>
  );
}

export default ToggleTheme;
