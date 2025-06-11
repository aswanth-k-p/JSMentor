import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import NoteContext from '../../context/note/noteContext';

const NoteForm = ({ topicId }) => {
  const noteContext = useContext(NoteContext);

  const { addNote, updateNote, currentNote, clearCurrentNote } = noteContext;

  const [note, setNote] = useState({
    content: ''
  });

  useEffect(() => {
    if (currentNote !== null) {
      setNote(currentNote);
    } else {
      setNote({
        content: ''
      });
    }
  }, [noteContext, currentNote]);

  const { content } = note;

  const onChange = e => setNote({ ...note, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (currentNote === null) {
      addNote({
        topic: topicId,
        content
      });
    } else {
      updateNote({
        _id: currentNote._id,
        content
      });
      clearCurrentNote();
    }
    setNote({
      content: ''
    });
  };

  const clearAll = () => {
    clearCurrentNote();
  };

  return (
    <form onSubmit={onSubmit} className="note-form">
      <h3>{currentNote ? 'Edit Note' : 'Add Note'}</h3>
      <div className="form-group">
        <textarea
          name="content"
          placeholder="Your notes here..."
          value={content}
          onChange={onChange}
          rows="4"
          required
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {currentNote ? 'Update Note' : 'Add Note'}
        </button>
        {currentNote && (
          <button
            type="button"
            className="btn btn-light"
            onClick={clearAll}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

NoteForm.propTypes = {
  topicId: PropTypes.string.isRequired
};

export default NoteForm;