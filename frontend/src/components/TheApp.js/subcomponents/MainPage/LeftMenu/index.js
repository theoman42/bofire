// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsModal from "./SettingsModal";
import "./LeftMenu.css";

const LeftMenu = () => {
  const user = useSelector((state) => state.session.user);
  const currentMenuContent = useSelector((state) => state.currentMenuContent);
  const [title, setTitle] = useState("Default Title");
  const [content, setContent] = useState("");
  const [type, setType] = useState("homePage");
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setType(currentMenuContent.type);
    setContent(currentMenuContent);
  }, [currentMenuContent]);

  useEffect(() => {
    switch (type) {
      case "singleHome":
        setTitle(currentMenuContent.home.homeName);
        if (currentMenuContent.home.ownerId === user.id) setShowSettings(true);
        else setShowSettings(false);
        break;
      case "homePage":
        setTitle("Home");
        setShowSettings(true);
        break;
      default:
        setTitle("Home");
        setShowSettings(true);
    }
  }, [type, content]);

  return (
    <div className="left-menu-wrapper">
      <div className="left-menu-title-container">
        <div className="left-menu-title-container-left-child">
          <strong>{title}</strong>
        </div>
        <div className="left-menu-title-container-right-child">
          {showSettings && (
            <SettingsModal setType={setType} type={type} content={content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
