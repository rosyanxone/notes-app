import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NoteList({ notes }) {
  const { locale } = useContext(LocaleContext);

  if (!notes.length) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty">
          {locale === "id" ? "Tidak ada catatan" : "No notes"}
        </p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
