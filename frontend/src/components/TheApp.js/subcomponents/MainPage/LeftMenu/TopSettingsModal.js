import React, { useState } from "react";
import { Modal } from "../../../../../context/Modal";
import { RiSettings2Line } from "react-icons/ri";
import { useEffect } from "react";
import HomeSettingsForm from "./UpdateHomeSettingsForm";
import { useSelector } from "react-redux";

const TopSettingsModal = () => {
  const menuContent = useSelector((state) => state.currentMenuContent);
  const [showModal, setShowModal] = useState(false);
  const [toRender, setToRender] = useState("");

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    switch (menuContent.type) {
      case "singleHome":
        setToRender(<HomeSettingsForm onClose={onClose} />);
        break;
      case "homePage":
        setToRender(<div>{"hi"}</div>);
        break;
      default:
        setToRender(<div>{"hi"}</div>);
    }
  }, [menuContent]);

  return (
    <>
      <RiSettings2Line
        className="clicky"
        onClick={() => setShowModal(true)}
      ></RiSettings2Line>
      {showModal && <Modal onClose={onClose}>{toRender}</Modal>}
    </>
  );
};

export default TopSettingsModal;
