import { Modal } from "../../../../../context/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import AddRoomForm from "./AddRoomForm";
const AddRoomModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <AiOutlinePlus
        className="clicky"
        onClick={() => setShowModal(true)}
      ></AiOutlinePlus>
      {showModal && (
        <Modal onClose={onClose}>
          <AddRoomForm onClose={onClose} />
        </Modal>
      )}
    </>
  );
};

export default AddRoomModal;
