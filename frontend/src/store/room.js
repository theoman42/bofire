import { csrfFetch } from "./csrf";

const GET_ALL_ROOMS = "room/getAllRooms";

const getAllRooms = (data) => {
  return {
    type: GET_ALL_ROOMS,
    payload: data,
  };
};

export const getRooms = (homeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/homes/${homeId}/rooms`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllRooms(data.allRooms));
  }
};

const roomsReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_ROOMS:
      action.payload.forEach((room) => {
        newState[room.id] = room;
      });
      return newState;
    // case ADD_HOME:
    //   newState = Object.assign({}, state);
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // case UPDATE_HOME:
    //   const newEditState = { ...state };
    //   newEditState[action.payload.id] = action.payload;
    //   return newEditState;
    // case DELETE_HOME:
    //   const newDeleteState = { ...state };
    //   delete newDeleteState[action.payload];
    //   return newDeleteState;
    default:
      return state;
  }
};

export default roomsReducer;
