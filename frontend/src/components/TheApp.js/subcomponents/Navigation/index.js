// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiThreeFriends } from "react-icons/gi";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import UserOwnedHomes from "./userOwnedHomes";
import UserPartHomes from "./userPartHomes";
import {
  goToProfile,
  goHome,
  goExplore,
} from "../../../../store/currentMenuContent";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const menu = useSelector((state) => state.currentMenuContent);
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    if (user.profileImageUrl) setImageExists(true);
  }, [user]);

  const dispatch = useDispatch();

  return (
    <div className="navigation-left-bar-wrapper">
      <div className="navigation-button-container">
        <div
          className={`icons${menu.type === "homePage" ? "-active" : ""} clicky`}
          onClick={() => dispatch(goHome())}
        >
          <AiOutlineHome />
        </div>
        <div
          className={`icons${
            menu.type === "explorePage" ? "-active" : ""
          } clicky`}
          onClick={() => dispatch(goExplore())}
        >
          <GiThreeFriends />
        </div>
        <div
          className={`icons${
            menu.type === "profilePage" ? "-active" : ""
          } clicky`}
          onClick={() => dispatch(goToProfile())}
        >
          {imageExists ? (
            <img src={user.profileImageUrl} alt="profile" />
          ) : (
            <AiOutlineUser />
          )}
        </div>
      </div>
      <UserOwnedHomes type={menu.type} />
      <UserPartHomes type={menu.type} />
    </div>
  );
}

export default Navigation;
