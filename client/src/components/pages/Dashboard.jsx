import React, { useContext, useEffect } from 'react';
import TopicList from '../topics/TopicList';
import ProgressSummary from '../progress/ProgressSummary';
import AuthContext from '../../context/auth/authContext';
import TopicContext from '../../context/topic/topicContext';
import ProgressContext from '../../context/progress/progressContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const topicContext = useContext(TopicContext);
  const progressContext = useContext(ProgressContext);

  const { loadUser } = authContext;
  const { getTopics } = topicContext;
  const { getProgress } = progressContext;

  useEffect(() => {
    loadUser();
    getTopics();
    getProgress();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='dashboard-container'>
      <h1>Your JavaScript Learning Dashboard</h1>
      <div className='dashboard-content'>
        <div className='dashboard-summary'>
          <ProgressSummary />
        </div>
        <div className='dashboard-topics'>
          <TopicList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;