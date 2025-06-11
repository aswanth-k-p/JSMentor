import {
    GET_TOPICS,
    GET_TOPIC,
    TOPIC_ERROR,
    CLEAR_TOPIC
  } from '../types';
  
  const topicReducer = (state, action) => {
    switch (action.type) {
      case GET_TOPICS:
        return {
          ...state,
          topics: action.payload,
          loading: false
        };
      case GET_TOPIC:
        return {
          ...state,
          currentTopic: action.payload,
          loading: false
        };
      case CLEAR_TOPIC:
        return {
          ...state,
          currentTopic: null
        };
      case TOPIC_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default topicReducer;