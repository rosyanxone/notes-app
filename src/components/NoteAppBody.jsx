import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

function NoteAppBody({
  addNote,
  searchNote,
  notes,
  formattedDate,
  onDelete,
  onArchive,
}) {
  return (
    <div className="note-app__body">
      <NoteInput addNote={addNote} searchNote={searchNote} />
      <NoteList
        notes={notes}
        formattedDate={formattedDate}
        onDelete={onDelete}
        onArchive={onArchive}
      />
    </div>
  );
}

export default NoteAppBody;
