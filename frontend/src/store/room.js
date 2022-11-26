import { csrfFetch } from "./csrf";

const GET_ALL_ROOMS = "room/getAllRooms";
const GET_ONE_ROOM = "room/getOneRoom";
const ADD_ROOM = "room/addRoom";
const UPDATE_ROOM = "room/updateRoom";
const DELETE_ROOM = "room/deleteRoom";

const getAllRooms = (data) => {
  return {
    type: GET_ALL_ROOMS,
    payload: data,
  };
};

const getOneRoom = (data) => {
  return {
    type: GET_ONE_ROOM,
    payload: data,
  };
};

const addOneRoom = (data) => {
  return {
    type: ADD_ROOM,
    payload: data,
  };
};

const updateOneRoom = (data) => {
  return {
    type: UPDATE_ROOM,
    payload: data,
  };
};

const deleteOneRoom = (roomId) => {
  return {
    type: DELETE_ROOM,
    payload: roomId,
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

export const addRoom = (homeId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/homes/${homeId}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addOneRoom(data.newRoom));
    return data;
  }
};

export const updateRoom = (homeId, roomId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/homes/${homeId}/rooms/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateOneRoom(data.updatedRoom));
    return data;
  }
};

export const deleteRoom = (userId, homeId, roomId) => async (dispatch) => {
  const response = await csrfFetch(
    `api/homes/${homeId}/rooms/${roomId}/${userId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteOneRoom(data.roomId));
    return data;
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
    case ADD_ROOM:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_ROOM:
      const newEditState = { ...state };
      newEditState[action.payload.id] = action.payload;
      return newEditState;
    case DELETE_ROOM:
      const newDeleteState = { ...state };
      delete newDeleteState[action.payload];
      return newDeleteState;
    default:
      return state;
  }
};

export default roomsReducer;
