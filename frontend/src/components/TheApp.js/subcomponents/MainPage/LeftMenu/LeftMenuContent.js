import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentWhenInHouse from "./ContentWhenInHouse";

const LeftMenuContent = (isOwned) => {
  const [contentForLeftMenu, setContentForLeftMenu] = useState("");
  const menuContent = useSelector((state) => state.currentMenuContent);

  useEffect(() => {
    console.log(menuContent.type);
    switch (menuContent.type) {
      case "singleHome":
        setContentForLeftMenu(<ContentWhenInHouse isOwned={isOwned} />);
        break;
      case "homePage":
        setContentForLeftMenu(<div>This is a home</div>);
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
