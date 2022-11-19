import { csrfFetch } from "./csrf";

const GET_PART_HOMES_FOR_USER = "home/setUserPartHomes";
const JOIN_HOME = "home/joinHome";

const getJoinedHomesForUser = (data) => {
  return {
    type: GET_PART_HOMES_FOR_USER,
    payload: data,
  };
};

// const addOneHome = (data) => {
//   return {
//     type: ADD_HOME,
//     payload: data,
//   };
// };

export const getUserPartHomes = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/partHomes`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getJoinedHomesForUser(data.userPartHomes.Homes));
  }
};

// export const addHome = (payload, userId) => async (dispatch) => {
//   const response = await csrfFetch(`api/users/${userId}/homes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(addOneHome(data.newHome));
//     return data;
//   }
// };

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
    // newState = { ...state };
    // newState.homes.userOwnedHomes.push(action.payload.newHome);
    // return newState;
    // case EDIT_SPOT:
    //   const newEditState = { ...state };
    //   newEditState[action.payload.id] = action.payload;
    //   return newEditState;
    // case DELETE_SPOT:
    //   const newDeleteState = { ...state };
    //   delete newDeleteState[action.payload];
    //   return newDeleteState;
    default:
      return state;
  }
};

export default userPartHomesReducer;
