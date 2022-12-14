import { csrfFetch } from "./csrf";

const GET_HOME_CONTENT = "menu/getHomeContent";
const CHANGE_TYPE = "menu/changeType";

export const getHomeContent = (data) => {
  return {
    type: GET_HOME_CONTENT,
    payload: data,
  };
};

const goToHome = (data) => {
  return {
    type: CHANGE_TYPE,
    payload: data,
  };
};

export const goToProfile = (content) => {
  return {
    type: CHANGE_TYPE,
    payload: { type: "profilePage", content: content },
  };
};

export const goExplore = (content) => {
  return {
    type: CHANGE_TYPE,
    payload: { type: "explorePage", content: content },
  };
};

export const resetContent = (data) => async (dispatch) => {
  dispatch(getHomeContent(data));
};

export const getOneHomeContent = (homeId) => async (dispatch) => {
  const response = await csrfFetch(`api/homes/${homeId}`);
  const data = await response.json();

  dispatch(
    getHomeContent({
      home: data.home,
      type: "singleHome",
    })
  );
  return response;
};

export const goHome = (content) => async (dispatch) => {
  dispatch(goToHome({ type: "homePage", content: content }));
};

const currentMenuContentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_HOME_CONTENT:
      newState = action.payload;
      return newState;
    case CHANGE_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export default currentMenuContentReducer;
