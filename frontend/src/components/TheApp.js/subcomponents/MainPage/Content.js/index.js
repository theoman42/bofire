// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../MainPage.css";
import Anagram from "../../../../Games/Anagrams";
import SingleHome from "./SingleHome";
import HomePage from "./HomePage";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import GameMenuModal from "../Game/GameModal/Index";
import "./index.css";

const Content = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const main = useSelector((state) => state.currentMenuContent);
  const [content, setContent] = useState(<Anagram />);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (main.type) {
      case "singleHome":
        setContent(<Anagram />);
        break;
      case "homePage":
        setContent(<Anagram />);
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
          <AiFillLinkedin className="links-icons linkedin-blue" />
        </a>
        <a href="https://github.com/theoman42">
          <AiFillGithub className="links-icons github-white" />
        </a>
      </div>
    </div>
  );
};

export default Content;
