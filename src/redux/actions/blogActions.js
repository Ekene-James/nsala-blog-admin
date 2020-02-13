import { ERRORS, GET_SEARCH, GET_ALL_BLOGS, GET_MY_BLOGS } from "../type";
import {
  buttonLoading,
  success,
  stopLoading,
  isLoading,
  clearErrors
} from "./loadingActions";
import firebase, { storage, firestore } from "../../utils/firebase";

export const postBlog = (blog, history) => dispatch => {
  
  dispatch(buttonLoading());
  var file = blog.file;
  var storageRef = storage.ref();
  let imageUrl;

  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg"
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef
    .child("blogDisplayPix/" + file.name)
    .put(file, metadata);
  uploadTask.snapshot.ref
    .getDownloadURL()
    .then(downloadURL => {
      imageUrl = downloadURL;
      return firestore.collection(`blogPosts`).add({
        category: blog.category,
        title: blog.title,
        text: blog.text,
        imgUrl: downloadURL,
        bloggerId: blog.bloggerId,
        bloggerProfileImgUrl: blog.bloggerProfileImgUrl,
        creatAt: Date.now(),
        totalComments: 0
      });
    })
    .then(ref => {
      const smallLetter = blog.title.toLowerCase();
      const seperate = smallLetter.split(" ");
      const data = {
        category: blog.category,
        title: blog.title,

        BlogImgUrl: imageUrl,
        bloggerId: blog.bloggerId,
        bloggerProfileImgUrl: blog.bloggerProfileImgUrl,
        creatAt: Date.now(),
        keywords: seperate,
        totalComments: 0
      };
      console.log("blogPosts cat ve bin created wit id :", ref.id);
      return firestore
        .collection(`blogMeta`)
        .doc(ref.id)
        .set(data);
    })
    .then(ref => {
      const userRef = firestore
        .collection("blogTotal")
        .doc("eachCategoryTotal");
      const increaseBy = firebase.firestore.FieldValue.increment(1);
      userRef.update({ totalBlogs: increaseBy });
      userRef.update({ [blog.category]: increaseBy });
    })
    .then(() => {
      dispatch(clearErrors())
      dispatch(success());
    })
    .then(() => history.push("/"))
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
export const deleteBlog = (id, category, uid) => dispatch => {
  dispatch(buttonLoading());
  firestore
    .collection("blogPosts")
    .doc(id)
    .delete()
    .then(() =>
      firestore
        .collection("blogMeta")
        .doc(id)
        .delete()
    )
    .then(ref => {
      const userRef = firestore
        .collection("blogTotal")
        .doc("eachCategoryTotal");
      const increaseBy = firebase.firestore.FieldValue.increment(-1);
      userRef.update({ totalBlogs: increaseBy });
      userRef.update({ [category]: increaseBy });
    })
    .then(() => dispatch(getAllMyBlogs(uid)))
    .then(() =>{ dispatch(success())
      dispatch(clearErrors())})
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
export const getSearch = (search, history) => dispatch => {
  dispatch(isLoading());

  const smallLetter = search.toLowerCase();
  const seperate = smallLetter.split(" ");
  return firestore
    .collection("blogMeta")
    .where("keywords", "array-contains-any", seperate)
    .get()
    .then(snapshot => {
      // Get the last document is

      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerID,
          bloggerProfileImgUrl,
          creatAt
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerID,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl,
          search
        };
      });

      return dispatch({
        type: GET_SEARCH,
        payload: stuffs
      });
    })
    .then(() => dispatch(stopLoading()))
    .then(() => history.push(`/search/${search}`))
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

export const getAllBlogs = history => dispatch => {
  dispatch(isLoading());
  return firestore
    .collection("blogMeta")
    .orderBy("creatAt", "desc")
    .get()
    .then(snapshot => {
      // Get the last document

      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerID,
          bloggerProfileImgUrl,
          creatAt
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerID,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl
        };
      });

      return dispatch({
        type: GET_ALL_BLOGS,
        payload: stuffs
      });
    })
    .then(() => {
      dispatch(stopLoading());
      dispatch(clearErrors())
      history.push("/all-Blogs");
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

export const getAllMyBlogs = uid => dispatch => {
  dispatch(isLoading());
  return firestore
    .collection("blogMeta")
    .where("bloggerId", "==", uid)
    .orderBy("creatAt", "desc")
    .get()
    .then(snapshot => {
      // Get the last document
      const stuffs = snapshot.docs.map(doc => {
        const data = doc.data();
        const {
          category,
          BlogImgUrl,
          title,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt
        } = data;
        const id = doc.id;

        return {
          id,
          category,
          bloggerId,
          bloggerProfileImgUrl,
          creatAt: creatAt.seconds,
          title,
          BlogImgUrl
        };
      });

      return dispatch({
        type: GET_MY_BLOGS,
        payload: stuffs
      });
    })
    .then(() => {
      dispatch(clearErrors())
      dispatch(stopLoading());
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
