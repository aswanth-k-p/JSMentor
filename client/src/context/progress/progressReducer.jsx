import {
    GET_PROGRESS,
    UPDATE_PROGRESS,
    PROGRESS_ERROR
  } from '../types';
  
  const progressReducer = (state, action) => {
    switch (action.type) {
      case GET_PROGRESS:
        return {
          ...state,
          progressItems: action.payload,
          loading: false
        };
      case UPDATE_PROGRESS:
        return {
          ...state,
          progressItems: state.progressItems.map(item =>
            item._id === action.payload._id ? action.payload : item
          ),
          loading: false
        };
      case PROGRESS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default progressReducer;