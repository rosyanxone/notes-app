import React from "react";
import NoteSearch from "./NoteSearch";

function NoteAppHeader({ onSearch, inputSearch }) {
  return (
    <div className="note-app__header">
      <h1>Notes</h1>
      <div className="note-search">
        <NoteSearch onSearch={onSearch} inputSearch={inputSearch} />
      </div>
    </div>
  );
}

export default NoteAppHeader;
