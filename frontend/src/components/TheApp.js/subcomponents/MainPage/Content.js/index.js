// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../MainPage.css";
import Anagram from "../../../../Games/Anagrams";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import "./index.css";
import HomePage from "./HomePage";

const Content = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const menu = useSelector((state) => state.currentMenuContent);
  const [content, setContent] = useState(<Anagram />);
  const dispatch = useDispatch();

  let tempContent = (
    <div>
      <div className="home-page-welcome-font"> Welcome Home!</div>
      <Anagram />
    </div>
  );

  useEffect(() => {
    switch (menu.type) {
      case "singleHome":
        setContent(<Anagram />);
        break;
      case "homePage":
        setContent(tempContent);
        break;
      case "profilePage":
        setContent(
          <div className="home-page-welcome-font"> Welcome Home!</div>
        );
        break;
      case "explorePage":
        setContent(<> Welcome </>);
        break;
      default:
    }
  }, [menu, sessionUser]);

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
