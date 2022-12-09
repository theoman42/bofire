import { csrfFetch } from "./csrf";

const GET_OWNED_HOMES_FOR_USER = "home/setOwnedHomes";
const ADD_HOME = "home/addOwnedHome";
const UPDATE_HOME = "home/updateOwnedHome";
const DELETE_HOME = "home/deleteOwnedHome";

const getOwnedHomesForUser = (data) => {
  return {
    type: GET_OWNED_HOMES_FOR_USER,
    payload: data,
  };
};

const addOneHome = (data) => {
  return {
    type: ADD_HOME,
    payload: data,
  };
};

const updateOneHome = (data) => {
  return {
    type: UPDATE_HOME,
    payload: data,
  };
};

const deleteOwnedHome = (homeId) => {
  return {
    type: DELETE_HOME,
    payload: homeId,
  };
};

export const getUserOwnedHomes = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/ownedHomes`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getOwnedHomesForUser(data));
  }
};

export const addHome = (payload, userId) => async (dispatch) => {
  const { image, homeName } = payload;
  const formData = new FormData();
  let imageExist = 0;
  if (image) imageExist = 1;

  if (image) formData.append("image", image);
  formData.append("homeName", homeName);
  const response = await csrfFetch(
    `api/users/${userId}/ownedHomes/${imageExist}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(addOneHome(data.newHome));
    return data;
  }
};

export const updateHome = (payload, userId, homeId) => async (dispatch) => {
  const { image, homeName } = payload;
  const formData = new FormData();

  let imageExist = 0;
  if (image) imageExist = 1;
  if (image) formData.append("image", image);
  formData.append("homeName", homeName);

  const response = await csrfFetch(
    `api/users/${userId}/ownedHomes/${homeId}/${imageExist}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(updateOneHome(data.updatedHome));
    return data.updatedHome;
  }
};

export const deleteHome = (userId, homeId) => async (dispatch) => {
  const response = await csrfFetch(`api/users/${userId}/ownedHomes/${homeId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteOwnedHome(data.homeId));
    return data;
  }
};

const userOwnedHomesReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_OWNED_HOMES_FOR_USER:
      action.payload.forEach((home) => {
        newState[home.id] = home;
      });
      return newState;
    case ADD_HOME:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_HOME:
      const newEditState = { ...state };
      newEditState[action.payload.id] = action.payload;
      return newEditState;
    case DELETE_HOME:
      const newDeleteState = { ...state };
      delete newDeleteState[action.payload];
      return newDeleteState;
    default:
      return state;
  }
};

export default userOwnedHomesReducer;
