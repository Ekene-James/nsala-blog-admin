import { GET_ALL_BLOGS, GET_SEARCH, GET_MY_BLOGS } from "../type";

const initialState = {
  allBlogs: [],
  myBlogs: [],

  searchItems: []
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS: {
      return {
        ...state,
        allBlogs: action.payload
      };
    }
    case GET_MY_BLOGS: {
      return {
        ...state,
        myBlogs: action.payload
      };
    }
    case GET_SEARCH: {
      return {
        ...state,
        searchItems: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
export default blogReducer;
