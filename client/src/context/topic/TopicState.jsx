import React, { useReducer } from 'react';
import axios from 'axios';
import TopicContext from './topicContext';
import topicReducer from './topicReducer';


import {
  GET_TOPICS,
  GET_TOPIC,
  TOPIC_ERROR,
  CLEAR_TOPIC
} from '../types';

const TopicState = props => {
  const initialState = {
    topics: [],
    currentTopic: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(topicReducer, initialState);

  // Get Topics
  const getTopics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/topics`);

      dispatch({
        type: GET_TOPICS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TOPIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get Topic
  const getTopic = async id => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/topics/${id}`);

      dispatch({
        type: GET_TOPIC,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TOPIC_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear current topic
  const clearTopic = () => {
    dispatch({ type: CLEAR_TOPIC });
  };

  return (
    <TopicContext.Provider
      value={{
        topics: state.topics,
        currentTopic: state.currentTopic,
        loading: state.loading,
        error: state.error,
        getTopics,
        getTopic,
        clearTopic
      }}
    >
      {props.children}
    </TopicContext.Provider>
  );
};

export default TopicState;