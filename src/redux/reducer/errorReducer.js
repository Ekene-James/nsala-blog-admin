import {
  ERRORS,
  BUTTON_LOADING,
  SUCCESS,
  IS_LOADING,
  STOP_LOADING,
  CLEAR_ERRORS
} from "../type";

const initialState = {
  errors: [],
  loading: false,
  buttonLoading: false,
  success: ""
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORS: {
      return {
        errors: action.payload
      };
    }
    case CLEAR_ERRORS: {
      return { ...state, errors: [] };
    }
    case BUTTON_LOADING: {
      return {
        ...state,
        buttonLoading: true
      };
    }
    case SUCCESS: {
      return {
        ...state,
        buttonLoading: false,
        success: "Operation Successful"
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};
export default errorReducer;
