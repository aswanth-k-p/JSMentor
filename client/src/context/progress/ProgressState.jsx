import React, { useReducer } from 'react';
import axios from 'axios';
import ProgressContext from './progressContext';
import progressReducer from './progressReducer';


import {
  GET_PROGRESS,
  UPDATE_PROGRESS,
  PROGRESS_ERROR
} from '../types';

const ProgressState = props => {
  const initialState = {
    progressItems: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Get Progress
  const getProgress = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/progress`);

      dispatch({
        type: GET_PROGRESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROGRESS_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Progress
  const updateProgress = async progressData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/progress`, progressData, config);

      dispatch({
        type: UPDATE_PROGRESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROGRESS_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        progressItems: state.progressItems,
        loading: state.loading,
        error: state.error,
        getProgress,
        updateProgress
      }}
    >
      {props.children}
    </ProgressContext.Provider>
  );
};

export default ProgressState;