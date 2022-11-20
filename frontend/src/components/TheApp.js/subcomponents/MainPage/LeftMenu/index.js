// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopSettingsModal from "./TopSettingsModal";
import LeftMenuContent from "./LeftMenuContent";
import Dummy from "./Dummy";
import "./LeftMenu.css";

const LeftMenu = ({ isOwned, type, menuContent, setType }) => {
  const user = useSelector((state) => state.session.user);
  // const currentMenuContent = useSelector((state) => state.currentMenuContent);
  const [title, setTitle] = useState("Default Title");
  // const [content, setContent] = useState("");
  // const [type, setType] = useState("homePage");
  // const [isOwned, setIsOwned] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setType(currentMenuContent.type);
  //   setContent(currentMenuContent);
  // }, [currentMenuContent]);

  useEffect(() => {
    switch (type) {
      case "singleHome":
        setTitle(menuContent.home.homeName);
        if (isOwned) {
          setShowSettings(true);
          // setIsOwned(true);
        } else {
          setShowSettings(false);
          // setIsOwned(false);
        }
        setIsHome(true);
        break;
      case "homePage":
        setTitle("Home");
        setShowSettings(true);
        break;
      default:
        setTitle("Home");
        setShowSettings(true);
    }
  }, [type, menuContent]);

  return (
    <div className="left-menu-wrapper">
      <div className="left-menu-title-container">
        <div className="left-menu-title-container-left-child">
          <strong>{title}</strong>
        </div>
        <div className="left-menu-title-container-right-child">
          {showSettings && (
            <TopSettingsModal
              type={type}
              menuContent={menuContent}
              setType={setType}
            />
          )}
        </div>
      </div>
      <LeftMenuContent
        isOwned={isOwned}
        type={type}
        menuContent={menuContent}
      />
    </div>
  );
};

export default LeftMenu;
