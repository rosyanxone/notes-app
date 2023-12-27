import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import NotFoundPage from "./NotFoundPage";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";

function DetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  async function onArchiveHandler(archived, id) {
    archived ? await unarchiveNote(id) : await archiveNote(id);
    navigate("/");
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    navigate("/");
  }

  if (loading) {
    return null;
  }

  return note === null ? (
    <NotFoundPage />
  ) : (
    <section className="detail-page">
      <NoteDetail
        {...note}
        onArchive={onArchiveHandler}
        onDelete={onDeleteHandler}
      />
    </section>
  );
}

export default DetailPage;
