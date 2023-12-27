import React, { useContext } from "react";
import { MdGTranslate } from "react-icons/md";
import LocaleContext from "../contexts/LocaleContext";

function ToggleLocale() {
  const { toggleLocale } = useContext(LocaleContext);

  return (
    <button className="toggle-locale" type="button" onClick={toggleLocale}>
      <MdGTranslate />
    </button>
  );
}

export default ToggleLocale;
