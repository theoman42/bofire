// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../../../store/session";
import "./RightBar.css";

function RightBar() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   switch (menuContent.type) {
  //     case "singleHome":
  //       setTitle(menuContent.home.homeName);
  //       if (menuContent.home.ownerId === user.id) setShowSettings(true);
  //       else setShowSettings(false);
  //       break;
  //     case "homePage":
  //       setTitle("Home");
  //       setShowSettings(true);
  //       break;
  //     case "profilePage":
  //       setTitle(`${user.username}`);
  //       setShowSettings(false);
  //       break;
  //     default:
  //       setTitle("Home");
  //       setShowSettings(true);
  //   }
  // }, [menuContent, user]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="right-bar-wrapper">
      <div className="right-bar-profile-container"></div>
    </div>
  );
}

export default RightBar;
