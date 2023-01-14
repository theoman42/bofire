import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentWhenInHouse from "./ContentWhenInHouse";
import ProfileSettings from "./ProfileSettings";
import ExploreLeftHandContent from "./ExploreLeftHandContent";

const LeftMenuContent = () => {
  const [contentForLeftMenu, setContentForLeftMenu] = useState("");
  const menuContent = useSelector((state) => state.currentMenuContent);

  useEffect(() => {
    switch (menuContent?.type) {
      case "singleHome":
        setContentForLeftMenu(<ContentWhenInHouse />);
        break;
      case "homePage":
        setContentForLeftMenu(<div>Welcome Home!</div>);
        break;
      case "profilePage":
        setContentForLeftMenu(<ProfileSettings />);
        break;
      case "explorePage":
        setContentForLeftMenu(<ExploreLeftHandContent />);
        break;
      default:
        setContentForLeftMenu(<div>This is a home</div>);
    }
  }, [menuContent]);

  return (
    <div className="left-menu-content-container">{contentForLeftMenu}</div>
  );
};

export default LeftMenuContent;
