import { csrfFetch } from "./csrf";

const GET_HOME_CONTENT = "menu/getHomeContent";
const GO_HOME = "menu/goHome";
const GO_FRIEND = "menu/goFriend";

export const getHomeContent = (data) => {
  return {
    type: GET_HOME_CONTENT,
    payload: data,
  };
};

const goToHome = (data) => {
  return {
    type: GO_HOME,
    payload: data,
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

export const goHome = () => async (dispatch) => {
  dispatch(goToHome({ type: "homePage" }));
};

const currentMenuContentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_HOME_CONTENT:
      newState = action.payload;
      return newState;
    case GO_HOME:
      return action.payload;
    default:
      return state;
  }
};

export default currentMenuContentReducer;
