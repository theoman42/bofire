import { csrfFetch } from "./csrf";

const GET_PART_HOMES_FOR_USER = "home/setUserPartHomes";
const JOIN_HOME = "home/joinHome";

const getJoinedHomesForUser = (data) => {
  return {
    type: GET_PART_HOMES_FOR_USER,
    payload: data,
  };
};

export const getUserPartHomes = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/partHomes`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getJoinedHomesForUser(data.userPartHomes.Homes));
  }
};

const userPartHomesReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_PART_HOMES_FOR_USER:
      action.payload.forEach((home) => {
        newState[home.id] = home;
      });
      return newState;
    case JOIN_HOME:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userPartHomesReducer;
