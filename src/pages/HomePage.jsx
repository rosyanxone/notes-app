import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/network-data";
import { LuPlus } from "react-icons/lu";
import LocaleContext from "../contexts/LocaleContext";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  const navigate = useNavigate();

  function handleActionClick() {
    navigate("/notes/new");
  }

  const { locale } = useContext(LocaleContext);

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <p>{locale === "id" ? "Memuat catatan ..." : "Fetching notes ..."}</p>
      ) : (
        <NoteList notes={filteredNotes} />
      )}
      <div className="homepage__action">
        <button
          className="action"
          type="button"
          title="Tambah"
          onClick={handleActionClick}
        >
          <LuPlus />
        </button>
      </div>
    </section>
  );
}

export default HomePage;
