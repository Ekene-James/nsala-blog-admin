import { LIST_USERS, GET_USER_DETAILS } from "../type";

const initialState = {
  userList: [],
  userDetails: ""
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload
      };
    }
    case LIST_USERS: {
      return {
        ...state,
        userList: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
export default adminReducer;
