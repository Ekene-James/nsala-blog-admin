import { LIST_USERS, ERRORS } from "../type";
//import * as admin from 'firebase-admin';

import {
  createUserCollection,
  updateUserCollection,
  deleteUserInCollection
} from "./authActions";
import {
  success,
  buttonLoading,
  isLoading,
  stopLoading
} from "./loadingActions";
let admin;
//admin.initializeApp();

export const adminCreateUser = details => dispatch => {
  dispatch(buttonLoading());

  return admin
    .auth()
    .createUser({
      email: details.email,
      emailVerified: false,

      password: details.password,
      displayName: details.name,

      disabled: false
    })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user via admin:", userRecord.uid);
      // dispatch(createUserCollection(userRecord.uid, details));
    })
    .then(() => dispatch(success()))
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};

//update user profile
export const adminUpdateUserProfile = (uid, update, history) => dispatch => {
  dispatch(buttonLoading());
  return admin
    .auth()
    .updateUser(uid, {
      email: update.email,

      emailVerified: false,
      password: update.password,
      displayName: update.name
    })
    .then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
      dispatch(updateUserCollection(uid, update));
    })
    .then(() => {
      dispatch(success());
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};

export const deleteUser = uid => dispatch => {
  dispatch(buttonLoading());

  return admin
    .auth()
    .deleteUser(uid)
    .then(() => dispatch(deleteUserInCollection(uid)))
    .then(() => {
      console.log("Successfully deleted user");
      dispatch(success());
    })
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};

export const listAllUsers = nextPageToken => dispatch => {
  dispatch(isLoading());
  // List batch of users, 1000 at a time.

  return admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then(listUsersResult => {
      listUsersResult.users
        .map(userRecord => {
          console.log("user", userRecord.toJSON());
          //userRecord.customClaims.admin
          return dispatch({
            type: LIST_USERS,
            payload: userRecord.toJSON()
          });
        })
        .then(() => dispatch(stopLoading()));
    })
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};

export const makeAdmin = uid => dispatch => {
  // Set admin privilege on the user corresponding to uid.
  dispatch(buttonLoading());

  return admin
    .auth()
    .setCustomUserClaims(uid, { admin: true })
    .then(() => {
      return dispatch(success());
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
    })
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};
export const removeAdmin = uid => dispatch => {
  dispatch(buttonLoading());
  return admin
    .auth()
    .setCustomUserClaims(uid, { admin: false })
    .then(() => {
      return dispatch(success());
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
    })
    .catch(error => {
      dispatch({
        type: ERRORS,
        payload: error
      });
    });
};
