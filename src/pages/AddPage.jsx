import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import { IoMdCheckmark } from "react-icons/io";

function AddPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [limit, setLimit] = useState(50);

  const titleChangeHandler = (event) => {
    const newTitle = event.target.value;

    if (newTitle.length <= limit) {
      setTitle(newTitle);
    }
  };

  const bodyChangeHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const navigate = useNavigate();

  async function addNoteHandler() {
    const { error } = await addNote({ title, body });

    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <p>Sisa karakter: {limit - title.length}</p>
        <input
          className="add-new-page__input__title"
          placeholder="Catatan rahasia"
          value={title}
          onChange={titleChangeHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ...."
          contentEditable="true"
          onInput={bodyChangeHandler}
        ></div>
      </div>
      <div className="add-new-page__action">
        <button
          className="action"
          type="button"
          title="Simpan"
          onClick={addNoteHandler}
        >
          <IoMdCheckmark />
        </button>
      </div>
    </section>
  );
}

export default AddPage;
