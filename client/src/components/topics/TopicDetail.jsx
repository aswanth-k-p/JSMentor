import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicContext from '../../context/topic/topicContext';
import ProgressContext from '../../context/progress/progressContext';
import NoteContext from '../../context/note/noteContext';
import Spinner from '../layout/Spinner';
import NoteItem from '../notes/NoteItem';
import NoteForm from '../notes/NoteForm';

const TopicDetail = () => {
  const topicContext = useContext(TopicContext);
  const progressContext = useContext(ProgressContext);
  const noteContext = useContext(NoteContext);

  const { getTopic, currentTopic, loading } = topicContext;
  const { progressItems, updateProgress } = progressContext;
  const { notes, getNotesByTopic } = noteContext;

  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Yet to start');

  useEffect(() => {
    getTopic(id);
    getNotesByTopic(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (progressItems.length > 0) {
      const topicProgress = progressItems.find(
        item => item.topic._id === id
      );
      if (topicProgress) {
        setStatus(topicProgress.status);
      }
    }
  }, [progressItems, id]);

  const handleStatusChange = e => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    updateProgress({
      topic: id,
      status: newStatus
    });
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  if (loading || !currentTopic) {
    return <Spinner />;
  }

  return (
    <div className="topic-detail">
      <button className="btn btn-light" onClick={goBack}>
        Back to Dashboard
      </button>

      <div className="topic-header">
        <h1>{currentTopic.title}</h1>
        <div className="status-selector">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            value={status}
            onChange={handleStatusChange}
            className={`status-${status.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <option value="Yet to start">Yet to start</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="topic-content">
        <div className="topic-info">
          <h2>About this topic</h2>
          <p className="topic-description">{currentTopic.description}</p>

          <h3>What you'll learn</h3>
          <ul className="learning-points">
            {currentTopic.learningPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {currentTopic.resources && currentTopic.resources.length > 0 && (
            <>
              <h3>Recommended Resources</h3>
              <ul className="resources-list">
                {currentTopic.resources.map((resource, index) => (
                  <li key={index} className={`resource-${resource.type}`}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.name}
                    </a>
                    <span className="resource-type">{resource.type}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="topic-notes">
          <h2>Your Notes</h2>
          <NoteForm topicId={id} />

          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map(note => <NoteItem key={note._id} note={note} />)
            ) : (
              <p>No notes yet. Add your first note above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;