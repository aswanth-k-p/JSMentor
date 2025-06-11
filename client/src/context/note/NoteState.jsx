import React, { useReducer } from 'react';
import axios from 'axios';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';

import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SET_CURRENT_NOTE,
  CLEAR_CURRENT_NOTE,
  NOTE_ERROR
} from '../types';

const NoteState = props => {
  const initialState = {
    notes: [],
    currentNote: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  // Get Notes by Topic
  const getNotesByTopic = async topicId => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes/topic/${topicId}`);

      dispatch({
        type: GET_NOTES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Note
  const addNote = async noteData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes`, noteData, config);

      dispatch({
        type: ADD_NOTE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Note
  const updateNote = async note => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${note._id}`, note, config);

      dispatch({
        type: UPDATE_NOTE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Note
  const deleteNote = async id => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`);

      dispatch({
        type: DELETE_NOTE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: NOTE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Note
  const setCurrentNote = note => {
    dispatch({
      type: SET_CURRENT_NOTE,
      payload: note
    });
  };

  // Clear Current Note
  const clearCurrentNote = () => {
    dispatch({ type: CLEAR_CURRENT_NOTE });
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        currentNote: state.currentNote,
        loading: state.loading,
        error: state.error,
        getNotesByTopic,
        addNote,
        updateNote,
        deleteNote,
        setCurrentNote,
        clearCurrentNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;