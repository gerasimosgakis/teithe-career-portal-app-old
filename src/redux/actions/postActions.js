import { API } from "aws-amplify";
import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  POST_LOADING,
  DELETE_POST
} from "./types";
import gravatar from "gravatar";

// Add Post
export const addPost = (user, email, postData, history) => async dispatch => {
  const avatar = gravatar.url(email, {
    s: "100", // size
    r: "pg", // rating
    d: "mm" //default
  });
  postData.avatar = avatar;

  try {
    const post = await API.post("teithe-career-portal-api", `/posts`, {
      body: postData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    dispatch({
      type: ADD_POST,
      payload: post
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());
  try {
    const posts = await API.get("teithe-career-portal-api", `/posts`);
    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

// Delete Post
export const deletePost = id => async dispatch => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await API.del("teithe-career-portal-api", `/posts/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  }
};

// Get Post
export const getPost = id => async dispatch => {
  console.log("Post", id);
  dispatch(setPostLoading());
  try {
    const posts = await API.get("teithe-career-portal-api", `/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: posts
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_POST,
      payload: null
    });
  }
};

// Add Like
export const addLike = (id, user) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/posts/like/${id}`, {
      body: {
        // set custom header id for testing
        userId: user
      }
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Remove Like
export const removeLike = (id, user) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/posts/unlike/${id}`, {
      body: {
        // set custom header id for testing
        userId: user
      }
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Add Comment
export const addComment = (
  postId,
  user,
  email,
  commentData,
  history
) => async dispatch => {
  const avatar = gravatar.url(email, {
    s: "100", // size
    r: "pg", // rating
    d: "mm" //default
  });
  commentData.avatar = avatar;
  console.log(postId);
  try {
    const post = await API.put(
      "teithe-career-portal-api",
      `/posts/comment/${postId}`,
      {
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // },
        body: commentData
      }
    );
    dispatch(getPost(postId));
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Delete Comment
export const deleteComment = (postId, index, history) => async dispatch => {
  try {
    await API.put(
      "teithe-career-portal-api",
      `/posts/comment/delete/${postId}`,
      {
        body: { index }
      }
    );
    dispatch(getPost(postId));
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
