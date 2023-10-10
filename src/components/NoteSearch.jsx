import React from "react";

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };

    this.onSearchChangeEventHandler =
      this.onSearchChangeEventHandler.bind(this);
  }

  onSearchChangeEventHandler(event) {
    const title = event.target.value;

    this.setState(() => {
      return {
        search: title,
      };
    });
    this.props.searchNote(title);
  }

  render() {
    return (
      <div className="note-search">
        <input
          type="text"
          placeholder="Cari catatan..."
          value={this.state.search}
          onChange={this.onSearchChangeEventHandler}
        />
      </div>
    );
  }
}

export default NoteSearch;
