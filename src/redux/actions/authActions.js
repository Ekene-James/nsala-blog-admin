import {
  buttonLoading,
  success,
  isLoading,
  stopLoading,
  clearErrors
} from "./loadingActions";
import { ERRORS, GET_PROFILE_INFO, CLEAR_PROFILE_INFO, USER } from "../type";
import { auth, firestore, storage } from "../../utils/firebase";

export const login = (details, history) => dispatch => {
  dispatch(buttonLoading());

  return auth
    .signInWithEmailAndPassword(details.email, details.password)
    .then(() => {
      dispatch(success());
      dispatch(clearErrors());
      history.push("/");
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      return dispatch({
        type: ERRORS,
        payload: errors
      });
    });
};

export const authCreateProfileInfo = (uid, details, history) => dispatch => {
  dispatch(buttonLoading());
 

  var file = details.file;
  var storageRef = storage.ref();
  let imgUrl;

  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg"
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child("userDp/" + file.name).put(file, metadata);
  uploadTask.snapshot.ref
    .getDownloadURL()
    .then(downloadUrl => {
      imgUrl = downloadUrl;
      return firestore
        .collection("users")
        .doc(uid)
        .set({
          name: details.name,
          job: details.job,
          bio: details.bio,

          twitter: details.twitter,
          facebook: details.facebook,
          instagram: details.instagram,
          bloggerProfileImgUrl: imgUrl,
          bloggerId: uid
        }).catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          const errors = {
            errorCode,
            errorMessage
          };
          return dispatch({
            type: ERRORS,
            payload: errors
          });
        });
    })
    .then(() => {
      console.log("users collection has been created");
      dispatch(clearErrors());
      dispatch(success());
      history.push("/");
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      return dispatch({
        type: ERRORS,
        payload: errors
      });
    });
};

export const updateUserCollection = (uid, details) => dispatch => {
  dispatch(buttonLoading());
  return firestore
    .collection("users")
    .doc(uid)
    .update({
      name: details.name,
      job: details.job,
      bio: details.bio,

      twitter: details.twitter,
      facebook: details.facebook,
      instagram: details.instagram
    })
    .then(() => {
      console.log("users collection has been updated");
      dispatch(clearErrors());

      dispatch(success());
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      return dispatch({
        type: ERRORS,
        payload: errors
      });
    });
};
export const deleteUserInCollection = id => {
  return firestore
    .collection("users")
    .doc(id)
    .delete()
    .catch(error => console.log("deleting user error :" + error));
};

export const logout = history => dispatch => {
  return auth
    .signOut()
    .then(() =>
      dispatch({
        type: CLEAR_PROFILE_INFO
      })
    )
    .then(() => {
      // Sign-out successful.
      console.log("logged out successfully");
      return history.push("/login");
      dispatch(clearErrors());
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      dispatch({
        type: ERRORS,
        payload: errors
      });
      // ...
    });
};

export const getProfileInfo = (id, history) => dispatch => {
  dispatch(isLoading());
  firestore
    .collection("users")
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
        history.push(`/create-profile/${id}`);
      } else {
        dispatch({
          type: GET_PROFILE_INFO,
          payload: doc.data()
        });
        dispatch(stopLoading());
        dispatch(clearErrors());
      }
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      dispatch({
        type: ERRORS,
        payload: errors
      });
      // ...
    });
};

export const uploadUserImg = (uid, blog, history) => dispatch => {
  dispatch(buttonLoading());
  var file = blog;
  var storageRef = storage.ref();

  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg"
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child("userDp/" + file.name).put(file, metadata);
  uploadTask.snapshot.ref
    .getDownloadURL()
    .then(downloadUrl => {
      firestore
        .collection("users")
        .doc(uid)
        .update({ bloggerProfileImgUrl: downloadUrl });
    })
    .then(() => dispatch(getProfileInfo(uid, history)))
    .then(() => {
      console.log("user collection updated from non-admin");
      dispatch(clearErrors());
      return dispatch(success());
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      dispatch({
        type: ERRORS,
        payload: errors
      });
      // ...
    });
};
export const createUser = (details, history) => dispatch => {
  dispatch(buttonLoading());
  auth
    .createUserWithEmailAndPassword(details.email, details.password)
    .then(() => {
      dispatch(success());
      dispatch(clearErrors());
      history.push("/");
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      const errors = {
        errorCode,
        errorMessage
      };
      dispatch({
        type: ERRORS,
        payload: errors
      });
      // ...
    });
};
export const getCurrentUser = history => dispatch => {
  dispatch(isLoading());

  return auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      dispatch({
        type: USER,
        payload: user.uid
      });

      dispatch(getProfileInfo(user.uid, history));
    } else {
      history.push("/login");
      dispatch(stopLoading());
    }
  });
};
