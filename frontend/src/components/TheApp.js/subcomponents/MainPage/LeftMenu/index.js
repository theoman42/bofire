// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopSettingsModal from "./TopSettingsModal";
import LeftMenuContent from "./LeftMenuContent";
import "./LeftMenu.css";

const LeftMenu = () => {
  const user = useSelector((state) => state.session.user);
  const menuContent = useSelector((state) => state.currentMenuContent);
  const [title, setTitle] = useState("Default Title");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    switch (menuContent.type) {
      case "singleHome":
        setTitle(menuContent.home.homeName);
        if (menuContent.home.ownerId === user.id) setShowSettings(true);
        else setShowSettings(false);
        break;
      case "homePage":
        setTitle("Home");
        setShowSettings(false);
        break;
      case "profilePage":
        setTitle(`${user.username}`);
        setShowSettings(false);
        break;
      case "explorePage":
        setTitle("Find Friends");
        setShowSettings(false);
        break;
      default:
        setTitle("Home");
        setShowSettings(false);
    }
  }, [menuContent, user]);

  return (
    <div className="left-menu-wrapper">
      <div className="left-menu-title-container">
        <div className="left-menu-title-container-left-child">
          <strong>{title}</strong>
        </div>
        <div className="left-menu-title-container-right-child">
          {showSettings && <TopSettingsModal />}
        </div>
      </div>
      <LeftMenuContent />
    </div>
  );
};

export default LeftMenu;
