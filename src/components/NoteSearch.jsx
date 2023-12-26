import React from "react";

function NoteSearch({ onSearch, inputSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari catatan ..."
      onChange={onSearch}
      value={inputSearch}
    />
  );
}

export default NoteSearch;
