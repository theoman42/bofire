// frontend/src/components/Navigation/index.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MainPage.css";

const Content = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <div className="content-wrapper">
      <div>hello</div>
    </div>
  );
};

export default Content;
