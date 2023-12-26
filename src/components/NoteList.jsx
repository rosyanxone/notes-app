import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchive }) {
  const renderNotes = (filteredNotes) => {
    if (filteredNotes.length === 0) {
      return <p className="notes-list__empty-message">Tidak ada catatan</p>;
    }

    return (
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            {...note}
            onDelete={onDelete}
            onArchive={onArchive}
          />
        ))}
      </div>
    );
  };

  const notesUnarchive = notes.filter((note) => !note.archived);
  const notesArchived = notes.filter((note) => note.archived);

  return (
    <>
      <h2>Catatan Aktif</h2>
      {renderNotes(notesUnarchive)}
      <h2>Arsip</h2>
      {renderNotes(notesArchived)}
    </>
  );
}

export default NoteList;
