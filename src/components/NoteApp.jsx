import React from "react";
import autoBind from "react-autobind";
import { getInitialData } from "../utils";
import NoteAppHeader from "./NoteAppHeader";
import NoteAppBody from "./NoteAppBody";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      noteDatas: getInitialData(),
      search: "",
    };

    autoBind(this);
  }

  onDeleteHandler(id) {
    const { notes, noteDatas } = this.state;

    const updatedNotes = notes.filter((note) => note.id !== id);
    const updatedNoteDatas = noteDatas.filter((note) => note.id !== id);

    this.setState({
      notes: updatedNotes,
      noteDatas: updatedNoteDatas,
    });
  }

  onArchiveHandler(id) {
    const { notes, noteDatas } = this.state;

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    const updatedNoteDatas = noteDatas.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );

    this.setState({
      notes: updatedNotes,
      noteDatas: updatedNoteDatas,
    });
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: this.state.noteDatas.length + 1,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => {
      return {
        notes: [...prevState.notes, newNote],
        noteDatas: [...prevState.noteDatas, newNote],
      };
    });
  }

  onSearchChangeEventHandler(event) {
    this.setState({
      search: event.target.value,
    });
  }

  onChangeNoteHandler() {
    const filteredNotes = this.state.noteDatas.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return filteredNotes;
  }

  render() {
    return (
      <>
        <NoteAppHeader
          onSearch={this.onSearchChangeEventHandler}
          inputSearch={this.state.search}
        />
        <NoteAppBody
          addNote={this.onAddNoteHandler}
          notes={this.onChangeNoteHandler()}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />
      </>
    );
  }
}

export default NoteApp;
