import { csrfFetch } from "./csrf";

const GET_ALL_MESSAGES = "message1/getAllMessages";
const SEND_MESSAGE = "message1/sendOneMessage";
const CLEAR_MESSAGES = "message1/clearMessages";

const getAllMessages = (data, roomName) => {
  return {
    type: GET_ALL_MESSAGES,
    payload: data,
    roomName,
  };
};

const sendOneMessage = (data) => {
  return {
    type: SEND_MESSAGE,
    payload: data,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};

export const getMessages = (id, type, roomName) => async (dispatch) => {
  const response = await csrfFetch(`/api/messages/${type}/${id}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMessages(data, roomName));
  }
};

export const sendMessage = (payload, type, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/messages/${type}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(sendOneMessage(data));
    return data;
  }
};

const messageReducer1 = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_MESSAGES:
      newState["roomName"] = action.roomName;
      newState["messages"] = action.payload.messages;
      newState["type"] = action.payload.type;
      newState["id"] = action.payload.id;
      return newState;
    case SEND_MESSAGE:
      newState = Object.assign({}, state);
      newState.messages.push(action.payload.message);
      return newState;
    case CLEAR_MESSAGES:
      return newState;
    // case UPDATE_ROOM:
    //   const newEditState = { ...state };
    //   newEditState[action.payload.id] = action.payload;
    //   return newEditState;
    // case DELETE_ROOM:
    //   const newDeleteState = { ...state };
    //   delete newDeleteState[action.payload];
    //   return newDeleteState;
    default:
      return state;
  }
};

export default messageReducer1;
