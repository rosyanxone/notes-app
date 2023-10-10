import React from "react";
import { getInitialData, showFormattedDate } from "../utils";
import NoteAppHeader from "./NoteAppHeader";
import NoteAppBody from "./NoteAppBody";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      notesOrigin: getInitialData(),
    };

    this.formattedDate = showFormattedDate.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
  }

  onDeleteHandler(id) {
    const { notes, notesOrigin } = this.state;

    const updatedNotes = notes.filter((note) => note.id !== id);
    const updatedNotesOrigin = notesOrigin.filter((note) => note.id !== id);

    this.setState({
      notes: updatedNotes,
      notesOrigin: updatedNotesOrigin,
    });
  }

  onArchiveHandler(id) {
    const { notes, notesOrigin } = this.state;

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    const updatedNotesOrigin = notesOrigin.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );

    this.setState({
      notes: updatedNotes,
      notesOrigin: updatedNotesOrigin,
    });
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: this.state.notesOrigin.length + 1,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, newNote],
        notesOrigin: [...prevState.notesOrigin, newNote],
      };
    });
  }

  onSearchNoteHandler(searchInput) {
    const filteredNotes = this.state.notesOrigin.filter((note) =>
      note.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    this.setState({
      notes: filteredNotes,
    });
  }

  render() {
    return (
      <>
        <NoteAppHeader searchNote={this.onSearchNoteHandler} />
        <NoteAppBody
          addNote={this.onAddNoteHandler}
          searchNote={this.onSearchNoteHandler}
          notes={this.state.notes}
          formattedDate={this.formattedDate}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
      </>
    );
  }
}

export default NoteApp;
