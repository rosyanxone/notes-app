import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

function NoteAppBody({ addNote, notes, onDelete, onArchive }) {
  return (
    <div className="note-app__body">
      <NoteInput addNote={addNote} />
      <NoteList notes={notes} onDelete={onDelete} onArchive={onArchive} />
    </div>
  );
}

export default NoteAppBody;
