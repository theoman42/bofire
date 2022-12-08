// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../MainPage.css";
import Anagram from "../../../../Games/Anagrams";
import SingleHome from "./SingleHome";
import HomePage from "./HomePage";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import "./index.css";

const Content = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const main = useSelector((state) => state.currentMenuContent);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    switch (main.type) {
      case "singleHome":
        setContent(<SingleHome />);
        break;
      case "homePage":
        setContent(<HomePage />);
        break;
      case "profilePage":
        break;
      case "explorePage":
        break;
      default:
    }
  }, [main, sessionUser]);

  return (
    <div className="content-wrapper">
      <div className="main-top-content-wrapper">{content}</div>
      <div className="main-lower-content-wrapper">
        <a href="https://www.linkedin.com/in/theofandrich/">
          <AiFillLinkedin className="links-icons" />
        </a>
        <a href="https://github.com/theoman42">
          <AiFillGithub className="links-icons" />
        </a>
      </div>
    </div>
  );
};

export default Content;
