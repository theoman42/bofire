import React from "react";
import { useSelector } from "react-redux";
import "./index.css";
import Anagram from "../../../../../Games/Anagrams";

const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {/* <button className="special-main-button">Click to Start</button> */}
      <div className="main-menu-grid">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <Anagram />
      </div>
    </>
  );
};

export default HomePage;
