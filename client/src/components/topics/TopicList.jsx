import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TopicContext from '../../context/topic/topicContext';
import ProgressContext from '../../context/progress/progressContext';
import Spinner from '../layout/Spinner';

const TopicList = () => {
  const topicContext = useContext(TopicContext);
  const progressContext = useContext(ProgressContext);

  const { topics, loading } = topicContext;
  const { progressItems } = progressContext;

  if (loading) {
    return <Spinner />;
  }

  // Get topic status from progress
  const getTopicStatus = topicId => {
    const progressItem = progressItems.find(item => item.topic._id === topicId);
    return progressItem ? progressItem.status : 'Yet to start';
  };

  // Group topics by category
  const groupedTopics = topics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {});

  return (
    <div className='topic-list'>
      <h2>JavaScript Learning Path</h2>
      
      {Object.keys(groupedTopics).map(category => (
        <div key={category} className='topic-category'>
          <h3>{category}</h3>
          <div className='topic-items'>
            {groupedTopics[category].map(topic => (
              <div 
                key={topic._id} 
                className={`topic-item ${getTopicStatus(topic._id).toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className='topic-title'>
                  <h4>{topic.title}</h4>
                  <span className={`status-badge status-${getTopicStatus(topic._id).toLowerCase().replace(/\s+/g, '-')}`}>
                    {getTopicStatus(topic._id)}
                  </span>
                </div>
                <p>{topic.description}</p>
                <Link to={`/topics/${topic._id}`} className='btn btn-sm'>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicList;