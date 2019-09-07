import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  RESET_USER
} from "./types";
import { API } from "aws-amplify";
import gravatar from "gravatar";

// Get current profile
export const getCurrentProfile = id => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const profiles = await API.get(
      "teithe-career-portal-api",
      `/profiles/${id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: profiles.length > 0 ? { ...profiles } : {}
    });
    console.log(profiles);
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// Get profile by handle
export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const profiles = await API.get(
      "teithe-career-portal-api",
      `/profiles-by-handle/${handle}`
    );
    console.log(profiles);
    dispatch({
      type: GET_PROFILE,
      payload: profiles.length > 0 ? { ...profiles } : {}
    });
    console.log(profiles);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// Create Profile
export const createProfile = (
  user,
  email,
  profileData,
  history
) => async dispatch => {
  console.log(typeof profileData.skills, profileData);
  //profileData.skills = profileData.skills ? profileData.skills.split(",") : [];
  if (profileData.skills && typeof profileData.skills === "string") {
    profileData.skills = profileData.skills.split(",");
  } else if (profileData.skills && typeof profileData.skills === "object") {
    profileData.skills = profileData.skills;
  } else {
    profileData.skills = [];
  }
  const avatar = gravatar.url(email, {
    s: "300", // size
    r: "pg", // rating
    d: "mm" //default
  });
  console.log(avatar);
  profileData.avatar = avatar;
  console.log(profileData);
  try {
    await API.post("teithe-career-portal-api", `/profiles`, {
      body: profileData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Add Experience
export const addExperience = (user, expData, history) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/experiences/${user}`, {
      body: expData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Add Education
export const addEducation = (user, eduData, history) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/educations/${user}`, {
      body: eduData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Delete Experience
export const deleteExperience = (user, index) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/delete-experience/${user}`, {
      body: { index }
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    dispatch(setProfileLoading());

    try {
      const profiles = await API.get(
        "teithe-career-portal-api",
        `/profiles/${user}`
      );
      dispatch({
        type: GET_PROFILE,
        payload: profiles.length > 0 ? { ...profiles } : {}
      });
      console.log(profiles);
    } catch (err) {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Delete Education
export const deleteEducation = (user, index) => async dispatch => {
  try {
    await API.put("teithe-career-portal-api", `/delete-education/${user}`, {
      body: { index }
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    dispatch(setProfileLoading());

    try {
      const profile = await API.get(
        "teithe-career-portal-api",
        `/profiles/${user}`
      );
      dispatch({
        type: GET_PROFILE,
        payload: profile.length > 0 ? { ...profile } : {}
      });
      console.log(profile);
    } catch (err) {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get All Profiles
export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const profiles = await API.get("teithe-career-portal-api", `/profiles`);
    dispatch({
      type: GET_PROFILES,
      payload: profiles
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PROFILES,
      payload: null
    });
  }
};

// Delete account & profile
export const deleteAccount = (user, profileId) => async dispatch => {
  console.log(user, profileId);
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await API.del("teithe-career-portal-api", `/profiles/${user}`, {
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // }
      });
      dispatch({
        type: RESET_USER
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
