import { GET_PROFILE_INFO, CLEAR_PROFILE_INFO, USER } from "../type";

const initialState = {
  profileInfo: {},
  user: false,
  uid: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO: {
      return {
        user: true,
        profileInfo: action.payload
      };
    }
    case USER: {
      return {
        ...state,
        user: true,
        uid: action.payload
      };
    }
    case CLEAR_PROFILE_INFO: {
      return {
        profileInfo: {},
        user: false,
        uid: ""
      };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
