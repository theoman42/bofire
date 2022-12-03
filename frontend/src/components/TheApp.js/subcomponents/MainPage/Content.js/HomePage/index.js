import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <button className="special-main-button">Click to Start</button>
    </>
  );
};

export default HomePage;
