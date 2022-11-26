import { csrfFetch } from "./csrf";

const LOAD_NEW_GAME = "anagram/loadNewGame";
const UPDATE_SCORE = "anagram/updateScore";
const END_GAME_SESSION = "anagram/endSession";

const loadNewGame = (data) => {
  return {
    type: LOAD_NEW_GAME,
    payload: data,
  };
};

const submitOneWord = (data) => {
  return {
    type: UPDATE_SCORE,
    payload: data,
  };
};

const endGameSession = () => {
  return {
    type: END_GAME_SESSION,
  };
};

export const loadGame = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/anagram`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(loadNewGame(data.newGame));
    return data;
  }
};

export const submitAWord = (payload, gameId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/anagram/${gameId}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(submitOneWord(data.score));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};

export const endGame = (userId, gameId) => async (dispatch) => {
  const response = await csrfFetch(`api/anagram/${gameId}/${userId}`, {
    method: "DELETE",
  });
  //Make this a put so the game query doesn't get comletely deleted
  if (response.ok) {
    const data = await response.json();
    dispatch(endGameSession());
    return data;
  }
};

const anagramReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_NEW_GAME:
      return action.payload;
    case UPDATE_SCORE:
      newState = Object.assign({}, state);
      newState.score = action.payload;
      return newState;
    case END_GAME_SESSION:
      return newState;
    // case DELETE_ROOM:
    //   const newDeleteState = { ...state };
    //   delete newDeleteState[action.payload];
    //   return newDeleteState;
    default:
      return state;
  }
};

export default anagramReducer;
