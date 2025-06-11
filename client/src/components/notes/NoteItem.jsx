import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteContext from '../../context/note/noteContext';

const NoteItem = ({ note }) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote, setCurrentNote, clearCurrentNote } = noteContext;

  const { _id, content, createdAt } = note;

  const onEdit = () => {
    setCurrentNote(note);
  };

  const onDelete = () => {
    deleteNote(_id);
    clearCurrentNote();
  };

  // Format date
  const formatDate = date => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="note-item">
      <div className="note-content">
        <p>{content}</p>
        <div className="note-meta">
          <small>Created: {formatDate(createdAt)}</small>
        </div>
      </div>
      <div className="note-actions">
        <button className="btn btn-sm btn-light" onClick={onEdit}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteItem;
