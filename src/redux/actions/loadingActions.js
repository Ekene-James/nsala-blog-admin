import {
  BUTTON_LOADING,
  SUCCESS,
  IS_LOADING,
  STOP_LOADING,
  CLEAR_ERRORS
} from "../type";

export const buttonLoading = () => {
  return {
    type: BUTTON_LOADING
  };
};

export const success = () => {
  return {
    type: SUCCESS
  };
};

export const isLoading = () => {
  return {
    type: IS_LOADING
  };
};
export const stopLoading = () => {
  return {
    type: STOP_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
