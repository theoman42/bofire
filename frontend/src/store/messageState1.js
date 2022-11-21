import { csrfFetch } from "./csrf";

const GET_ALL_MESSAGES = "message1/getAllMessages";
const SEND_MESSAGE = "message1/sendOneMessage";

const getAllMessages = (data) => {
  return {
    type: GET_ALL_MESSAGES,
    payload: data,
  };
};

const sendOneMessage = (data) => {
  return {
    type: SEND_MESSAGE,
    payload: data,
  };
};

export const getMessages = (id, type) => async (dispatch) => {
  const response = await csrfFetch(`/api/messages/${type}/${id}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMessages(data));
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
  console.log(response);
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
      console.log(action.payload);
      newState["messages"] = action.payload.messages;
      // action.payload.messages.forEach((message) => {
      //   newState["messages"][message.id] = message;
      // });
      newState["type"] = action.payload.type;
      newState["id"] = action.payload.id;
      return newState;
    case SEND_MESSAGE:
      newState = Object.assign({}, state);
      newState.messages.push(action.payload.message);
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
