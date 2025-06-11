import {
    GET_NOTES,
    ADD_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE,
    SET_CURRENT_NOTE,
    CLEAR_CURRENT_NOTE,
    NOTE_ERROR
  } from '../types';
  
  const noteReducer = (state, action) => {
    switch (action.type) {
      case GET_NOTES:
        return {
          ...state,
          notes: action.payload,
          loading: false
        };
      case ADD_NOTE:
        return {
          ...state,
          notes: [action.payload, ...state.notes],
          loading: false
        };
      case UPDATE_NOTE:
        return {
          ...state,
          notes: state.notes.map(note =>
            note._id === action.payload._id ? action.payload : note
          ),
          loading: false
        };
      case DELETE_NOTE:
        return {
          ...state,
          notes: state.notes.filter(note => note._id !== action.payload),
          loading: false
        };
      case SET_CURRENT_NOTE:
        return {
          ...state,
          currentNote: action.payload
        };
      case CLEAR_CURRENT_NOTE:
        return {
          ...state,
          currentNote: null
        };
      case NOTE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default noteReducer;
  