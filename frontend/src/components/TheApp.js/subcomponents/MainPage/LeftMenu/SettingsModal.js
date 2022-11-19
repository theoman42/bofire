import React, { useState } from "react";
import { Modal } from "../../../../../context/Modal";
import { RiSettings2Line } from "react-icons/ri";
import { useEffect } from "react";
import HomeSettingsForm from "./UpdateHomeSettingsForm";

const SettingsModal = ({ type, content, setType }) => {
  const [showModal, setShowModal] = useState(false);
  const [menuContent, setMenuContent] = useState("");

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(type);
    switch (type) {
      case "singleHome":
        setMenuContent(
          <HomeSettingsForm
            content={content}
            onClose={onClose}
            setType={setType}
          />
        );
        break;
      case "homePage":
        setMenuContent(<div>{"hi"}</div>);
        break;
      default:
        setMenuContent(<div>{"hi"}</div>);
    }
  }, [content]);

  return (
    <>
      <RiSettings2Line
        className="add-spot-button"
        onClick={() => setShowModal(true)}
      ></RiSettings2Line>
      {showModal && <Modal onClose={onClose}>{menuContent}</Modal>}
    </>
  );
};

export default SettingsModal;
