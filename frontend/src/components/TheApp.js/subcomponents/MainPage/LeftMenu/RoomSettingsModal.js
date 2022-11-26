import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../../../context/Modal";
import { RiSettings2Line } from "react-icons/ri";
import { useEffect } from "react";
import UpdateRoomSettingsForm from "./UpdateRoomSettingsForm";

const RoomSettingsModal = ({ roomId }) => {
  const [showModal, setShowModal] = useState(false);
  // const rooms = useSelector((state) => {
  //   state.rooms;
  // });

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <RiSettings2Line
        className="clicky bring-to-front"
        onClick={() => setShowModal(true)}
      ></RiSettings2Line>
      {showModal && (
        <Modal onClose={onClose}>
          <UpdateRoomSettingsForm roomId={roomId} onClose={onClose} />
        </Modal>
      )}
    </>
  );
};

export default RoomSettingsModal;
