// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../MainPage.css";
import Anagram from "../../../../Games/Anagrams";

const Content = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <div className="content-wrapper">
      <div>
        <Anagram />
      </div>
    </div>
  );
};

export default Content;
