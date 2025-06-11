import React, { useContext } from 'react';
import TopicContext from '../../context/topic/topicContext';
import ProgressContext from '../../context/progress/progressContext';
import Spinner from '../layout/Spinner';

const ProgressSummary = () => {
  const topicContext = useContext(TopicContext);
  const progressContext = useContext(ProgressContext);

  const { topics, loading: topicsLoading } = topicContext;
  const { progressItems, loading: progressLoading } = progressContext;

  if (topicsLoading || progressLoading) {
    return <Spinner />;
  }

  // Count topics by status
  const topicCounts = {
    'Yet to start': 0,
    'Ongoing': 0,
    'Completed': 0
  };

  // Create a map of progress by topic id
  const progressMap = progressItems.reduce((acc, progress) => {
    acc[progress.topic._id] = progress.status;
    return acc;
  }, {});

  // Count topics by status
  topics.forEach(topic => {
    const status = progressMap[topic._id] || 'Yet to start';
    topicCounts[status]++;
  });

  // Calculate overall progress percentage
  const totalTopics = topics.length;
  const completedTopics = topicCounts['Completed'];
  const ongoingTopics = topicCounts['Ongoing'];
  const progressPercentage = Math.round(
    ((completedTopics + ongoingTopics * 0.5) / totalTopics) * 100
  );

  return (
    <div className="progress-summary">
      <h2>Your Progress</h2>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        >
          {progressPercentage}%
        </div>
      </div>
      
      <div className="progress-stats">
        <div className="stat-item completed">
          <span className="stat-count">{topicCounts['Completed']}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item ongoing">
          <span className="stat-count">{topicCounts['Ongoing']}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-item yet-to-start">
          <span className="stat-count">{topicCounts['Yet to start']}</span>
          <span className="stat-label">Not Started</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;