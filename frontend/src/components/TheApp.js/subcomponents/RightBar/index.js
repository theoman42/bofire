// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../../../store/session";
import { AiOutlineUser } from "react-icons/ai";

function RightBar() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="right-bar-wrapper">
      <div className="right-bar-profile-container">
        <div className="icons">
          <AiOutlineUser />
        </div>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

export default RightBar;
