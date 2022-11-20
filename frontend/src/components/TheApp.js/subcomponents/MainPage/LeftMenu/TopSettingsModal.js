import React, { useState } from "react";
import { Modal } from "../../../../../context/Modal";
import { RiSettings2Line } from "react-icons/ri";
import { useEffect } from "react";
import HomeSettingsForm from "./UpdateHomeSettingsForm";

const TopSettingsModal = ({ type, menuContent, setType }) => {
  const [showModal, setShowModal] = useState(false);
  const [toRender, setToRender] = useState("");

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    switch (type) {
      case "singleHome":
        setToRender(
          <HomeSettingsForm
            menuContent={menuContent}
            onClose={onClose}
            setType={setType}
          />
        );
        break;
      case "homePage":
        setToRender(<div>{"hi"}</div>);
        break;
      default:
        setToRender(<div>{"hi"}</div>);
    }
  }, [menuContent, type]);

  return (
    <>
      <RiSettings2Line
        className="add-spot-button"
        onClick={() => setShowModal(true)}
      ></RiSettings2Line>
      {showModal && <Modal onClose={onClose}>{toRender}</Modal>}
    </>
  );
};

export default TopSettingsModal;
