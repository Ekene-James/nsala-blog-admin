import { combineReducers } from "redux";
import blogReducer from "./reducer/blogReducer";
import errorReducer from "./reducer/errorReducer";
import adminReducer from "./reducer/adminReducer";
import authReducer from "./reducer/authReducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  errors: errorReducer,
  admin: adminReducer,
  auth : authReducer
});
export default rootReducer;
