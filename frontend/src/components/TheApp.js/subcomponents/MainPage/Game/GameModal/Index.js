import React, { useState } from "react";
import { Modal } from "../../../../../../context/Modal";
import { RiGamepadLine } from "react-icons/ri";
import GameSelectionMenu from "./GameModal";
import "./index.css";

const GameMenuModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="game-button-icon" onClick={() => setShowModal(true)}>
        <RiGamepadLine />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <GameSelectionMenu onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default GameMenuModal;
