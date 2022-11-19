// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiThreeFriends } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import UserOwnedHomes from "./userOwnedHomes";
import UserPartHomes from "./userPartHomes";
import { goHome } from "../../../../store/currentMenuContent";
import "./Navigation.css";

function Navigation() {
  // const userOwnedHomes = Object.values(
  //   useSelector((state) => state.userOwnedHomes)
  // );
  // const userJoinedHomes = Object.values(useSelector((state) => state.userHomes));
  const dispatch = useDispatch();

  return (
    <div className="navigation-left-bar-wrapper">
      <div className="navigation-button-container">
        <div className="icons">
          <NavLink exact to="/">
            <AiOutlineHome onClick={() => dispatch(goHome())} />
          </NavLink>
        </div>
        <div className="icons">
          <GiThreeFriends />
        </div>
      </div>
      <UserOwnedHomes />
      <UserPartHomes />
    </div>
  );
}

export default Navigation;
