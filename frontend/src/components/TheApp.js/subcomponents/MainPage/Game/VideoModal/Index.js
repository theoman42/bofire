import React, { useState } from "react";
import { Modal } from "../../../../../../context/Modal";
import { HiOutlineVideoCamera } from "react-icons/hi";
import "./index.css";
import VideoSelectionModal from "./VideoModal";

const VideoMenuModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="game-button-icon" onClick={() => setShowModal(true)}>
        <HiOutlineVideoCamera />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <VideoSelectionModal onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default VideoMenuModal;
