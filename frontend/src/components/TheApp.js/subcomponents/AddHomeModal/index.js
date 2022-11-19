import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import AddHomeModalForm from "./AddHomeModalForm";
import { AiOutlinePlusSquare } from "react-icons/ai";

const AddHomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AiOutlinePlusSquare
        className="add-spot-button"
        onClick={() => setShowModal(true)}
      ></AiOutlinePlusSquare>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddHomeModalForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddHomeModal;
