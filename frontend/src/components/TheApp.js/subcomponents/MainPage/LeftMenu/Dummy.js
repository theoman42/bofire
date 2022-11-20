import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentWhenInHouse from "./ContentWhenInHouse";
import Dummy2 from "./Dummy2";

const Dummy = ({ content }) => {
  // const type = useSelector((state) => state.currentMenuContent.type);
  const [hello, setHello] = useState("");

  // useEffect(() => {
  //   console.log(type);
  //   switch (type) {
  //     case "singleHome":
  //       setContentForLeftMenu(<ContentWhenInHouse />);
  //       break;
  //     case "homePage":
  //       setContentForLeftMenu(<div>This is a home</div>);
  //       break;
  //     default:
  //       setContentForLeftMenu(<div>This is a home</div>);
  //   }
  // }, [type]);

  useEffect(() => {
    console.log(content);
    if (content.home) {
      setHello(content.home.homeName);
      console.log(hello);
    }
  }, [content]);

  return (
    <div className="dummy-class">
      <Dummy2 hello={hello} />
    </div>
  );
};

export default Dummy;
