import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "../utils";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdOutlineUnarchive, MdDeleteOutline } from "react-icons/md";

function NoteDetail({
  title,
  createdAt,
  body,
  id,
  archived,
  onArchive,
  onDelete,
}) {
  const createdAtFromatted = showFormattedDate(createdAt);

  return (
    <>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{createdAtFromatted}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <div className="detail-page__action">
        <button
          className="action"
          type="button"
          title={archived ? "Aktifkan" : "Arsipkan"}
          onClick={() => onArchive(archived, id)}
        >
          {archived ? <MdOutlineUnarchive /> : <RiInboxArchiveLine />}
        </button>
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={() => onDelete(id)}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;
